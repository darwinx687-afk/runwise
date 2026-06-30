# Security

Runwise is local-first and currently avoids hidden network calls in runtime code.

## Reporting Security Issues

Please do not open public issues for suspected vulnerabilities. Use a private disclosure channel once the project publishes one.

## Current Security Posture

- No login.
- No cloud service.
- No billing.
- No database.
- No hidden network calls in runtime code.
- No model calls inside Doctor, trace validation, replay, or Failure-to-Eval generation.
- Generated `.runwise/` reports are local artifacts.

## Future Security Expectations

Readiness checks should remain local-first, explicit, auditable, and safe to run in CI.
