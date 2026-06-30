import type {
  RunwiseIntegrationDetection,
  RunwiseIntegrationDetectionStrength,
  RunwiseIntegrationId
} from "@runwise/schemas";
import { RUNWISE_INTEGRATION_PROFILES } from "./profiles.js";

export type RunwisePackageJsonSource = {
  file: string;
  data: Record<string, unknown>;
};

export type RunwiseTextSource = {
  file: string;
  text: string;
};

export type RunwiseIntegrationDetectionInput = {
  files: string[];
  directories: string[];
  packageJsonFiles?: RunwisePackageJsonSource[];
  textFiles?: RunwiseTextSource[];
};

const STRENGTH_ORDER: RunwiseIntegrationDetectionStrength[] = [
  "none",
  "possible",
  "likely",
  "confirmed"
];

export function detectRunwiseIntegrations(
  input: RunwiseIntegrationDetectionInput
): RunwiseIntegrationDetection[] {
  const files = new Set(input.files.map(normalizePath));
  const directories = new Set(input.directories.map(normalizePath));
  const packages = input.packageJsonFiles ?? [];
  const texts = input.textFiles ?? [];
  const detections: RunwiseIntegrationDetection[] = [];

  for (const profile of RUNWISE_INTEGRATION_PROFILES) {
    const detected = createDetectedProfile(profile.id, files, directories, packages, texts);
    if (detected.strength === "none") {
      continue;
    }

    detections.push({
      id: profile.id,
      name: profile.name,
      nameZh: profile.nameZh,
      strength: detected.strength,
      signals: detected.signals,
      recommendations: profile.recommendedChecks,
      recommendationsZh: profile.recommendedChecksZh
    });
  }

  return detections;
}

function createDetectedProfile(
  id: RunwiseIntegrationId,
  files: Set<string>,
  directories: Set<string>,
  packages: RunwisePackageJsonSource[],
  texts: RunwiseTextSource[]
) {
  const result = createResult();

  switch (id) {
    case "mcp":
      addFileSignal(result, files, "mcp.json", "confirmed");
      addFileSignal(result, files, ".mcp.json", "confirmed");
      addFileSignal(result, files, "mcp.config.json", "confirmed");
      addPackageSignal(result, packages, includesAny(["mcp"]), "package.json mentions mcp", "likely");
      break;
    case "openai-agents":
      addPackageSignal(
        result,
        packages,
        includesAny(["@openai/agents", "openai-agents"]),
        "package.json mentions OpenAI Agents",
        "confirmed"
      );
      addTextSignal(
        result,
        texts,
        isPythonDependencyFile,
        includesAny(["openai-agents"]),
        "Python dependency file mentions openai-agents",
        "confirmed"
      );
      break;
    case "langchain":
      addPackageSignal(
        result,
        packages,
        includesAny(["langchain", "@langchain/"]),
        "package.json mentions LangChain",
        "confirmed"
      );
      addTextSignal(
        result,
        texts,
        isPythonDependencyFile,
        includesAny(["langchain"]),
        "Python dependency file mentions langchain",
        "confirmed"
      );
      break;
    case "dify":
      addTextSignal(
        result,
        texts,
        isDockerComposeFile,
        includesAny(["dify"]),
        "Docker Compose file mentions Dify",
        "likely"
      );
      addTextSignal(
        result,
        texts,
        isEnvExampleFile,
        includesAny(["dify"]),
        ".env example mentions Dify",
        "likely"
      );
      addTextSignal(
        result,
        texts,
        isExampleReadme,
        includesAny(["dify"]),
        "example documentation mentions Dify",
        "possible"
      );
      break;
    case "browser-use":
      addTextSignal(
        result,
        texts,
        isPythonDependencyFile,
        includesAny(["browser-use"]),
        "Python dependency file mentions browser-use",
        "confirmed"
      );
      addPackageSignal(
        result,
        packages,
        includesAny(["browser-use"]),
        "package.json mentions browser-use",
        "possible"
      );
      addTextSignal(
        result,
        texts,
        isExampleReadme,
        includesAny(["browser-use"]),
        "example documentation mentions browser-use",
        "possible"
      );
      break;
    case "claude-code":
      addFileSignal(result, files, "CLAUDE.md", "confirmed");
      addDirectorySignal(result, directories, ".claude", "confirmed");
      break;
    case "codex":
      addFileSignal(result, files, "AGENTS.md", "confirmed");
      addDirectorySignal(result, directories, ".codex", "confirmed");
      addFileSignal(result, files, "CODEX_LOOP_PROTOCOL.md", "confirmed");
      break;
    case "cursor":
      addDirectorySignal(result, directories, ".cursor", "confirmed");
      addFileSignal(result, files, ".cursorrules", "confirmed");
      break;
    case "windsurf":
      addDirectorySignal(result, directories, ".windsurf", "confirmed");
      addFileSignal(result, files, ".windsurfrules", "confirmed");
      break;
    case "ollama":
      addTextSignal(
        result,
        texts,
        isEnvExampleFile,
        includesAny(["ollama_host"]),
        ".env example mentions OLLAMA_HOST",
        "likely"
      );
      addPackageSignal(result, packages, includesAny(["ollama"]), "package.json mentions Ollama", "possible");
      addTextSignal(
        result,
        texts,
        isExampleReadme,
        includesAny(["ollama"]),
        "example documentation mentions Ollama",
        "possible"
      );
      break;
    case "openai-compatible-api":
      addTextSignal(
        result,
        texts,
        isEnvExampleFile,
        includesAny(["openai_api_key", "openai_base_url", "openai_api_base"]),
        ".env example includes OpenAI-compatible API variables",
        "likely"
      );
      addTextSignal(
        result,
        texts,
        isSourceOrConfigFile,
        includesAny(["baseurl", "openai-compatible"]),
        "source or config mentions OpenAI-compatible API base URL",
        "possible"
      );
      break;
    case "china-ready-llm":
      addTextSignal(
        result,
        texts,
        isEnvExampleFile,
        includesAny([
          "dashscope_api_key",
          "qwen",
          "deepseek_api_key",
          "zhipu",
          "glm",
          "moonshot_api_key",
          "kimi",
          "minimax",
          "baichuan",
          "siliconflow"
        ]),
        ".env example includes China-ready LLM provider variables",
        "likely"
      );
      addTextSignal(
        result,
        texts,
        isSourceOrConfigFile,
        includesAny([
          "dashscope",
          "qwen",
          "deepseek",
          "zhipu",
          "glm",
          "moonshot",
          "kimi",
          "minimax",
          "baichuan",
          "siliconflow"
        ]),
        "source or config mentions China-ready LLM providers",
        "possible"
      );
      break;
  }

  return result;
}

