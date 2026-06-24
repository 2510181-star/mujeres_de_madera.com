# Mujeres de Madera en Transformación

Static single-page website — vanilla HTML/CSS/JS, no build system.

## Structure

- `index.html` — single entry point, served directly (no bundler)
- `css/styles.css` — all custom styles (Tailwind CSS loaded from CDN)
- `js/script.js` — all JS, global scope, runs on `DOMContentLoaded`
- `IMG/` — image assets (gallery + logo)

## Dependencies (all CDN, no package manager)

- Tailwind CSS `<script>` (not the npm build — no `tailwind.config`)
- Google Fonts: Playfair Display + Lato
- Font Awesome 6.5.0

## Key quirks

- **Language:** Spanish (Mexico) — all UI text, commits, and comments
- **No tests, no linter, no typechecker, no CI** — nothing to run
- **No `.gitignore`** — be mindful of what gets committed
- **Contact form is non-functional** — placeholder phone/email, no `action` or JS handler
- **Gallery images** are loaded directly from `IMG/`; the JS has skeleton `data-src` lazy-load code but the HTML uses `src` directly
- **Lightbox** uses keyboard nav (Escape, arrow keys), wraps around on arrows

## Deployment

- Remote: `https://github.com/2510181-star/mujeres_de_madera.com.git`
- Hosted on GitHub Pages (config via GitHub UI, no Actions workflow in repo)
- Simple push-to-deploy: commit and push to `main`

## Style conventions

- CSS custom properties in `:root` for the earthy color palette (`--bark`, `--moss`, `--cream`, etc.)
- Gallery cards use IntersectionObserver for staggered fade-in animations
- Responsive breakpoint at 768px
