# 3 Fall Fun 人生跌塔 · Cloudflare edition

**Play at [3fallcrab.com](https://3fallcrab.com)**

*Build your future, one block at a time.* A 3-minute physics stacking game about money choices, by **3 Fall Crab 整冧咗team** (HSUHK) for the Personal Finance Ambassador Programme 2026.

This repo is a ready-to-deploy website:

- **The game:** static files in `public/`, served from Cloudflare's edge.
- **A live leaderboard:** a small Cloudflare Worker (`server/`) with a D1 database. It keeps a weekly board (resets Monday 00:00 HKT) and an all-time board, plus the anonymised "Stats" tab.
- **`/admin`:** hide unsuitable nicknames and download every game as a CSV for your report.
- **`/poster`:** a printable A4 booth poster with a QR code that points at your site.

---

## Deploy from GitHub (easiest, no installs)

Use the Cloudflare account that holds the **3fallcrab.com** domain. Every push to `main` redeploys automatically.

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Import a repository**. Connect GitHub if asked, then pick **Derek2352/3fallcrab**.
2. Keep the project name `three-fall-fun`. Set the build command to `npm run build` and the deploy command to `npx wrangler deploy`.
3. Click **Deploy**. Cloudflare:
   - creates the leaderboard database on the first build, then keeps using the same one on every later build;
   - attaches **3fallcrab.com** and **www.3fallcrab.com** to the game, replacing whatever those two hostnames pointed at before (email and other DNS records are untouched);
   - keeps `https://three-fall-fun.<your-subdomain>.workers.dev` working as a backup address.
4. **Open the domain to the public.** 3fallcrab.com currently sits behind a Cloudflare Access login, so players would see a sign-in page. In **Zero Trust → Access → Applications**, find the app for `3fallcrab.com` and do one of these:
   - **Recommended:** keep it, but change its path so it covers only `3fallcrab.com/admin` (add `3fallcrab.com/api/admin` too). The game is then public, and the admin page gets a second lock.
   - Or delete the application.
5. **Set the admin password.** Go to **Workers & Pages → three-fall-fun → Settings → Variables and Secrets → Add**. Choose type **Secret**, name it `ADMIN_TOKEN`, and set a long password (16+ characters). Then open [3fallcrab.com/admin](https://3fallcrab.com/admin).
6. **Print the booth poster** from [3fallcrab.com/poster](https://3fallcrab.com/poster). Use A4 with "Background graphics" turned on.

Link previews (WhatsApp, Instagram, Facebook) already point at `https://3fallcrab.com`; this is set in `package.json` → `config.site_url`.

---

## Deploy from your computer (about 5 minutes)

You need a free [Cloudflare account](https://dash.cloudflare.com/sign-up) and [Node.js](https://nodejs.org) 22 or newer. Wrangler, Cloudflare's command-line tool, won't run on older versions.

```bash
npm install
npx wrangler login      # opens the browser once to connect your Cloudflare account
npm run deploy
```

When it finishes, the game is live at https://3fallcrab.com, with `https://three-fall-fun.<your-subdomain>.workers.dev` as a backup. Open it on your phone and play. The first time, Wrangler may ask before it replaces the domain's existing DNS records; answer yes.

- **The first deploy creates the database for you.** Wrangler creates a D1 database for the `DB` binding and writes its `database_id` into `wrangler.jsonc`. Keep that change (commit it if you use Git), so later deploys reuse the same database.
- **New Cloudflare account?** You may be asked to pick a `workers.dev` subdomain first. Your team or school name works well.
- **Using a different domain** (for example, another team's copy)? Edit the `routes` block in `wrangler.jsonc` and `config.site_url` in `package.json`, or delete both to use only the `workers.dev` address.

### After the first deploy

1. **Open the domain to the public** by changing its Cloudflare Access login; see step 4 of the GitHub steps above.
2. **Turn on the admin page.** Run `npm run admin-token` and paste a long random password (16+ characters). Then open https://3fallcrab.com/admin and enter it there.
3. **Print the booth poster.** Open https://3fallcrab.com/poster, check the address under the QR code, then press **Print poster**. Use A4 and turn on "Background graphics".

---

## No terminal? Drag-and-drop the game only

If you just need the game online quickly, without the shared leaderboard:

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Upload assets**.
2. Name the project, then drag the **`public`** folder in (the whole folder, not just `index.html`) and click **Deploy**.

Everything works, but scores are saved **on each player's device** only. Cloudflare's drag-and-drop upload cannot run the leaderboard code. For the live weekly board and prizes, use `npm run deploy` above.

### Other ways to deploy

- **Cloudflare Pages with Functions.** `functions/api/[[path]].js` exposes the same API as a Pages Function. Use output directory `public`, build command `npm run build`, and a D1 binding named `DB`. Cloudflare now recommends Workers for new projects, so prefer the steps above.

---

## Run it on your computer

```bash
cp .dev.vars.example .dev.vars   # local admin token
npm run dev                      # http://localhost:8787 with a local database
```

`npm run dev` builds `public/` and starts Wrangler. If you edit anything in `src/`, run `npm run build` again; the dev server picks up the new files.

---

## Settings

Set these in `wrangler.jsonc` under `"vars"`, then `npm run deploy`. Secrets are set with Wrangler and never go in the file.

| Name | Where | Default | What it does |
|---|---|---|---|
| `TIMEZONE` | vars | `Asia/Hong_Kong` | Time zone for the Monday weekly reset |
| `LEADERBOARD_CLOSED` | vars | `"0"` | Set to `"1"` after the event. New scores are then saved on players' devices only; the board stays visible. |
| `RATE_LIMIT` | vars | `20` | Max scores per minute from one network (one IPv4 address, or one IPv6 /64). Booth Wi-Fi and mobile networks share addresses, so keep it generous. |
| `ADMIN_TOKEN` | secret, `npm run admin-token` | (off) | Turns on `/admin` and the admin API |
| `IP_SALT` | secret, `npx wrangler secret put IP_SALT` | built-in | Extra salt for the hashed network id used by the rate limit |

---

## The leaderboard and your data

- **What is saved per game:** nickname, score, floors reached, life stage, Life Event choices (card id plus wise, risky or none), habit pledge, quiz score, how the game ended, and the time.
- **What is not saved:** real names, emails or IP addresses. For the rate limit, the API keeps a salted hash of the network address. The salt changes every week, so players can't be tracked over time.
- **Nickname filter:** nicknames with common English or Cantonese swear words become "Anonymous crab 匿名蟹". This includes spaced-out, full-width and l33t spellings, while names like Jason99 and Fukuda pass. Invisible-character names are blocked too. Use `/admin` to hide anything else.
- **Stats tab:** shows the share of wise choices, which of the 3 Falls players hit most, the most popular habit pledge and the average quiz score. It uses the latest 1,000 games.
- **CSV export:** `/admin → Download CSV` gives every game, which is handy for the post-event report and the 70% quiz target.
- **Prizes:** scores are reported by the player's browser, so a determined player could fake one. Before handing out a weekly prize, ask the winner to show their end-of-game statement or phone. Hide anything suspicious in `/admin`.
- **Free-plan limits:** Workers gives 100,000 requests a day. D1 gives 5 million rows read and 100,000 rows written a day, enforced since 1 Sept 2026. One game is one score post, and the board refreshes only while it's on screen (every 45 s). A busy booth day is far below these limits.

### Updating the live game without losing scores

Pushing to `main` redeploys only the code and the files in `public/`. The scores live in the D1 database bound to the Worker as `DB`, and every deploy keeps using that same database, so the leaderboard carries on untouched. Scores saved on players' phones use fixed storage keys, so updates keep those too.

What could reset the board, and what stops it:

- **Renaming the Worker or the `DB` binding.** Changing `"name"` in `wrangler.jsonc` (`three-fall-fun`) or the `DB` binding makes Cloudflare create a new, empty database. `npm run build` refuses to build if either changes, so a GitHub deploy fails safely instead of going live.
- **SQL that wipes the table.** The build also refuses `DROP TABLE`, `TRUNCATE` or a `DELETE FROM scores` without `WHERE` anywhere in `server/`, `functions/` or `migrations/`.
- **Changing the table later.** Only ever add columns (`ALTER TABLE scores ADD COLUMN ...`); never remove or rename them.
- **Deleting the database in the dashboard.** Don't. To stop new scores after the event, set `LEADERBOARD_CLOSED` to `"1"` instead; the board stays visible.

If you ever really want a brand-new board, run the build with `ALLOW_LEADERBOARD_RESET=1`.

**Backups:**

- **Quick:** `/admin → Download CSV` at any time.
- **Full SQL copy:** find the database name in the Cloudflare dashboard under **Storage & Databases → D1** (it starts with `three-fall-fun`), then run `npx wrangler d1 export <database-name> --remote --output backup.sql`.
- **Undo a mistake:** D1 Time Travel can roll the database back to any minute in the last 7 days on the free plan (30 days on paid): `npx wrangler d1 time-travel restore <database-name> --timestamp=2026-10-09T12:00:00Z`.

### API

| Route | Use |
|---|---|
| `GET /api/health` | Is the database connected? |
| `GET /api/scores` | This week's top 10 and the all-time top 10 |
| `GET /api/scores?view=stats` | Anonymised totals for the Stats tab |
| `POST /api/scores` | Save one finished game, validated server-side |
| `GET /api/admin/scores`, `POST /api/admin/hide`, `GET /api/admin/export` | Admin; needs the `Authorization: Bearer <ADMIN_TOKEN>` header |

The database table is created automatically on first use. `migrations/0001_create_scores.sql` holds the same schema if you prefer `npm run db:migrate`.

---

## Editing the game

All game source lives in `src/`. After any change, run `npm run build`, which fingerprints the CSS and JS so browsers always load the newest version.

| File | What's in it |
|---|---|
| `src/game.js` | Game rules, Life Event cards, quiz, habits and leaderboard client. Tuning constants are near the top: `GAME_MS` (3 min), `CARD_MS`, `MAX_DROPS`. Vine items: `VINE_RARE` (chance a new item is vine-wrapped, 5%), `VINE_GRABS` (blocks one vine item can grab), `MAX_FUSED` (items per stuck-together group). |
| `src/items/*.js` | The 32 everyday items: physics shape plus clay drawing for each |
| `src/clay.js` | Clay rendering kit (palette, lighting, materials) |
| `src/audio.js` | Synthesised music and sound effects, with no audio files |
| `src/style.css`, `src/index.html` | Page layout |
| `src/static/` | Copied as-is: icons, 404, admin, poster, `_headers` (security and cache headers) |
| `server/api.js` | Leaderboard API (validation, rate limit, admin) |
| `server/worker.js` | Worker entry point: `/api/*` goes to the API, everything else is static |

Matter.js 0.19.0 (MIT) and qrcode-generator 1.4.4 (MIT) are bundled locally. Fonts come from Google Fonts.