function createResult() {
  return {
    strength: "none" as RunwiseIntegrationDetectionStrength,
    signals: [] as string[]
  };
}

function addSignal(
  result: ReturnType<typeof createResult>,
  signal: string,
  strength: RunwiseIntegrationDetectionStrength
) {
  result.strength = maxStrength(result.strength, strength);
  if (!result.signals.includes(signal)) {
    result.signals.push(signal);
  }
}

function addFileSignal(
  result: ReturnType<typeof createResult>,
  files: Set<string>,
  file: string,
  strength: RunwiseIntegrationDetectionStrength
) {
  const match = findPathMatch(files, file);
  if (match) {
    addSignal(result, match, strength);
  }
}

function addDirectorySignal(
  result: ReturnType<typeof createResult>,
  directories: Set<string>,
  directory: string,
  strength: RunwiseIntegrationDetectionStrength
) {
  const match = findPathMatch(directories, directory);
  if (match) {
    addSignal(result, `${match}/`, strength);
  }
}

function addPackageSignal(
  result: ReturnType<typeof createResult>,
  packages: RunwisePackageJsonSource[],
  predicate: (value: string) => boolean,
  label: string,
  strength: RunwiseIntegrationDetectionStrength
) {
  for (const packageJson of packages) {
    if (getPackageSearchValues(packageJson.data).some(predicate)) {
      addSignal(result, `${packageJson.file}: ${label}`, strength);
    }
  }
}

function addTextSignal(
  result: ReturnType<typeof createResult>,
  texts: RunwiseTextSource[],
  filePredicate: (file: string) => boolean,
  textPredicate: (text: string) => boolean,
  label: string,
  strength: RunwiseIntegrationDetectionStrength
) {
  for (const source of texts) {
    if (filePredicate(source.file) && textPredicate(normalizeSearchValue(source.text))) {
      addSignal(result, `${source.file}: ${label}`, strength);
    }
  }
}

function getPackageSearchValues(packageJson: Record<string, unknown>) {
  const values: string[] = [];

  for (const sectionName of [
    "scripts",
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies"
  ]) {
    const section = packageJson[sectionName];
    if (!isRecord(section)) {
      continue;
    }

    for (const [key, value] of Object.entries(section)) {
      values.push(key);
      if (typeof value === "string") {
        values.push(value);
      }
    }
  }

  return values.map(normalizeSearchValue);
}

function includesAny(needles: string[]) {
  const normalizedNeedles = needles.map(normalizeSearchValue);
  return (value: string) => normalizedNeedles.some((needle) => value.includes(needle));
}

function maxStrength(
  left: RunwiseIntegrationDetectionStrength,
  right: RunwiseIntegrationDetectionStrength
): RunwiseIntegrationDetectionStrength {
  return STRENGTH_ORDER.indexOf(right) > STRENGTH_ORDER.indexOf(left) ? right : left;
}

function isPythonDependencyFile(file: string) {
  const normalized = normalizePath(file);
  return normalized.endsWith("requirements.txt") || normalized.endsWith("pyproject.toml");
}

function isDockerComposeFile(file: string) {
  const baseName = getBaseName(file);
  return baseName.startsWith("docker-compose") && (baseName.endsWith(".yml") || baseName.endsWith(".yaml"));
}

function isEnvExampleFile(file: string) {
  return getBaseName(file).startsWith(".env");
}

function isExampleReadme(file: string) {
  const normalized = normalizePath(file);
  const baseName = getBaseName(normalized).toLowerCase();
  return normalized.startsWith("examples/") && baseName.startsWith("readme");
}

function isSourceOrConfigFile(file: string) {
  const normalized = normalizePath(file);
  const baseName = getBaseName(normalized);
  return (
    normalized.includes("/src/") ||
    baseName.endsWith(".config.js") ||
    baseName.endsWith(".config.ts") ||
    baseName.endsWith(".json") ||
    isEnvExampleFile(file)
  );
}

function normalizePath(value: string) {
  return value.split("\\").join("/");
}

function normalizeSearchValue(value: string) {
  return value.toLowerCase().replaceAll("-", "_");
}

function findPathMatch(paths: Set<string>, expectedPath: string) {
  const normalizedExpected = normalizePath(expectedPath);
  for (const candidate of paths) {
    if (candidate === normalizedExpected || candidate.endsWith(`/${normalizedExpected}`)) {
      return candidate;
    }
  }

  return undefined;
}

function getBaseName(file: string) {
  return normalizePath(file).split("/").at(-1) ?? file;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
