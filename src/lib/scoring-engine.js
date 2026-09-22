/**
 * Server-Side Automated Candidate Evaluation & Priority Scoring Engine
 * Evaluates candidate responses deterministically on the server.
 */

export function evaluateCandidate(jobSlug, answers = {}, links = {}) {
  let score = 0;
  let hardReject = false;
  const rejectReasons = [];

  switch (jobSlug) {
    case "full-stack-intern": {
      // 1. Hard Rejection Checks
      const onsiteOk =
        answers.onsite_availability === true ||
        answers.onsite_availability === "true" ||
        answers.onsite_availability === "yes";
      const commitOk =
        answers.commit_3_months === true ||
        answers.commit_3_months === "true" ||
        answers.commit_3_months === "yes";

      if (!onsiteOk) {
        hardReject = true;
        rejectReasons.push("Cannot work on-site in Dhaka");
      }
      if (!commitOk) {
        hardReject = true;
        rejectReasons.push("Cannot commit to 3-month duration");
      }

      // 2. Score Calculations
      const gradStatus = answers.graduation_status;
      if (["final_year", "fresh_graduate"].includes(gradStatus)) score += 2;
      else if (gradStatus === "graduated_within_1yr") score += 1;

      const exp = answers.experience_level;
      if (["6m_1y", "gt_1y", "1_3y", "3y_plus"].includes(exp)) score += 3;
      else if (["lt_6m", "0_1y"].includes(exp)) score += 1;
      else if (["none", "fresher"].includes(exp)) score += 0;

      const nextExp = answers.nextjs_experience;
      if (["3_6m", "6_12m", "1y_plus"].includes(nextExp)) score += 3;
      else if (nextExp === "1_3m") score += 2;
      else if (nextExp === "lt_1m") score += 1;

      if (links.deployedUrl && links.deployedUrl.startsWith("http")) score += 2;
      if (links.githubUrl && links.githubUrl.includes("github.com")) score += 1;
      if (links.portfolioUrl && links.portfolioUrl.startsWith("http")) score += 1;

      if (Array.isArray(answers.skills) && answers.skills.length >= 5) score += 2;
      break;
    }

    case "ui-ux-intern": {
      // 1. Hard Rejection Checks
      const onsiteOk =
        answers.onsite_available === true ||
        answers.onsite_available === "true" ||
        answers.onsite_available === "yes";
      const commitOk =
        answers.three_month_commitment === true ||
        answers.three_month_commitment === "true" ||
        answers.three_month_commitment === "yes";
      const hasPortfolio =
        (links.portfolioUrl && links.portfolioUrl.startsWith("http")) ||
        (answers.design_profile_url && answers.design_profile_url.startsWith("http"));

      if (!onsiteOk) {
        hardReject = true;
        rejectReasons.push("Cannot work on-site in Dhaka");
      }
      if (!commitOk) {
        hardReject = true;
        rejectReasons.push("Cannot commit to 3-month duration");
      }
      if (!hasPortfolio) {
        hardReject = true;
        rejectReasons.push("No portfolio or design profile provided");
      }

      // 2. Score Calculations
      const exp = answers.experience_level;
      if (["multiple_real_projects", "freelance_client"].includes(exp)) score += 3;
      else if (exp === "few_personal_projects") score += 2;

      const duration = answers.design_duration;
      if (["1_2y", "2y_plus"].includes(duration)) score += 2;
      else if (duration === "6_12m") score += 1;

      if (
        Array.isArray(answers.tools_used) &&
        answers.tools_used.map((t) => t.toLowerCase()).includes("figma")
      ) {
        score += 2;
      }

      const pCount = answers.portfolio_project_count;
      if (["6_10", "10_plus"].includes(pCount)) score += 2;
      else if (pCount === "3_5") score += 1;
      break;
    }

    case "content-and-seo-executive": {
      const officeOk =
        answers.office_available === true ||
        answers.office_available === "true" ||
        answers.office_available === "yes";
      const writtenForB2B =
        answers.written_for_businesses === true ||
        answers.written_for_businesses === "true" ||
        answers.written_for_businesses === "yes";

      if (!officeOk) {
        hardReject = true;
        rejectReasons.push("Cannot work on-site full-time");
      }

      if (writtenForB2B) score += 3;

      const articles = parseInt(answers.monthly_articles, 10);
      if (!isNaN(articles) && articles >= 4) score += 2;

      if (answers.seo_tools && answers.seo_tools.length >= 6) score += 2;
      if (links.portfolioUrl && links.portfolioUrl.startsWith("http")) score += 2;
      if (links.linkedinUrl && links.linkedinUrl.includes("linkedin.com")) score += 1;
      break;
    }

    default: {
      // Generic Scoring for dynamically created jobs
      let baseScore = 0;
      const hasStr = (val) => typeof val === "string" && val.trim().startsWith("http");

      if (hasStr(links.deployedUrl)) baseScore += 2;
      if (typeof links.githubUrl === "string" && links.githubUrl.includes("github.com")) baseScore += 2;
      if (hasStr(links.portfolioUrl)) baseScore += 2;
      if (typeof links.linkedinUrl === "string" && links.linkedinUrl.includes("linkedin.com")) baseScore += 1;

      if (answers && typeof answers === "object") {
        const answerCount = Object.keys(answers).length;
        if (answerCount >= 5) baseScore += 3;
        else if (answerCount >= 2) baseScore += 2;
        else if (answerCount >= 1) baseScore += 1;
      }

      score = baseScore;
      break;
    }
  }

  // Determine Priority
  let priority = "LOW_PRIORITY";
  if (!hardReject) {
    if (score >= 7) {
      priority = "HIGH_PRIORITY";
    } else if (score >= 4) {
      priority = "MEDIUM_PRIORITY";
    }
  }

  return {
    score,
    priority,
    hardReject,
    rejectReasons,
  };
}
