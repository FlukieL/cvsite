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
                },
                skills: {
                    title: "Skills",
                    categories: []
                },
                cv: {
                    title: "CV",
                    downloads: []
                }
            };
            return this.content;
        }
    }

    // Navigation
    renderNavigation() {
        if (!this.content) return;

        // Wait for nav-content to be available
        const waitForNav = () => {
            return new Promise((resolve) => {
                const checkNav = () => {
                    const nav = document.querySelector('.nav-content');
                    if (nav) {
                        resolve(nav);
                    } else {
                        setTimeout(checkNav, 100);
                    }
                };
                checkNav();
            });
        };

        // Use async IIFE to handle the waiting
        (async () => {
            try {
                const nav = await waitForNav();

                // Create logo container if it doesn't exist
                let logoContainer = nav.querySelector('.nav-logo-container');
                if (!logoContainer) {
                    logoContainer = document.createElement('div');
                    logoContainer.className = 'nav-logo-container';
                    const logo = nav.querySelector('.logo');
                    if (logo) {
                        logo.parentNode.insertBefore(logoContainer, logo);
                        logoContainer.appendChild(logo);
                    }
                }

                // Add profile image if not on main page
                const currentPath = window.location.pathname;
                const isMainPage = currentPath.endsWith('index.html') || currentPath === '/';
                if (!isMainPage) {
                    let profileImage = logoContainer.querySelector('.nav-profile-image');
                    if (!profileImage) {
                        profileImage = document.createElement('img');
                        profileImage.className = 'nav-profile-image';
                        profileImage.src = './images/professionalposer.png';
                        profileImage.alt = 'Luke Harper';
                        logoContainer.insertBefore(profileImage, logoContainer.firstChild);
                    }
                    profileImage.style.display = 'block';
                }

                // Logo
                const logo = nav.querySelector('.logo');
                if (logo) {
                    logo.textContent = this.content.navigation.logo;
                }

                // Navigation links
                const navLinks = nav.querySelector('.nav-links');
                if (navLinks) {
                    navLinks.innerHTML = this.content.navigation.links.map(link => {
                        const isActive = (link.url === 'index.html' && (currentPath.endsWith('index.html') || currentPath === '/')) ||
                            (link.url !== 'index.html' && currentPath.endsWith(link.url));
                        return `
                            <a href="${link.url}" ${isActive ? 'class="active"' : ''}>
                                ${link.text}
                            </a>
                        `;
                    }).join('');
                }
            } catch (error) {
                console.error('Error rendering navigation:', error);
            }
        })();
    }

    // About page
    renderAbout() {
        if (!this.content) return;

        const aboutSection = document.querySelector('.about-section');
        if (!aboutSection) return;

        const content = aboutSection.querySelector('.about-content');
        if (content) {
            const rawTitle = this.content.about.title || '';
            const [firstWord, ...restWords] = rawTitle.split(' ');
            const accentedTitle = restWords.length > 0
                ? `<span class="accent">${firstWord}</span> ${restWords.join(' ')}`
                : `<span class="accent">${rawTitle}</span>`;

            const paragraphsHtml = Array.isArray(this.content.about.content)
                ? this.content.about.content.map(paragraph => `<p>${paragraph}</p>`).join('')
                : '';

            content.innerHTML = `
                <h1>${accentedTitle}</h1>
                ${paragraphsHtml}
                <div class="cta-group">
                    <a class="btn btn-primary" href="skills.html" aria-label="Explore skills">
                        <i class="fa-solid fa-list-check" aria-hidden="true"></i>
                        Explore skills
                    </a>
                    <a class="btn btn-secondary" href="cv.html" aria-label="View CV">
                        <i class="fa-solid fa-file-pdf" aria-hidden="true"></i>
                        View CV
                    </a>
                </div>
            `;
        }
    }

    // Skills page
    renderSkills() {
        if (!this.content) return;

        const skillsContent = document.getElementById('skills-content');
        if (!skillsContent) return;

        // Set the page title
        const title = document.querySelector('.skills-section h1');
        if (title) {
            title.textContent = this.content.skills.title;
        }

        // Map of skill categories to their corresponding Font Awesome icons
        const skillIcons = {
            'Azure/365': 'fa-microsoft',
            'Active Directory': 'fa-server',
            'Virtualisation': 'fa-cube',
            'Citrix XenApp/RDS': 'fa-desktop',
            'Networking': 'fa-network-wired',
            'Storage': 'fa-database',
            'Exchange': 'fa-envelope',
            'General': 'fa-user-tie',
            'Legacy': 'fa-history'
        };

        // Render the skills content
        skillsContent.innerHTML = this.content.skills.categories.map(category => `
            <div class="skill-category">
                <button class="skill-button">
                    <i class="fas ${skillIcons[category.name] || 'fa-star'}"></i>
                    <span>${category.name}</span>
                    ${category.experience ? `<span class="experience-badge">${category.experience}</span>` : ''}
                </button>
                <div class="skill-content">
                    <ul>
                        ${category.items.map(item => {
            const isSubcategory = item.endsWith(':');
            return `<li class="${isSubcategory ? 'subcategory' : ''}">${item}</li>`;
        }).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
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

        // Remove profile header if it exists
        const profileHeader = cvSection.querySelector('.profile-header');
        if (profileHeader) {
            profileHeader.remove();
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

        // Wait for navbar to be loaded
        const waitForNav = () => {
            return new Promise((resolve) => {
                const checkNav = () => {
                    const nav = document.querySelector('.nav-content');
                    if (nav) {
                        resolve(nav);
                    } else {
                        setTimeout(checkNav, 100);
                    }
                };
                checkNav();
            });
        };

        await waitForNav();
        this.renderNavigation();

        // Render page-specific content
        const path = window.location.pathname.toLowerCase();
        console.log('Current path for rendering:', path);

        if (path.endsWith('index.html') || path === '/' || path.endsWith('/')) {
            this.renderAbout();
        } else if (path.includes('skills')) {
            console.log('Detected skills page, rendering skills...');
            this.renderSkills();
        } else if (path.includes('cv')) {
            this.renderCV();
        }
    }
}

// Initialize content manager when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const contentManager = new ContentManager();
    await contentManager.initialize();

    // Initialize skill interactions after content is loaded
    // Using a timeout to ensure DOM catch-up if MutationObserver in loadComponent wasn't enough for inner content
    setTimeout(() => {
        initializeSkillsParams();
    }, 100);
}); 