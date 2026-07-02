# 🎨 Customization Guide

> How to edit components, swap illustrations, and change the color theme.

---

## Color Theme

The entire profile uses a consistent **purple-to-cyan neon gradient** palette. Here are the core color tokens used throughout:

### Color Tokens

| Token         | Hex Code   | Usage                                      |
|---------------|------------|---------------------------------------------|
| `primary`     | `#7c3aed`  | Primary accent (purple) — headers, links    |
| `secondary`   | `#06b6d4`  | Secondary accent (cyan) — highlights, icons |
| `accent`      | `#ec4899`  | Accent (pink) — decorative elements         |
| `bg-dark`     | `#0D1117`  | Dark background for stats cards             |
| `bg-darker`   | `#0f0a2e`  | Darker background for illustrations         |
| `text-primary`| `#c9d1d9`  | Primary text color                          |
| `text-muted`  | `#8b949e`  | Muted/secondary text                        |
| `surface`     | `#1e293b`  | Card/surface background                     |

### Changing the Color Scheme

To change the gradient, update these locations:

1. **Capsule-render banners** in `hero.md` and `footer.md`:
   ```
   customColorList=6,11,20
   ```
   → Change to [other gradient presets](https://github.com/kyechan99/capsule-render#color-list)

2. **Stats cards** in `stats.md`:
   ```
   bg_color=0D1117&title_color=7c3aed&icon_color=06b6d4
   ```
   → Replace hex values with your colors

3. **SVG assets** in `assets/banners/` and `assets/illustrations/`:
   → Find/replace the hex codes in the SVG source

4. **Shields.io badges** in `tech-stack.md`, `hero.md`, `contact.md`:
   → Replace the color segment in badge URLs

---

## Editing Components

Each file in `/components` is a standalone markdown section. Edit any file independently — the `update-readme.yml` workflow will recompose `README.md` automatically.

### Component Order

The compose order is defined in `scripts/update-stats.js`:

```javascript
const COMPONENT_ORDER = [
  "hero.md",       // 1. Header
  "about.md",      // 2. Bio
  "tech-stack.md", // 3. Skills
  "stats.md",      // 4. Stats
  "projects.md",   // 5. Projects
  "achievements.md", // 6. Awards
  "quote.md",      // 7. Quote
  "contact.md",    // 8. Contact
  "footer.md",     // 9. Footer
];
```

**To reorder sections:** Rearrange entries in the array.
**To remove a section:** Delete the entry from the array (or delete the file).
**To add a section:** Create a new `.md` file in `/components` and add it to the array.

---

## Swapping Illustrations

### Using Your Own SVGs

1. Replace files in `assets/illustrations/`:
   - `developer.svg` — Used in the "About Me" section
   - `astronaut.svg` — Used in the "Contact" section
   - `ai.svg` — Used in the "Quote" section

2. Keep the same filename, or update the `<img src="...">` path in the corresponding component.

### Using External Illustration Services

Free illustration sources:
- [unDraw](https://undraw.co/) — Customizable SVG illustrations
- [Storyset](https://storyset.com/) — Animated illustrations
- [Illustrations.co](https://illlustrations.co/) — Open-source illustrations
- [Humaaans](https://www.humaaans.com/) — Mix-and-match people illustrations

---

## Badge Customization

### Style Options

All badges use [shields.io](https://shields.io/). Available styles:

| Style           | Look                    | Best For       |
|-----------------|-------------------------|----------------|
| `for-the-badge` | Large, bold, uppercase  | Hero section   |
| `flat-square`   | Clean, minimal          | Project cards  |
| `flat`          | Rounded, default        | Inline badges  |
| `plastic`       | 3D glossy effect        | Classic look   |

### Adding New Tech Badges

```markdown
![BadgeName](https://img.shields.io/badge/LABEL-COLOR?style=for-the-badge&logo=LOGO_NAME&logoColor=white)
```

Find logo names at [Simple Icons](https://simpleicons.org/).

### Example — Adding a Kubernetes Badge

```markdown
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
```

---

## Stats Card Themes

The stats cards use [github-readme-stats](https://github.com/anuraghazra/github-readme-stats). Popular themes that match the dark aesthetic:

| Theme          | Description                          |
|----------------|--------------------------------------|
| `tokyonight`   | Dark with purple/blue accents ✅ Used |
| `radical`      | Vibrant pink/purple gradient         |
| `merko`        | Green/dark theme                     |
| `gruvbox`      | Warm retro colors                    |
| `dracula`      | Classic dark theme                   |
| `onedark`      | VS Code One Dark inspired            |

Change the `&theme=` parameter in stats card URLs.

---

## Typing Animation

Customize the typing SVG in `hero.md`:

```
https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&duration=3000&pause=1000&color=06B6D4&center=true&vCenter=true&multiline=true&repeat=true&width=600&height=100&lines=LINE1;LINE2;LINE3
```

| Parameter   | Description                          |
|-------------|--------------------------------------|
| `font`      | Font family (Fira Code, Roboto, etc) |
| `size`      | Font size in pixels                  |
| `duration`  | Typing speed in milliseconds         |
| `pause`     | Pause between lines                  |
| `color`     | Text color (hex without #)           |
| `lines`     | Semicolon-separated text lines       |

URL-encode special characters (`+` for space, `%26` for `&`).

---

## Generating Custom Banners

Use the banner generator script for custom text and colors:

```bash
# Hero banner with custom name
node scripts/generate-banner.js --text "Jane Doe" --type hero --colors "#ff6b6b,#feca57,#48dbfb"

# Footer banner
node scripts/generate-banner.js --type footer --height 100

# See all options
node scripts/generate-banner.js --help
```

---

## Capsule Render Options

The header and footer use [capsule-render](https://github.com/kyechan99/capsule-render). Available types:

| Type       | Description              |
|------------|--------------------------|
| `waving`   | Animated wave ✅ Used     |
| `egg`      | Egg-shaped               |
| `shark`    | Shark fin wave           |
| `slice`    | Diagonal slice           |
| `rect`     | Simple rectangle         |
| `soft`     | Rounded rectangle        |
| `cylinder` | 3D cylinder effect       |
| `venom`    | Venom-style blob         |

Change the `type=` parameter in the capsule-render URL.
