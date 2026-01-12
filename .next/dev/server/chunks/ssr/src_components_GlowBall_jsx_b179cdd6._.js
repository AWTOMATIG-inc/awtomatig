module.exports = [
"[project]/src/components/GlowBall.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GlowBall
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
"use client";
;
;
const glowPath = [
    {
        x: "0%",
        y: "51%",
        rotate: 0
    },
    {
        x: "8%",
        y: "31%",
        rotate: 18
    },
    {
        x: "22%",
        y: "13%",
        rotate: 36
    },
    {
        x: "46%",
        y: "21%",
        rotate: 72
    },
    {
        x: "53%",
        y: "80%",
        rotate: 108
    },
    {
        x: "84%",
        y: "89%",
        rotate: 144
    },
    {
        x: "99%",
        y: "47%",
        rotate: 180
    },
    {
        x: "80%",
        y: "7%",
        rotate: 216
    },
    {
        x: "59%",
        y: "41%",
        rotate: 251
    },
    {
        x: "38%",
        y: "78%",
        rotate: 288
    },
    {
        x: "3%",
        y: "79%",
        rotate: 324
    },
    {
        x: "0%",
        y: "51%",
        rotate: 360
    }
];
function GlowBall({ size, duration, delay }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "   absolute bottom-0 left-0   aspect-square   rounded-full   opacity-60   blur-[100px]   will-change-transform   bg-[linear-gradient(259.53deg,#02D5E880,#2B388D80)]   ",
        style: {
            width: `${size}px`
        },
        animate: {
            x: glowPath.map((p)=>p.x),
            y: glowPath.map((p)=>p.y),
            rotate: glowPath.map((p)=>p.rotate)
        },
        transition: {
            duration,
            ease: "linear",
            repeat: Infinity,
            delay
        }
    }, void 0, false, {
        fileName: "[project]/src/components/GlowBall.jsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_components_GlowBall_jsx_b179cdd6._.js.map