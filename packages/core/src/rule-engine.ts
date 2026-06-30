import type { RunwiseFinding, RunwiseRuleResult, RunwiseRuleStatus } from "@runwise/schemas";
import type { RunwiseProjectContext } from "./scanner.js";
import { RUNWISE_RULES, type RunwiseRule } from "./rules.js";

export interface RunwiseRuleEvaluation {
  status: RunwiseRuleStatus;
  message?: string;
  messageZh?: string;
  file?: string;
}

export function runRuleEngine(
  context: RunwiseProjectContext,
  rules: readonly RunwiseRule[] = RUNWISE_RULES
): RunwiseRuleResult[] {
  return rules.map((rule) => {
    const evaluation = rule.evaluate(context);

    if (evaluation.status !== "failed") {
      return {
        ruleId: rule.id,
        status: evaluation.status
      };
    }

    return {
      ruleId: rule.id,
      status: evaluation.status,
      finding: createFinding(rule, evaluation)
    };
  });
}

function createFinding(rule: RunwiseRule, evaluation: RunwiseRuleEvaluation): RunwiseFinding {
  return {
    id: rule.id,
    ruleId: rule.id,
    category: rule.category,
    severity: rule.severity,
    title: rule.title,
    titleZh: rule.titleZh,
    message: evaluation.message ?? rule.message,
    messageZh: evaluation.messageZh ?? rule.messageZh,
    recommendation: rule.recommendation,
    recommendationZh: rule.recommendationZh,
    file: evaluation.file,
    blocking: rule.blocking === true
  };
}
