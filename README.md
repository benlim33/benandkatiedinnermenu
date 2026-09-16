# BK on Hudson

Static dinner menu site for a three-course steakhouse night at 389 Washington St, Jersey City.

## Run it locally (day to day)

```bash
cd ~/Desktop/benandkatiedinnermenu
npm install          # first time only, or after pulling changes
npm run dev
```

Open **http://localhost:3000**. Edits to any file hot-reload automatically.
Press `Ctrl+C` in the terminal to stop the server.

Useful URLs while the dev server is running:

| URL | What it shows |
| --- | --- |
| http://localhost:3000 | The menu |
| http://localhost:3000/?guest=Isabel | Personalized greeting |
| http://localhost:3000/?sky=day | Force the daytime sky |
| http://localhost:3000/?sky=dusk | Force golden hour |
| http://localhost:3000/?sky=night | Force the night sky |
| http://localhost:3000/card | Printable QR table card |

If port 3000 is already taken, run `npm run dev -- -p 3001` instead.

## Preview the real production build

The production build sets `basePath: /benandkatiedinnermenu`, so assets only resolve
under that subpath. Plain `npx serve out` will render an unstyled page — the subpath
symlink below is what makes it match GitHub Pages.

```bash
npm run build                                    # static export into out/
mkdir -p /tmp/bkserve
ln -sfn "$PWD/out" /tmp/bkserve/benandkatiedinnermenu
npx serve -l 4321 /tmp/bkserve
```

Open **http://localhost:4321/benandkatiedinnermenu/** (the trailing slash matters).

## Deploy

```bash
git add -A
git commit -m "Update menu"
git push
```

The workflow in `.github/workflows/deploy.yml` builds and publishes to Pages on every
push to `main`. Watch it under the repo's **Actions** tab; a deploy takes a minute or two.

One-time setup: repo **Settings → Pages → Source → GitHub Actions**.

Live URL: https://benlim33.github.io/benandkatiedinnermenu/

## Troubleshooting

- **Page loads but has no styling** — you are serving `out/` without the
  `/benandkatiedinnermenu/` subpath. Use the symlink command above, or just use `npm run dev`.
- **CI fails with `npm ci` "lock file out of sync"** — regenerate the lockfile with
  `npm install --package-lock-only`, then commit `package-lock.json`. A plain
  `npm install` can leave nested optional platform deps out of the lockfile.
- **Pages still shows an old version** — check the Actions tab finished green, then
  hard-reload (`Cmd+Shift+R`). Pages caches aggressively.
- **`EACCES` errors during `npm install`** — fix cache ownership once with
  `sudo chown -R $(id -u):$(id -g) ~/.npm`.

## Notes

- `data/menu.ts` holds all menu copy, jokes, pairings, house rules and the secret menu. Edit content there only.
- Query params: `?guest=Name` personalizes the greeting, `?sky=dawn|day|dusk|night` forces a sky phase (defaults to the visitor's local time).
- Tapping the "BK on Hudson" title five times unlocks the fourth course.
- `/card/` renders a printable table card with the QR code, generated at build time.
