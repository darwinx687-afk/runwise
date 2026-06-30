import { promises as fs } from "node:fs";
import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import * as path from "node:path";
import type { RunwiseDoctorReport } from "@runwise/schemas";
import { renderDashboardHtml } from "./render-dashboard.js";

export const DEFAULT_VIEWER_PORT = 4321;
export const RUNWISE_REPORT_PATH = ".runwise/runwise-report.json";

export interface RunwiseViewerOptions {
  cwd?: string;
  port?: number;
}

export interface RunwiseViewerServer {
  url: string;
  reportPath: string;
  server: Server;
  close(): Promise<void>;
}

export class RunwiseReportMissingError extends Error {
  readonly code = "RUNWISE_REPORT_MISSING";

  constructor(readonly reportPath: string) {
    super(`Runwise report not found: ${reportPath}`);
  }
}

export function isRunwiseReportMissingError(error: unknown): error is RunwiseReportMissingError {
  return error instanceof RunwiseReportMissingError;
}

export function resolveRunwiseReportPath(cwd = process.cwd()): string {
  return path.join(cwd, RUNWISE_REPORT_PATH);
}

export async function startRunwiseViewer(
  options: RunwiseViewerOptions = {}
): Promise<RunwiseViewerServer> {
  const cwd = options.cwd ?? process.cwd();
  const reportPath = resolveRunwiseReportPath(cwd);
  const report = await readReport(reportPath);
  const html = renderDashboardHtml(report);
  const json = `${JSON.stringify(report, null, 2)}\n`;
  const markdownPath = path.join(cwd, ".runwise/runwise-report.md");
  const staticHtmlPath = path.join(cwd, ".runwise/runwise-report.html");
  const server = createServer((request, response) => {
    void handleRequest(request, response, {
      html,
      json,
      markdownPath,
      staticHtmlPath
    }).catch(() => {
      if (!response.headersSent) {
        send(response, 500, "Runwise Viewer request failed", "text/plain; charset=utf-8");
        return;
      }

      response.end();
    });
  });
  const requestedPort = options.port ?? DEFAULT_VIEWER_PORT;

  await listen(server, requestedPort);

  const address = server.address();
  const actualPort = typeof address === "object" && address ? address.port : requestedPort;
  const url = `http://localhost:${actualPort}`;

  return {
    url,
    reportPath,
    server,
    close: () => closeServer(server)
  };
}

async function readReport(reportPath: string): Promise<RunwiseDoctorReport> {
  let source: string;

  try {
    source = await fs.readFile(reportPath, "utf8");
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      throw new RunwiseReportMissingError(reportPath);
    }

    throw error;
  }

  return JSON.parse(source) as RunwiseDoctorReport;
}

interface RequestContext {
  html: string;
  json: string;
  markdownPath: string;
  staticHtmlPath: string;
}

async function handleRequest(
  request: IncomingMessage,
  response: ServerResponse,
  context: RequestContext
) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    send(response, 405, "Method not allowed", "text/plain; charset=utf-8");
    return;
  }

  const requestUrl = new URL(request.url ?? "/", "http://localhost");
  const pathname = requestUrl.pathname;

  if (pathname === "/") {
    send(response, 200, context.html, "text/html; charset=utf-8", request.method === "HEAD");
    return;
  }

  if (pathname === "/report.json") {
    send(response, 200, context.json, "application/json; charset=utf-8", request.method === "HEAD");
    return;
  }

  if (pathname === "/health") {
    send(
      response,
      200,
      `${JSON.stringify({ ok: true, service: "runwise-viewer" }, null, 2)}\n`,
      "application/json; charset=utf-8",
      request.method === "HEAD"
    );
    return;
  }

  if (pathname === "/runwise-report.md") {
    await sendOptionalFile(
      response,
      context.markdownPath,
      "text/markdown; charset=utf-8",
      request.method === "HEAD"
    );
    return;
  }

  if (pathname === "/runwise-report.html") {
    await sendOptionalFile(
      response,
      context.staticHtmlPath,
      "text/html; charset=utf-8",
      request.method === "HEAD"
    );
    return;
  }

  send(response, 404, "Not found", "text/plain; charset=utf-8");
}

async function sendOptionalFile(
  response: ServerResponse,
  filePath: string,
  contentType: string,
  headOnly = false
) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    send(response, 200, content, contentType, headOnly);
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      send(response, 404, "Report file not found", "text/plain; charset=utf-8", headOnly);
      return;
    }

    throw error;
  }
}

function send(
  response: ServerResponse,
  statusCode: number,
  body: string,
  contentType: string,
  headOnly = false
) {
  response.writeHead(statusCode, {
    "content-type": contentType,
    "cache-control": "no-store",
    "x-content-type-options": "nosniff"
  });

  if (headOnly) {
    response.end();
    return;
  }

  response.end(body);
}

function listen(server: Server, port: number): Promise<void> {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => {
      server.off("error", reject);
      resolve();
    });
  });
}

function closeServer(server: Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}
