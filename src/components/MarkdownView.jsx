"use client";

import React from "react";

/**
 * Parses inline Markdown tokens: **bold**, *italic*, `code`, and [label](url)
 */
function parseInlineMarkdown(text) {
  if (!text) return null;

  // Regex to match:
  // 1. Links: [text](url)
  // 2. Bold: **text**
  // 3. Italic: *text* or _text_
  // 4. Code: `text`
  const tokenRegex =
    /(\[.*?\]\(https?:\/\/[^\s)]+\)|\*\*.*?\*\*|\*[^*]+?\*|_[^_]+?_|`[^`]+?`)/g;

  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Link: [text](url)
    if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
      const match = part.match(/^\[(.*?)\]\((https?:\/\/[^\s)]+)\)$/);
      if (match) {
        const [, label, url] = match;
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#33E6D8] underline underline-offset-2 hover:text-white transition-colors"
          >
            {label}
          </a>
        );
      }
    }

    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic: *text* or _text_
    if (
      ((part.startsWith("*") && part.endsWith("*")) ||
        (part.startsWith("_") && part.endsWith("_"))) &&
      part.length >= 2
    ) {
      return (
        <em key={index} className="italic text-white/90">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Inline code: `text`
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={index}
          className="px-2 py-0.5 rounded bg-white/10 text-[#33E6D8] font-mono text-xs font-medium"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

/**
 * High-performance, XSS-safe Markdown renderer component
 */
export default function MarkdownView({ content = "", className = "" }) {
  if (!content || typeof content !== "string") return null;

  const lines = content.split("\n");
  const blocks = [];
  let currentList = null;
  let currentCodeBlock = null;

  function flushList() {
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
  }

  function flushCodeBlock() {
    if (currentCodeBlock) {
      blocks.push(currentCodeBlock);
      currentCodeBlock = null;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Handle code fence ```
    if (trimmed.startsWith("```")) {
      if (currentCodeBlock) {
        flushCodeBlock();
      } else {
        flushList();
        const lang = trimmed.slice(3).trim();
        currentCodeBlock = { type: "code", lang, lines: [] };
      }
      continue;
    }

    if (currentCodeBlock) {
      currentCodeBlock.lines.push(rawLine);
      continue;
    }

    // Empty line flushes active list
    if (!trimmed) {
      flushList();
      continue;
    }

    // Horizontal rule --- or ***
    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      flushList();
      blocks.push({ type: "hr" });
      continue;
    }

    // Headings
    if (trimmed.startsWith("#")) {
      flushList();
      const match = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        blocks.push({ type: "heading", level, text });
        continue;
      }
    }

    // Blockquote >
    if (trimmed.startsWith(">")) {
      flushList();
      const text = trimmed.replace(/^>\s*/, "");
      blocks.push({ type: "blockquote", text });
      continue;
    }

    // Unordered List item (- or * or •)
    const ulMatch = trimmed.match(/^[-*•]\s+(.*)$/);
    if (ulMatch) {
      if (!currentList || currentList.type !== "ul") {
        flushList();
        currentList = { type: "ul", items: [] };
      }
      currentList.items.push(ulMatch[1]);
      continue;
    }

    // Ordered List item (1. 2. etc)
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      if (!currentList || currentList.type !== "ol") {
        flushList();
        currentList = { type: "ol", items: [] };
      }
      currentList.items.push(olMatch[2]);
      continue;
    }

    // Regular paragraph line
    flushList();
    blocks.push({ type: "paragraph", text: trimmed });
  }

  flushList();
  flushCodeBlock();

  return (
    <div className={`space-y-4 ${className}`}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "heading": {
            if (block.level === 1) {
              return (
                <h1
                  key={idx}
                  className="text-2xl sm:text-3xl font-heading font-bold text-white mt-8 mb-4 tracking-tight border-b border-white/10 pb-2.5"
                >
                  {parseInlineMarkdown(block.text)}
                </h1>
              );
            }
            if (block.level === 2) {
              return (
                <h2
                  key={idx}
                  className="text-xl sm:text-2xl font-heading font-bold text-white mt-6 mb-3 tracking-tight"
                >
                  {parseInlineMarkdown(block.text)}
                </h2>
              );
            }
            if (block.level === 3) {
              return (
                <h3
                  key={idx}
                  className="text-lg sm:text-xl font-heading font-semibold text-white mt-5 mb-2.5 tracking-tight"
                >
                  {parseInlineMarkdown(block.text)}
                </h3>
              );
            }
            return (
              <h4
                key={idx}
                className="text-base font-heading font-semibold text-white/90 mt-4 mb-2 tracking-tight"
              >
                {parseInlineMarkdown(block.text)}
              </h4>
            );
          }

          case "ul": {
            return (
              <ul key={idx} className="space-y-2.5 my-3 pl-1">
                {block.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="flex items-start gap-3 text-sm sm:text-base text-white/80 leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#33E6D8] shrink-0 mt-2.5" />
                    <span className="flex-1">{parseInlineMarkdown(item)}</span>
                  </li>
                ))}
              </ul>
            );
          }

          case "ol": {
            return (
              <ol key={idx} className="space-y-2.5 my-3 pl-1">
                {block.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="flex items-start gap-3 text-sm sm:text-base text-white/80 leading-relaxed"
                  >
                    <span className="shrink-0 w-5 h-5 rounded-md bg-[#33E6D8]/15 border border-[#33E6D8]/30 text-[#33E6D8] font-mono text-xs flex items-center justify-center font-bold mt-0.5">
                      {itemIdx + 1}
                    </span>
                    <span className="flex-1">{parseInlineMarkdown(item)}</span>
                  </li>
                ))}
              </ol>
            );
          }

          case "blockquote": {
            return (
              <blockquote
                key={idx}
                className="border-l-2 border-[#33E6D8] pl-4 py-2 my-3 bg-white/[0.02] rounded-r-lg text-sm sm:text-base italic text-white/80"
              >
                {parseInlineMarkdown(block.text)}
              </blockquote>
            );
          }

          case "code": {
            return (
              <pre
                key={idx}
                className="p-4 my-3 rounded-xl bg-black/60 border border-white/10 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto"
              >
                <code>{block.lines.join("\n")}</code>
              </pre>
            );
          }

          case "hr": {
            return <hr key={idx} className="border-white/10 my-6" />;
          }

          case "paragraph":
          default: {
            return (
              <p
                key={idx}
                className="text-sm sm:text-base text-white/80 leading-relaxed"
              >
                {parseInlineMarkdown(block.text)}
              </p>
            );
          }
        }
      })}
    </div>
  );
}
