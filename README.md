# Luke Harper's CV Website

A modern, responsive personal CV website built with HTML, CSS, and JavaScript.

## Project Structure

```
.
├── index.html          # Main landing page
├── cv.html            # CV/Resume page
├── skills.html        # Skills showcase page
├── styles.css         # Main stylesheet
├── script.js          # Main JavaScript functionality
├── js/
│   └── content.js     # Content management and rendering
├── data/
│   └── content.json   # Site content and configuration
└── images/            # Image assets
```

## Features

- Responsive design that works on all devices
- Dynamic content loading from JSON
- Smooth page transitions
- Interactive skills showcase
- Downloadable CV options
- Modern typography using Google Fonts (Playfair Display and Poppins)

## Setup

1. Clone the repository
2. Ensure all files are in their correct locations as per the project structure
3. Open `index.html` in a web browser to view the site

## Content Management

The site's content is managed through `data/content.json`. This includes:
- Navigation menu items
- About section content
- Skills and experience
- CV download options

## Development

### Adding New Pages

1. Create a new HTML file in the root directory
2. Include the necessary CSS and JavaScript files
3. Add the page content structure following the existing patterns
4. Update the navigation in `data/content.json`
5. Add the page rendering logic in `js/content.js`

### Styling

The site uses a custom CSS framework defined in `styles.css`. Key features include:
- Responsive grid system
- Custom animations and transitions
- Mobile-first design approach
- Consistent color scheme and typography

## Browser Support

The site is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

All rights reserved. This project and its contents are private and not licensed for public use. 