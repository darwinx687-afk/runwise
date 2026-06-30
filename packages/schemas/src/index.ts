export type RunwisePhase =
  | "Phase 0"
  | "Phase 1"
  | "Phase 2"
  | "Phase 3"
  | "Phase 4"
  | "Phase 5"
  | "Phase 6"
  | "Phase 7"
  | "Phase 8";

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
  reportFiles?: {
    json: string;
    markdown: string;
    html: string;
  };
  findings: RunwiseFinding[];
}

export type RunwiseTraceStepType =
  | "llm_call"
  | "tool_call"
  | "mcp_tool_call"
  | "rag_retrieval"
  | "approval_request"
  | "approval_response"
  | "system_event"
  | "error"
  | "final_output";

export type RunwiseTraceRiskLevel =
  | "none"
  | "low"
  | "medium"
  | "high"
  | "critical";

export type RunwiseTraceStatus =
  | "success"
  | "failed"
  | "cancelled"
  | "partial";

export type RunwiseTraceStep = {
  stepId: string;
  type: RunwiseTraceStepType;
  name?: string;
  startedAt?: string;
  endedAt?: string;
  durationMs?: number;
  risk?: RunwiseTraceRiskLevel;
  input?: unknown;
  output?: unknown;
  error?: {
    message: string;
    code?: string;
  };
  metadata?: Record<string, unknown>;
};

export type RunwiseAgentTrace = {
  schema: "runwise.agent_trace";
  schemaVersion: "0.1";
  runId: string;
  name?: string;
  status: RunwiseTraceStatus;
  startedAt: string;
  endedAt?: string;
  input?: unknown;
  output?: unknown;
  model?: {
    provider?: string;
    name?: string;
  };
  environment?: {
    framework?: string;
    runtime?: string;
    language?: string;
  };
  steps: RunwiseTraceStep[];
  metadata?: Record<string, unknown>;
};

export type RunwiseTraceValidationIssue = {
  path: string;
  message: string;
  messageZh: string;
  severity: "error" | "warning";
};

export type RunwiseTraceValidationResult = {
  file: string;
  valid: boolean;
  issues: RunwiseTraceValidationIssue[];
};

export type RunwiseReplayRiskSummary = {
  none: number;
  low: number;
  medium: number;
  high: number;
  critical: number;
};

export type RunwiseReplayStepSummary = {
  stepId: string;
  index: number;
  type: RunwiseTraceStepType;
  name?: string;
  risk: RunwiseTraceRiskLevel;
  durationMs?: number;
  status: "ok" | "error" | "warning";
  summary: string;
  summaryZh: string;
};

export type RunwiseTraceReplaySummary = {
  traceFile: string;
  runId: string;
  name?: string;
  status: RunwiseTraceStatus;
  startedAt: string;
  endedAt?: string;
  totalSteps: number;
  totalDurationMs?: number;
  riskSummary: RunwiseReplayRiskSummary;
  approval: {
    requests: number;
    responses: number;
    missingApprovalForHighRisk: boolean;
  };
  errors: {
    count: number;
    messages: string[];
  };
  steps: RunwiseReplayStepSummary[];
  recommendations: {
    message: string;
    messageZh: string;
  }[];
};

export type RunwiseEvalCaseType =
  | "failure_regression"
  | "approval_regression"
  | "tool_risk_regression"
  | "rag_grounding_regression"
  | "success_baseline";

export type RunwiseEvalAssertionType =
  | "must_include"
  | "must_not_include"
  | "must_ask_approval"
  | "must_cite_source"
  | "must_not_call_tool"
  | "must_handle_error"
  | "custom";

export type RunwiseEvalAssertion = {
  type: RunwiseEvalAssertionType;
  description: string;
  descriptionZh: string;
  value?: string;
};

export type RunwiseEvalCase = {
  schema: "runwise.eval_case";
  schemaVersion: "0.1";
  caseId: string;
  type: RunwiseEvalCaseType;
  title: string;
  titleZh: string;
  source: {
    traceFile: string;
    runId: string;
    traceStatus: RunwiseTraceStatus;
  };
  input?: unknown;
  expectedBehavior: string[];
  expectedBehaviorZh: string[];
  mustNot: string[];
  mustNotZh: string[];
  assertions: RunwiseEvalAssertion[];
  riskTags: string[];
  metadata?: Record<string, unknown>;
};
