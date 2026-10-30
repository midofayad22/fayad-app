# Vendored third-party files

Served from the site's own origin so lesson previews work in the sandbox without a CDN.

| Path | Package | Version | License |
|---|---|---|---|
| `bootstrap-5.3.8/` | bootstrap (CSS, RTL CSS, JS bundle) | 5.3.8 | MIT |
| `tailwindcss-browser-4.3.3/` | @tailwindcss/browser (in-browser Tailwind CSS v4 compiler) | 4.3.3 | MIT |
| `vue-3.5.13/` | vue (global production build with template compiler) | 3.5.13 | MIT |

Files are the npm `dist` artifacts with only the trailing sourceMappingURL comment removed.
Upgrade: `npm pack <pkg>@<version>`, replace the files, update this table, `docs/courses-bootstrap-tailwind.md` and the course content.
