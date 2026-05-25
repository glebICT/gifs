# Halloween GIF animation projects

Spooky GIF animations created by 5th grade students using GIMP.

🔗 Live site: [https://glebict.github.io/gifs/](https://glebict.github.io/gifs/)

## Structure

```
index.html      # page shell + theme bootstrap
styles.css      # light/dark themed styles
script.js       # renders projects from data.json + theme toggle
data.json       # all projects, grouped by year and class
2024/           # 2024 GIFs (named, classes 5a & 5b)
2025/           # 2025 GIFs (anonymous)
```

## Adding a new year

Edit `data.json`: add a new entry at the top of `years`. Each project has an
optional `name` (omit it to keep the project anonymous) and a list of `images`.
Drop the GIF files into a matching year folder (e.g. `2026/`).

The newest year is open by default. Link directly to a year with `?year=2024`.
