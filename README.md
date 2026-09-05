# Social Feed Parser

Parses public Instagram and TikTok profile feeds and extracts structured
data: captions, hashtags, mentions, basic sentiment, engagement metrics,
and media links. Exports to JSON and/or CSV, plus a console summary.

## Setup

```bash
npm install
cp .env.example .env
```

## Usage

```bash
# Scrape an Instagram profile (20 most recent posts by default)
node src/index.js instagram some_username --limit 30 --format both

# Scrape a TikTok profile
node src/index.js tiktok some_username --limit 15 --format json
```

Output files land in `./output/`.

## Dashboard (public/index.html)

A browser-based viewer for your exports — no server or build step needed.

1. Run a scrape (above) to produce a JSON file in `./output/`.
2. Open `public/index.html` directly in your browser (double-click it, or
   `open public/index.html` on macOS).
3. Click **Load export** (or drag the JSON file onto the page) and select
   the file from `output/`.

It shows:
- Summary stats (post count, avg likes/comments/views)
- Top hashtags, ranked
- Sentiment split (positive/neutral/negative)
- A filterable feed log (All / Instagram / TikTok) with a per-post
  engagement pulse bar, linking out to each original post

Everything runs client-side in the browser — the file never leaves your
machine. Files: `public/index.html`, `public/style.css`, `public/app.js`.

## Features included

- **Instagram scraper** — pulls post URLs, captions, thumbnails from a
  public profile grid.
- **TikTok scraper** — pulls video URLs, captions, view counts,
  thumbnails; optional deep-fetch (`scrapeTikTokVideoDetail`) for full
  like/comment/share counts per video.
- **Parsing utilities** — hashtag extraction, @mention extraction,
  lightweight keyword-based sentiment (positive/negative/neutral),
  shorthand number normalization ("12.4K" → 12400).
- **Export** — JSON and CSV writers, plus an aggregate summary
  (average engagement, top hashtags, sentiment breakdown).
- **CLI** — `instagram <username>` / `tiktok <username>` commands with
  `--limit` and `--format` flags.

## Feature ideas for next steps

Pick any of these and I can build them in:

1. **Scheduled polling** — run on a cron/interval and append only new
   posts to a running dataset (diffing against previously saved IDs).
2. **Keyword/hashtag alerts** — flag or notify when a post matches a
   watchlist of terms.
3. **Multi-account batch mode** — pass a list of usernames from a file
   and scrape them all in one run.
4. **Image/video download** — save media files locally alongside the
   metadata.
5. **Dashboard UI** — a small web front-end (charts for engagement
   over time, hashtag clouds) reading from the JSON/CSV output.
6. **Official API mode** — swap the scraper for Instagram Graph API /
   TikTok Display API calls when you have developer credentials, for
   a more reliable and ToS-compliant data source.
7. **Proxy/rotation support** — reduce rate-limiting/blocking risk for
   larger scraping jobs.
8. **Database export** — write directly to SQLite/Postgres/MongoDB
   instead of (or in addition to) files.

## Important notes

- Instagram and TikTok change their page markup often; scraper
  selectors may need updates over time.
- Scraping public pages should respect each platform's Terms of
  Service and robots.txt — for production or commercial use, the
  official APIs are the compliant path.
- Logged-out Instagram pages hide real like/comment counts; those
  fields return `0` unless you authenticate or use the Graph API.
