import { promises as fs } from "node:fs";
import * as path from "node:path";
import type {
  RunwiseAgentTrace,
  RunwiseTraceRiskLevel,
  RunwiseTraceStatus,
  RunwiseTraceStepType,
  RunwiseTraceValidationIssue,
  RunwiseTraceValidationResult
} from "@runwise/schemas";

export const RUNWISE_TRACE_SCHEMA = "runwise.agent_trace";
export const RUNWISE_TRACE_SCHEMA_VERSION = "0.1";

const TRACE_STATUSES = new Set<RunwiseTraceStatus>([
  "success",
  "failed",
  "cancelled",
  "partial"
]);

const TRACE_STEP_TYPES = new Set<RunwiseTraceStepType>([
  "llm_call",
  "tool_call",
  "mcp_tool_call",
  "rag_retrieval",
  "approval_request",
  "approval_response",
  "system_event",
  "error",
  "final_output"
]);

const TRACE_RISK_LEVELS = new Set<RunwiseTraceRiskLevel>([
  "none",
  "low",
  "medium",
  "high",
  "critical"
]);

export async function validateRunwiseTracePath(
  inputPath: string
): Promise<RunwiseTraceValidationResult[]> {
  const absolutePath = path.resolve(inputPath);
  const stat = await fs.stat(absolutePath);

  if (stat.isDirectory()) {
    const entries = await fs.readdir(absolutePath, { withFileTypes: true });
    const jsonFiles = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map((entry) => path.join(absolutePath, entry.name))
      .sort();

    return Promise.all(jsonFiles.map((file) => validateRunwiseTraceFile(file)));
  }

  return [await validateRunwiseTraceFile(absolutePath)];
}

export async function validateRunwiseTraceFile(
  filePath: string
): Promise<RunwiseTraceValidationResult> {
  const absolutePath = path.resolve(filePath);

  try {
    const source = await fs.readFile(absolutePath, "utf8");
    const parsed: unknown = JSON.parse(source);
    return validateRunwiseTrace(parsed, absolutePath);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return {
        file: absolutePath,
        valid: false,
        issues: [
          issue(
            "$",
            "Trace file must be valid JSON",
            "Trace 文件必须是有效 JSON",
            "error"
          )
        ]
      };
    }

    throw error;
  }
}

export function validateRunwiseTrace(
  value: unknown,
  file = "trace.json"
): RunwiseTraceValidationResult {
  const issues: RunwiseTraceValidationIssue[] = [];

  if (!isRecord(value)) {
    issues.push(issue("$", "Trace root must be an object", "Trace 根节点必须是对象", "error"));
    return toResult(file, issues);
  }

  validateRoot(value, issues);

  if (Array.isArray(value.steps)) {
    validateSteps(value as Partial<RunwiseAgentTrace>, issues);
    validateTimeline(value as Partial<RunwiseAgentTrace>, issues);
    validateRiskApproval(value as Partial<RunwiseAgentTrace>, issues);
  }

  return toResult(file, issues);
}

function validateRoot(
  trace: Record<string, unknown>,
  issues: RunwiseTraceValidationIssue[]
) {
  if (trace.schema !== RUNWISE_TRACE_SCHEMA) {
    issues.push(
      issue(
        "schema",
        'schema must equal "runwise.agent_trace"',
        'schema 必须等于 "runwise.agent_trace"',
        "error"
      )
    );
  }

  if (!isNonEmptyString(trace.schemaVersion)) {
    issues.push(
      issue(
        "schemaVersion",
        "schemaVersion is required",
        "缺少必填字段 schemaVersion",
        "error"
      )
    );
  }

  if (!isNonEmptyString(trace.runId)) {
    issues.push(issue("runId", "runId is required", "缺少必填字段 runId", "error"));
  }

  if (!isTraceStatus(trace.status)) {
    issues.push(
      issue(
        "status",
        "status must be one of success, failed, cancelled, partial",
        "status 必须是 success、failed、cancelled 或 partial 之一",
        "error"
      )
    );
  }

  if (!isNonEmptyString(trace.startedAt)) {
    issues.push(issue("startedAt", "startedAt is required", "缺少必填字段 startedAt", "error"));
  }

  if (!Array.isArray(trace.steps)) {
    issues.push(issue("steps", "steps must be an array", "steps 必须是数组", "error"));
  }
}

