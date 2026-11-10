# Jan Setu

A voice-first assistant that tells citizens which government schemes they may qualify for and which documents to carry, in English, Hindi and Kannada.

Built for Code for INNOVEX '26 (PS1, GovTech).

## Run it

Needs Node 18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

Use Chrome or Edge for voice input. The mic needs HTTPS or localhost.

## Build

```bash
npm run build      # creates dist/
npm run preview    # test the built site locally
```

## Works without a backend

With no backend set, the app uses a built-in matcher and 15 demo schemes (`src/data/schemes.js`), so the demo always works.

## Connecting your backend later

1. Copy `.env.example` to `.env`.
2. Set `VITE_API_URL=https://your-backend.example.com`.
3. Make your server answer `POST /ask`:

Request:

```json
{ "text": "I'm a farmer in Udupi with two acres", "language": "en" }
```

`language` is `en`, `hi` or `kn`.

Response:

```json
{
  "reply": "Optional sentence shown above the cards",
  "schemes": [
    { "id": "pm-kisan", "why": "You mentioned: farmer" }
  ]
}
```

- `id` matches a scheme in `src/data/schemes.js`. You can also send a full scheme object with plain-string fields instead.
- If the backend is down or errors, the app falls back to the demo data.
- Enable CORS for your frontend's domain on the backend.

## Deploy

### Vercel (easiest)

1. Push this folder to a GitHub repository.
2. Go to vercel.com, sign in with GitHub, click **Add New > Project**, and import the repo.
3. Framework preset: **Vite**. Build command `npm run build`. Output directory `dist`.
4. (Optional) Add the environment variable `VITE_API_URL`.
5. Click **Deploy**. You get an HTTPS link like `https://jan-setu.vercel.app`.

### Netlify

Import the repo the same way (build `npm run build`, publish `dist`), or run `npm run build` locally and drag the `dist` folder onto app.netlify.com/drop.

### GitHub Pages

The build uses relative paths, so it works under a sub-path.

1. `npm run build`
2. Publish the contents of `dist/` to the `gh-pages` branch (or use a GitHub Action).
3. In the repo, open Settings > Pages and pick that branch.

## Notes

- Scheme details are demo data. Confirm everything on the official websites before relying on it.
- Hindi and Kannada text should be checked by a native speaker before the final demo.
- Kannada voice output depends on the voices installed on the device.
