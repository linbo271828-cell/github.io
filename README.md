# Linbo Gong — Portfolio

This is a lightweight multi-page portfolio built with plain HTML/CSS/JS.
It’s designed to be easy to read and easy to extend.

## Quick start (local)
Open `index.html` in your browser, or run a tiny server:

- Python:
  - `python -m http.server 8000`
  - Visit `http://localhost:8000`

## Deploy on GitHub Pages
1. Create a new repo (e.g., `linbo-portfolio`)
2. Upload these files to the repo root:
   - `index.html`, `projects.html`, `style.css`, `script.js`, `Resume.pdf`, `assets/`
3. In GitHub: **Settings → Pages**
4. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
5. Save. Your site URL will appear on the same page.

## Customize
- Replace `assets/profile.svg` with your real photo:
  - add `assets/linbo.jpg`
  - update `index.html` image src to `assets/linbo.jpg`
- Update placeholders on `projects.html` with real repo/write-up links.
