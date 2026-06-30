import type {
  RunwiseCategory,
  RunwiseDoctorReport,
  RunwiseFinding,
  RunwiseRuleResult,
  RunwiseSeverity
} from "@runwise/schemas";

export const SEVERITY_DEDUCTIONS: Record<RunwiseSeverity, number> = {
  critical: 25,
  high: 15,
  medium: 8,
  low: 3,
  info: 0
};

export const BLOCKING_DEDUCTION = 10;

const RUNWISE_CATEGORIES: RunwiseCategory[] = [
  "workspace",
  "typescript",
  "package-manager",
  "governance",
  "ai-indicators",
  "mcp",
  "evals",
  "tracing",
  "reports",
  "deployment"
];

export function summarizeFindings(findings: RunwiseFinding[]): RunwiseDoctorReport["summary"] {
  const summary: RunwiseDoctorReport["summary"] = {
    overallScore: calculateOverallScore(findings),
    totalFindings: findings.length,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    info: 0,
    categoryScores: calculateCategoryScores(findings)
  };

  for (const finding of findings) {
    summary[finding.severity] += 1;
  }

  return summary;
}

export function summarizeRuleResults(
  results: RunwiseRuleResult[]
): RunwiseDoctorReport["rules"] {
  return {
    total: results.length,
    passed: results.filter((result) => result.status === "passed").length,
    failed: results.filter((result) => result.status === "failed").length,
    notApplicable: results.filter((result) => result.status === "not_applicable").length,
    blocking: results.filter((result) => result.finding?.blocking === true).length
  };
}

export function calculateOverallScore(findings: RunwiseFinding[]) {
  const score = findings.reduce(
    (currentScore, finding) => currentScore - getFindingDeduction(finding),
    100
  );

  return clampScore(score);
}

export function calculateCategoryScores(findings: RunwiseFinding[]) {
  const scores = Object.fromEntries(
    RUNWISE_CATEGORIES.map((category) => [category, 100])
  ) as Record<RunwiseCategory, number>;

  for (const finding of findings) {
    scores[finding.category] = clampScore(
      scores[finding.category] - getFindingDeduction(finding)
    );
  }

  return scores;
}

function getFindingDeduction(finding: RunwiseFinding) {
  return (
    SEVERITY_DEDUCTIONS[finding.severity] +
    (finding.blocking === true ? BLOCKING_DEDUCTION : 0)
  );
}

function clampScore(score: number) {
  return Math.max(0, Math.min(100, score));
}
