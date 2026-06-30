export type RunwisePhase = "Phase 0" | "Phase 1" | "Phase 2" | "Phase 3" | "Phase 4";

export interface RunwiseManifest {
  name: string;
  phase: RunwisePhase;
  description: string;
}

export type RunwiseSeverity = "info" | "low" | "medium" | "high" | "critical";

export type RunwiseCategory =
  | "workspace"
  | "typescript"
  | "package-manager"
  | "governance"
  | "ai-indicators"
  | "mcp"
  | "evals"
  | "tracing"
  | "reports"
  | "deployment";

export interface RunwiseFinding {
  id: string;
  ruleId?: string;
  category: RunwiseCategory;
  severity: RunwiseSeverity;
  title: string;
  titleZh: string;
  message: string;
  messageZh: string;
  recommendation: string;
  recommendationZh: string;
  file?: string;
  blocking?: boolean;
}

export type RunwiseRuleId = string;

export type RunwiseRuleStatus = "passed" | "failed" | "not_applicable";

export interface RunwiseRuleDefinition {
  id: RunwiseRuleId;
  category: RunwiseCategory;
  severity: RunwiseSeverity;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  message: string;
  messageZh: string;
  recommendation: string;
  recommendationZh: string;
  weight?: number;
  blocking?: boolean;
}

export interface RunwiseRuleResult {
  ruleId: RunwiseRuleId;
  status: RunwiseRuleStatus;
  finding?: RunwiseFinding;
}

export interface RunwiseDoctorReport {
  tool: "runwise";
  command: "doctor";
  version: string;
  scannedPath: string;
  generatedAt: string;
  summary: {
    overallScore: number;
    totalFindings: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
    categoryScores?: Record<RunwiseCategory, number>;
  };
  rules: {
    total: number;
    passed: number;
    failed: number;
    notApplicable: number;
    blocking: number;
  };
  checks: {
    workspaceDetected: boolean;
    packageManagerDetected: boolean;
    typescriptDetected: boolean;
    governanceFilesDetected: boolean;
    aiProjectIndicatorsDetected: boolean;
    mcpIndicatorsDetected: boolean;
    evalsDetected: boolean;
    tracesDetected: boolean;
  };
  findings: RunwiseFinding[];
}
