// Content loader and renderer
class ContentManager {
    constructor() {
        this.content = null;
    }

    async loadContent() {
        try {
            // Try multiple possible paths for the content.json file
            const possiblePaths = [
                './data/content.json',
                '/data/content.json',
                '../data/content.json',
                'data/content.json'
            ];

            let response = null;
            for (const path of possiblePaths) {
                try {
                    response = await fetch(path);
                    if (response.ok) {
                        break;
                    }
                } catch (e) {
                    continue;
                }
            }

            if (!response || !response.ok) {
                throw new Error(`Could not load content.json from any of the attempted paths`);
            }

            this.content = await response.json();
            return this.content;
        } catch (error) {
            console.error('Error loading content:', error);
            // Provide a fallback content structure
            this.content = {
                site: {
                    title: "Luke Harper",
                    description: "IT Professional"
                },
                navigation: {
                    logo: "Luke Harper",
                    links: [
                        { text: "About Me", url: "index.html" },
                        { text: "Skills", url: "skills.html" },
                        { text: "CV", url: "cv.html" }
                    ]
                },
                about: {
                    title: "About Me",
                    content: ["Content loading failed. Please check your internet connection and try again."]
                }
            };
            return this.content;
        }
    }

    // Navigation
    renderNavigation() {
        if (!this.content) return;

        const nav = document.querySelector('.nav-content');
        if (!nav) return;

        // Logo
        const logo = nav.querySelector('.logo');
        if (logo) {
            logo.textContent = this.content.navigation.logo;
        }

        // Navigation links
        const navLinks = nav.querySelector('.nav-links');
        if (navLinks) {
            navLinks.innerHTML = this.content.navigation.links.map(link => `
                <a href="${link.url}" ${window.location.pathname.endsWith(link.url) ? 'class="active"' : ''}>
                    ${link.text}
                </a>
            `).join('');
        }
    }

    // About page
    renderAbout() {
        if (!this.content) return;

        const aboutSection = document.querySelector('.about-section');
        if (!aboutSection) return;

        const title = aboutSection.querySelector('h1');
        if (title) {
            title.textContent = this.content.about.title;
        }

        const content = aboutSection.querySelector('.about-content');
        if (content) {
            content.innerHTML = `
                <h1>${this.content.about.title}</h1>
                ${this.content.about.content.map(paragraph => `<p>${paragraph}</p>`).join('')}
            `;
        }
    }

    // Skills page
    renderSkills() {
        if (!this.content) return;

        const skillsSection = document.querySelector('.skills-section');
        if (!skillsSection) return;

        const title = skillsSection.querySelector('h1');
        if (title) {
            title.textContent = this.content.skills.title;
        }

        const skillsGrid = skillsSection.querySelector('.skills-grid');
        if (skillsGrid) {
            skillsGrid.innerHTML = this.content.skills.categories.map(category => `
                <div class="skill-card">
                    <button class="skill-header" onclick="toggleSkill(this)">
                        <h2>${category.name}</h2>
                        <span class="toggle-icon">+</span>
                    </button>
                    <div class="skill-content">
                        <p class="experience">${category.experience}</p>
                        <ul>
                            ${category.items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('');
        }
    }

    // CV page
    renderCV() {
        if (!this.content) return;

        const cvSection = document.querySelector('.cv-section');
        if (!cvSection) return;

        const title = cvSection.querySelector('h1');
        if (title) {
            title.textContent = this.content.cv.title;
        }

        const downloadOptions = cvSection.querySelector('.download-options');
        if (downloadOptions) {
            downloadOptions.innerHTML = this.content.cv.downloads.map(download => `
                <a href="${download.url}" class="download-button" download>
                    ${download.text}
                </a>
            `).join('');
        }
    }

    // Initialize content based on current page
    async initialize() {
        await this.loadContent();
        this.renderNavigation();

        // Render page-specific content
        const path = window.location.pathname;
        if (path.endsWith('index.html') || path === '/') {
            this.renderAbout();
        } else if (path.endsWith('skills.html')) {
            this.renderSkills();
        } else if (path.endsWith('cv.html')) {
            this.renderCV();
        }
    }
}

// Initialize content manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const contentManager = new ContentManager();
    contentManager.initialize();
}); 