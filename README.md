# Luke Harper's CV Website

A modern, responsive personal CV website built with HTML, CSS, and JavaScript.

## Project Structure

```
.
├── index.html          # Main landing page (About Me)
├── cv.html             # CV/Resume page
├── skills.html         # Skills showcase page
├── styles.css          # Main stylesheet
├── script.js           # Main JavaScript functionality
├── js/
│   ├── components.js   # Reusable UI components
│   └── content.js      # Content management and rendering
├── data/
│   └── content.json    # Site content and configuration
└── images/             # Image assets
```

## Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices.
- **Dynamic Content**: All text content is managed via `data/content.json` for easy updates.
- **Interactive Skills**: Categorized skills with expandable details.
- **Page Transitions**: Smooth opacity transitions between pages.
- **Dark Mode**: Automatic (time-based 6PM-6AM) and manual debug toggle (Shift+Alt+D).
- **Downloadable CV**: Options to download the CV in PDF or Word formats.

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Local Development**:
   You can serve the files using any static file server.
   For example, using Python's built-in server:
   ```bash
   python -m http.server 8000
   ```
   Or using the included waitress server script:
   ```bash
   python dev_waitress_server.py
   ```
3. **Open in Browser**:
   Navigate to `http://localhost:8000` (or the port provided by your server).

## Content Management

The site's content is centralized in `data/content.json`.
- **Navigation**: Define menu links and logo.
- **About**: Update the bio and introductory text.
- **Skills**: Add or remove skill categories and items.
- **CV**: Configure CV download links and title.

## Development

- **Styling**: `styles.css` contains all custom styles, including responsive grids and animations.
- **Logic**: 
  - `script.js` handles global interactions like theme toggling and page transitions.
  - `js/content.js` fetches and renders content from the JSON file.
- **Adding Pages**: 
  1. Create the HTML file.
  2. Add it to `data/content.json` navigation.
  3. Implement a render function in `js/content.js`.

## License

All rights reserved. This project and its contents are private and not licensed for public use.