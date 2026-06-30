import type {
  RunwiseAgentTrace,
  RunwiseReplayRiskSummary,
  RunwiseReplayStepSummary,
  RunwiseTraceReplaySummary,
  RunwiseTraceRiskLevel,
  RunwiseTraceStep,
  RunwiseTraceStepType
} from "@runwise/schemas";

const RISK_LEVELS: RunwiseTraceRiskLevel[] = [
  "none",
  "low",
  "medium",
  "high",
  "critical"
];

export function buildRunwiseTraceReplaySummary(
  trace: RunwiseAgentTrace,
  traceFile: string
): RunwiseTraceReplaySummary {
  const riskSummary = createRiskSummary();
  const steps = trace.steps.map((step, index) => {
    const risk = step.risk ?? "none";
    riskSummary[risk] += 1;
    return summarizeStep(step, index, risk);
  });
  const approvalRequests = trace.steps.filter((step) => step.type === "approval_request").length;
  const approvalResponses = trace.steps.filter((step) => step.type === "approval_response").length;
  const hasHighRiskTool = trace.steps.some(
    (step) =>
      (step.type === "tool_call" || step.type === "mcp_tool_call") &&
      (step.risk === "high" || step.risk === "critical")
  );
  const missingApprovalForHighRisk =
    hasHighRiskTool && approvalRequests === 0 && approvalResponses === 0;
  const errorMessages = trace.steps
    .filter((step) => step.type === "error" || step.error)
    .map((step) => step.error?.message ?? `${step.stepId} reported an error`);

  return {
    traceFile,
    runId: trace.runId,
    name: trace.name,
    status: trace.status,
    startedAt: trace.startedAt,
    endedAt: trace.endedAt,
    totalSteps: trace.steps.length,
    totalDurationMs: getTotalDurationMs(trace),
    riskSummary,
    approval: {
      requests: approvalRequests,
      responses: approvalResponses,
      missingApprovalForHighRisk
    },
    errors: {
      count: errorMessages.length,
      messages: errorMessages
    },
    steps,
    recommendations: buildRecommendations(trace, missingApprovalForHighRisk, errorMessages.length)
  };
}

function summarizeStep(
  step: RunwiseTraceStep,
  index: number,
  risk: RunwiseTraceRiskLevel
): RunwiseReplayStepSummary {
  const status = getStepStatus(step, risk);
  const label = step.name ?? step.stepId;
  const summary = getStepSummary(step.type, label, step.error?.message);
  const summaryZh = getStepSummaryZh(step.type, label, step.error?.message);

  return {
    stepId: step.stepId,
    index,
    type: step.type,
    name: step.name,
    risk,
    durationMs: step.durationMs,
    status,
    summary,
    summaryZh
  };
}

function getStepStatus(
  step: RunwiseTraceStep,
  risk: RunwiseTraceRiskLevel
): RunwiseReplayStepSummary["status"] {
  if (step.type === "error" || step.error) {
    return "error";
  }

  if (risk === "high" || risk === "critical") {
    return "warning";
  }

  return "ok";
}

function getStepSummary(
  type: RunwiseTraceStepType,
  label: string,
  errorMessage?: string
) {
  switch (type) {
    case "llm_call":
      return `LLM step "${label}" generated or transformed model output.`;
    case "tool_call":
      return `Tool call "${label}" interacted with a local or application tool.`;
    case "mcp_tool_call":
      return `MCP tool call "${label}" interacted with an MCP server tool.`;
    case "rag_retrieval":
      return `Retrieval step "${label}" gathered context for the run.`;
    case "approval_request":
      return `Approval request "${label}" asked for a human or policy decision.`;
    case "approval_response":
      return `Approval response "${label}" recorded the approval decision.`;
    case "system_event":
      return `System event "${label}" recorded runtime context.`;
    case "error":
      return `Error step "${label}" reported: ${errorMessage ?? "no error message provided"}.`;
    case "final_output":
      return `Final output "${label}" completed the run narrative.`;
  }
}

function getStepSummaryZh(
  type: RunwiseTraceStepType,
  label: string,
  errorMessage?: string
) {
  switch (type) {
    case "llm_call":
      return `LLM 步骤 "${label}" 生成或转换了模型输出。`;
    case "tool_call":
      return `工具调用 "${label}" 与本地或应用工具交互。`;
    case "mcp_tool_call":
      return `MCP 工具调用 "${label}" 与 MCP server tool 交互。`;
    case "rag_retrieval":
      return `检索步骤 "${label}" 为本次运行收集上下文。`;
    case "approval_request":
      return `审批请求 "${label}" 请求人工或策略决策。`;
    case "approval_response":
      return `审批响应 "${label}" 记录了审批决策。`;
    case "system_event":
      return `系统事件 "${label}" 记录了运行时上下文。`;
    case "error":
      return `错误步骤 "${label}" 报告：${errorMessage ?? "未提供错误信息"}。`;
    case "final_output":
      return `最终输出 "${label}" 完成本次运行叙事。`;
  }
}

function buildRecommendations(
  trace: RunwiseAgentTrace,
  missingApprovalForHighRisk: boolean,
  errorCount: number
) {
  const recommendations: RunwiseTraceReplaySummary["recommendations"] = [];

  if (missingApprovalForHighRisk) {
    recommendations.push({
      message:
        "High-risk tool activity was detected without an approval step. Add an approval gate before executing sensitive tools.",
      messageZh:
        "检测到高风险工具调用，但没有审批步骤。建议在执行敏感工具前增加人工审批门禁。"
    });
  }

  if (errorCount > 0) {
    recommendations.push({
      message:
        "This trace contains error steps. Review the failed step context before turning this run into an eval case.",
      messageZh:
        "该 trace 包含错误步骤。建议先复盘失败步骤上下文，再将其转化为评测用例。"
    });
  }

  if (trace.status === "success" && !hasHighOrCriticalRisk(trace) && errorCount === 0) {
    recommendations.push({
      message:
        "This trace is suitable as a baseline successful run for future regression checks.",
      messageZh:
        "该 trace 可作为后续回归检查的成功基线样本。"
    });
  }

  return recommendations;
}

function hasHighOrCriticalRisk(trace: RunwiseAgentTrace) {
  return trace.steps.some((step) => step.risk === "high" || step.risk === "critical");
}

function getTotalDurationMs(trace: RunwiseAgentTrace): number | undefined {
  const timelineDuration = getTimelineDurationMs(trace.startedAt, trace.endedAt);
  if (timelineDuration !== undefined) {
    return timelineDuration;
  }

  const stepDurations = trace.steps
    .map((step) => step.durationMs)
    .filter((duration): duration is number => typeof duration === "number");

  if (stepDurations.length === 0) {
    return undefined;
  }

  return stepDurations.reduce((total, duration) => total + duration, 0);
}

function getTimelineDurationMs(startedAt?: string, endedAt?: string): number | undefined {
  if (!startedAt || !endedAt) {
    return undefined;
  }

  const started = Date.parse(startedAt);
  const ended = Date.parse(endedAt);

  if (Number.isNaN(started) || Number.isNaN(ended) || ended < started) {
    return undefined;
  }

  return ended - started;
}

function createRiskSummary(): RunwiseReplayRiskSummary {
  return RISK_LEVELS.reduce(
    (summary, risk) => ({
      ...summary,
      [risk]: 0
    }),
    {} as RunwiseReplayRiskSummary
  );
}
