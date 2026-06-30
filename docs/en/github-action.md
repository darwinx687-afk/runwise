# GitHub Action

Runwise includes a local-first composite action in this repository.

## Current Local Usage

```yaml
- uses: ./
  with:
    min-score: "70"
    fail-on-blocking: "true"
    fail-on-severity: "critical"
```

The action runs `runwise doctor`, writes a GitHub Step Summary, exposes report outputs, and can fail on blocking findings, severity thresholds, or a minimum score.

## Future Public Usage

```yaml
# After the public repository and release tag are created:
- uses: <owner>/<repo>@v0
```

Do not use public-tag examples until the repository and release tag exist.
