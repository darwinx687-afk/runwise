# Launch Posting Tracker

This is a manual tracker for public launch posts. Do not add telemetry, analytics scripts, tracking pixels, or hosted feedback forms.

| Platform | Post type | Link | Date | Audience | Initial reaction | Feedback themes | Follow-up needed | Issue links |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| GitHub | Release / repository share |  |  | Developers |  |  |  |  |
| LinkedIn | Personal post |  |  | AI builders / teams |  |  |  |  |
| X | Short post |  |  | Developers |  |  |  |  |
| Hacker News | Show HN |  |  | Developer community |  |  |  |  |
| Reddit | Technical post |  |  | AI / LLM community |  |  |  |  |
| Dev.to | Intro post |  |  | Developers |  |  |  |  |
| Direct sharing | Private message |  |  | Trusted AI builders |  |  |  |  |

## Manual Notes

- Record only public links or safe private-sharing notes.
- Move actionable feedback into GitHub Issues.
- Do not paste secrets, private customer data, or proprietary traces into this tracker.

## Launch Posting Log

Platform: Xiaohongshu / 小红书
Post link: Published by user; public link not captured. Creator page returned `https://creator.xiaohongshu.com/publish/publish?source=&published=true`.
Date: 2026-07-01
Image used: `/Users/xuxin/Downloads/runwise-cn-launch.png`
Text version used: Full Chinese Xiaohongshu copy
Initial reaction: Not checked
Follow-up needed: Add public post URL if available from Xiaohongshu profile or note management.

Platform: Juejin / 掘金
Post link: https://juejin.cn/spost/7657393797290278966
Date: 2026-07-01
Image used: `/Users/xuxin/Downloads/runwise-cn-launch.png`
Text version used: Full Juejin markdown copy
Initial reaction: Published successfully; page showed "发布成功".
Follow-up needed: Monitor comments and move actionable feedback into GitHub Issues.

Platform: V2EX
Post link: Skipped by user; no post published.
Date: 2026-07-01
Image used: None
Text version used: V2EX Chinese text-first copy was prepared but not posted.
Initial reaction: Not posted; page required sign-in/security check.
Follow-up needed: None unless a manual V2EX post is desired later.

Platform: LinkedIn
Post link: Published by user; public link not captured.
Date: 2026-07-01
Image used: `/Users/xuxin/Downloads/runwise-en-launch.png`
Text version used: Full LinkedIn English copy
Initial reaction: Published manually by user.
Follow-up needed: Add public post URL if available from LinkedIn profile activity.

Platform: X / Twitter
Post link: Skipped by user; no post published.
Date: 2026-07-01
Image used: None
Text version used: X English short copy was prepared but not posted.
Initial reaction: Not posted; login flow was not completed.
Follow-up needed: None unless a manual X post is desired later.

Platform: GitHub repository description
Post link: https://github.com/darwinx687-afk/runwise
Date: 2026-07-01
Image used: None
Text version used: Repository description updated to "Check AI agents before you ship them — local reports, trace replay, and failure-to-eval for MCP/RAG/LLM apps."
Initial reaction: GitHub CLI update succeeded; existing topics were preserved.
Follow-up needed: Verify rendering during post-push launch review if needed.

## Launch Monitoring Pass 1 - 2026-07-01

Platform: GitHub
Post link: https://github.com/darwinx687-afk/runwise
Visible status: Repository is public; preview release is visible at https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.0-preview.0.
Visible reactions: 0 stars, 0 forks, 0 open issues. Latest GitHub Actions run passed.
Feedback themes: None yet.
Follow-up needed: Continue monitoring stars, issues, and Actions status after more external traffic.
Issue candidates: None.

Platform: Juejin / 掘金
Post link: https://juejin.cn/post/7657393797290278966
Visible status: Public article is visible.
Visible reactions: 2 reads; 0 comments; no visible actionable comments. Like/bookmark counts were not visible in the public page snapshot.
Feedback themes: None yet.
Follow-up needed: Recheck comments and reactions in the next monitoring pass.
Issue candidates: None.

Platform: Xiaohongshu / 小红书
Post link: Public URL not captured.
Visible status: Login required; user action needed.
Visible reactions: Not checked.
Feedback themes: Not available.
Follow-up needed: User can provide the public post URL or open the logged-in note management/profile page during a future monitoring pass.
Issue candidates: None.

Platform: LinkedIn
Post link: Public URL not captured.
Visible status: Login required; user action needed.
Visible reactions: Not checked.
Feedback themes: Not available.
Follow-up needed: User can provide the public post URL or open the logged-in profile activity page during a future monitoring pass.
Issue candidates: None.

## v0.1.1-preview.0 Sharing Candidate - 2026-07-01

Release URL: https://github.com/darwinx687-afk/runwise/releases/tag/v0.1.1-preview.0

Recommended platforms:

- Xiaohongshu / 小红书
- Juejin / 掘金
- LinkedIn
- X / Twitter
- V2EX, if the user wants to retry manually
- GitHub Discussions, if discussions are enabled later

Suggested framing:

- Small public preview polish update
- First-time developer experience improvement
- Clearer source-install path
- Better example gallery and report readability
- Still source-install only, no npm package yet
- Plugin architecture is documented as future exploration only

Status: Not yet posted.

User approval needed before posting: Yes.

Prepared copy:

- English and Chinese sharing pack: `docs/V0_1_1_SHARING_PACK.md`
- Chinese mirror: `docs/V0_1_1_SHARING_PACK.zh-CN.md`

Follow-up needed:

- Do not publish automatically.
- Ask the user before posting to any external platform.
- After any post, record the public URL and visible early reaction in this tracker.
