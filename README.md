# JCC Incorporated website

Static site for GitHub Pages. HTML, CSS and vanilla JavaScript only. All paths are relative.

## Publish to GitHub Pages
1. Create a repository (for example `jccincorporated.github.io` or any name).
2. Upload the contents of this folder to the repository root (index.html must be at the root).
3. Settings > Pages > Source: Deploy from a branch, branch `main`, folder `/ (root)`.

## Adding photos
Placeholders show wherever a photo belongs (search for `class="ph`, `avatar`, and `hero.jpg`).
- Hero photo: save as `images/hero.jpg`. The hero uses it automatically.
- Team: replace each `.avatar` block with `<img src="images/team/NAME.jpg" alt="NAME">`.
- Projects: replace `.ph` blocks with `<img>` tags in `images/projects/`.
- Logo: `images/logo.png` was cropped from the existing site recording. Replace it with the original logo file when you have it.

## Contact form
The form validates in the browser. It is not yet connected to a service. Set `data-endpoint` on
`<form id="contact-form">` in contact.html to a form service URL (for example Formspree or Getform) to enable sending.
Until then, visitors see the office phone and email.

## Items to confirm before launch
- Brian Hernandez: title is obscured in the recording (shown as "Title to confirm").
- Nick Breeden and Grady Hernandez appear in the brief but were not visible in the recording. Their entries are included from the brief.
- Project names flagged "[verify]" are hard to read in the recording. Check them against the original site.
- Several project names appear in both the 2024 and 2023 lists. Confirm the years.
- 2022 project list is included from the recording; confirm it should be published.
- Homepage intro and About copy are assembled from the existing site's wording. Review before launch.
- The 62 projects statistic is from the recording's 2025 highlights.
- Desktop layout is designed from the mobile reference. The reference recording was mobile only.
