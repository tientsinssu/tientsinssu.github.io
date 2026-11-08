# MDShot

Copy Markdown → open → paste → save it as a long image to Photos in one tap. LaTeX math and code highlighting are supported.
No signing, never expires, and after the first visit it works offline.

Everything happens on your phone; your content is never uploaded to any server.

## Address and installing

This tool is part of the tientsinssu.github.io website and is deployed with it:
`https://tientsinssu.github.io/tools/mdshot/`

On iPhone, open that address in **Safari** → tap the **Share** button → **Add to Home Screen**.
From then on, launch it from the “MDShot” icon on your Home Screen, just like a regular app.

> Once it has **opened successfully one time**, the offline cache kicks in and it works without a connection.
> Colors and the light/dark theme match the website; switch dark mode from the ··· menu (top right) and the website switches too.

## Using it

1. Copy some Markdown in any app
2. Open MDShot and tap **Paste** → Safari shows a small “Paste” bubble; tap it
3. It renders and makes the image preview automatically (turn off “Make image right after pasting” in the ··· menu)
4. Tap **Save to Photos** → choose **Save Image** in the menu (or long-press the preview to save it)

Also:
- Pencil (top left): edit or type Markdown by hand
- Very long content is split into several images automatically (a heading is never separated from its text), because Safari limits the size of a single image
- Short content is exported at 3x resolution, long content at 2x

## Updating

The tool's source lives in `static/tools/mdshot/` in the private repo `tientsinssu/blog-source`
and is deployed automatically with the website:

1. Edit the files in `static/tools/mdshot/`
2. Bump the `CACHE` version in `sw.js` by one (e.g. `mdshot-v3` → `mdshot-v4`); otherwise installed copies won't update
3. Commit and push to the `main` branch of `blog-source`
4. GitHub Actions builds the site and publishes it to the public repo `tientsinssu.github.io`; it goes live in a minute or two

Because of the offline cache, an installed copy switches to the new version after you **open it twice**.
