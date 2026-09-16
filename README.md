# BK on Hudson

Static dinner menu site for a three-course steakhouse night at 389 Washington St, Jersey City.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # static export to out/
```

The production build uses `basePath: /benandkatiedinnermenu`. To preview it the way GitHub Pages serves it:

```bash
mkdir -p /tmp/bkserve && ln -sfn "$PWD/out" /tmp/bkserve/benandkatiedinnermenu
npx serve -l 4321 /tmp/bkserve
# http://localhost:4321/benandkatiedinnermenu/
```

## Deploy

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes to Pages.
One-time setup: repo **Settings → Pages → Source → GitHub Actions**.

Live URL: https://benlim33.github.io/benandkatiedinnermenu/

## Notes

- `data/menu.ts` holds all menu copy, jokes, pairings, house rules and the secret menu. Edit content there only.
- Query params: `?guest=Name` personalizes the greeting, `?sky=dawn|day|dusk|night` forces a sky phase (defaults to the visitor's local time).
- Tapping the "BK on Hudson" title five times unlocks the fourth course.
- `/card/` renders a printable table card with the QR code, generated at build time.