function validateSteps(
  trace: Partial<RunwiseAgentTrace>,
  issues: RunwiseTraceValidationIssue[]
) {
  const steps = trace.steps ?? [];

  if (steps.length === 0) {
    issues.push(issue("steps", "Trace has no steps", "Trace 没有任何 step", "warning"));
  }

  steps.forEach((step, index) => {
    const stepPath = `steps[${index}]`;

    if (!isRecord(step)) {
      issues.push(issue(stepPath, "step must be an object", "step 必须是对象", "error"));
      return;
    }

    if (!isNonEmptyString(step.stepId)) {
      issues.push(
        issue(
          `${stepPath}.stepId`,
          "stepId is required",
          "缺少必填字段 stepId",
          "error"
        )
      );
    }

    if (!isTraceStepType(step.type)) {
      issues.push(
        issue(
          `${stepPath}.type`,
          "type must be a supported trace step type",
          "type 必须是受支持的 trace step 类型",
          "error"
        )
      );
    }

    if (step.durationMs !== undefined && !isNonNegativeNumber(step.durationMs)) {
      issues.push(
        issue(
          `${stepPath}.durationMs`,
          "durationMs must be a non-negative number",
          "durationMs 必须是非负数字",
          "error"
        )
      );
    }

    if (step.risk !== undefined && !isTraceRiskLevel(step.risk)) {
      issues.push(
        issue(
          `${stepPath}.risk`,
          "risk must be one of none, low, medium, high, critical",
          "risk 必须是 none、low、medium、high 或 critical 之一",
          "error"
        )
      );
    }

    const errorValue = step.error;
    if (step.type === "error" || errorValue !== undefined) {
      if (!isRecord(errorValue) || !isNonEmptyString(errorValue.message)) {
        issues.push(
          issue(
            `${stepPath}.error.message`,
            "error.message is required for error steps",
            "error step 必须包含 error.message",
            "error"
          )
        );
      }
    }
  });
}

function validateTimeline(
  trace: Partial<RunwiseAgentTrace>,
  issues: RunwiseTraceValidationIssue[]
) {
  addTimelineWarning(trace.startedAt, trace.endedAt, "endedAt", issues);

  for (const [index, step] of (trace.steps ?? []).entries()) {
    if (!isRecord(step)) {
      continue;
    }

    addTimelineWarning(
      step.startedAt,
      step.endedAt,
      `steps[${index}].endedAt`,
      issues
    );
  }

  if (
    trace.status === "success" &&
    (trace.steps ?? []).some((step) => isRecord(step) && step.type === "error")
  ) {
    issues.push(
      issue(
        "status",
        'Trace status is "success" but contains an error step',
        'Trace 状态为 "success"，但包含 error step',
        "warning"
      )
    );
  }
}

function validateRiskApproval(
  trace: Partial<RunwiseAgentTrace>,
  issues: RunwiseTraceValidationIssue[]
) {
  const steps = trace.steps ?? [];
  const hasHighRiskTool = steps.some(
    (step) =>
      isRecord(step) &&
      (step.type === "tool_call" || step.type === "mcp_tool_call") &&
      (step.risk === "high" || step.risk === "critical")
  );
  const hasApprovalStep = steps.some(
    (step) =>
      isRecord(step) &&
      (step.type === "approval_request" || step.type === "approval_response")
  );

  if (hasHighRiskTool && !hasApprovalStep) {
    issues.push(
      issue(
        "steps",
        "Trace has high or critical tool risk but no approval step",
        "Trace 包含 high 或 critical 工具风险，但没有 approval step",
        "warning"
      )
    );
  }
}

function addTimelineWarning(
  startedAt: unknown,
  endedAt: unknown,
  issuePath: string,
  issues: RunwiseTraceValidationIssue[]
) {
  if (!isNonEmptyString(startedAt) || !isNonEmptyString(endedAt)) {
    return;
  }

  const startTime = Date.parse(startedAt);
  const endTime = Date.parse(endedAt);

  if (Number.isNaN(startTime) || Number.isNaN(endTime)) {
    return;
  }

  if (endTime < startTime) {
    issues.push(
      issue(
        issuePath,
        "endedAt is earlier than startedAt",
        "endedAt 早于 startedAt",
        "warning"
      )
    );
  }
}

function toResult(
  file: string,
  issues: RunwiseTraceValidationIssue[]
): RunwiseTraceValidationResult {
  return {
    file,
    valid: !issues.some((item) => item.severity === "error"),
    issues
  };
}

function issue(
  issuePath: string,
  message: string,
  messageZh: string,
  severity: RunwiseTraceValidationIssue["severity"]
): RunwiseTraceValidationIssue {
  return {
    path: issuePath,
    message,
    messageZh,
    severity
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isNonNegativeNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function isTraceStatus(value: unknown): value is RunwiseTraceStatus {
  return typeof value === "string" && TRACE_STATUSES.has(value as RunwiseTraceStatus);
}

function isTraceStepType(value: unknown): value is RunwiseTraceStepType {
  return typeof value === "string" && TRACE_STEP_TYPES.has(value as RunwiseTraceStepType);
}

function isTraceRiskLevel(value: unknown): value is RunwiseTraceRiskLevel {
  return typeof value === "string" && TRACE_RISK_LEVELS.has(value as RunwiseTraceRiskLevel);
}
