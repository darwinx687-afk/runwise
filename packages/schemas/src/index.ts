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
  title: string;
  titleZh: string;
  severity: RunwiseSeverity;
  category: RunwiseCategory;
  message: string;
  messageZh: string;
  recommendation: string;
  recommendationZh: string;
  file?: string;
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
