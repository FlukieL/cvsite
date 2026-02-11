// Base URL configuration
// In production this site is hosted under "/cvsite/",
// but the dev Waitress server also understands that prefix.
// const baseUrl = '/cvsite/'; // Removed hardcoded base to allow flexible hosting

// Hidden debug theme toggle
function toggleThemeDebug() {
    const isDark = document.documentElement.classList.toggle('dark-mode');
    try {
        localStorage.setItem('preferred-theme', isDark ? 'dark' : 'light');
    } catch (e) {
        // Fail silently if storage is unavailable
    }
}

// Toggle skill sections
// Skill interaction logic
function initializeSkillsParams() {
    const skillsContainer = document.querySelector('.skills-container');

    if (skillsContainer) {
        // Event delegation for skill buttons
        skillsContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.skill-button');
            if (button) {
                toggleSkill(button);
            }
        });

        // Expand/Collapse All button
        const expandBtn = document.getElementById('expandAllBtn');
        if (expandBtn) {
            expandBtn.addEventListener('click', () => expandAll(expandBtn));
        }
    }
}

function toggleSkill(button) {
    const content = button.nextElementSibling;
    const isActive = button.classList.contains('active');

    // Close all other sections
    document.querySelectorAll('.skill-button.active').forEach(activeButton => {
        if (activeButton !== button) {
            activeButton.classList.remove('active');
            const otherContent = activeButton.nextElementSibling;
            otherContent.style.maxHeight = '0';
            otherContent.style.opacity = '0';
        }
    });

    // Toggle current section
    button.classList.toggle('active');
    if (isActive) {
        content.style.maxHeight = '0';
        content.style.opacity = '0';
    } else {
        content.style.maxHeight = (content.scrollHeight + 50) + 'px';
        content.style.opacity = '1';
    }

    // Update Expand/Collapse All button state if necessary
    updateExpandButtonState();
}

function expandAll(expandBtn) {
    const buttons = document.querySelectorAll('.skill-button');
    const isCurrentlyExpanded = expandBtn.textContent.includes('Collapse');

    buttons.forEach(button => {
        const content = button.nextElementSibling;
        if (isCurrentlyExpanded) {
            button.classList.remove('active');
            content.style.maxHeight = '0';
            content.style.opacity = '0';
        } else {
            button.classList.add('active');
            content.style.maxHeight = (content.scrollHeight + 50) + 'px';
            content.style.opacity = '1';
        }
    });

    // Update button text
    expandBtn.textContent = isCurrentlyExpanded ? 'Expand All' : 'Collapse All';
}

function updateExpandButtonState() {
    const expandBtn = document.getElementById('expandAllBtn');
    if (!expandBtn) return;

    const allButtons = document.querySelectorAll('.skill-button');
    const activeButtons = document.querySelectorAll('.skill-button.active');

    // If all open, show Collapse. If all closed, show Expand. 
    // If mixed, default to Expand (or keep current if logic prefers).
    if (activeButtons.length === allButtons.length && allButtons.length > 0) {
        expandBtn.textContent = 'Collapse All';
    } else {
        expandBtn.textContent = 'Expand All';
    }
}

// Page transition handling
document.addEventListener('DOMContentLoaded', () => {
    // Add page transition class to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('page-transition');
    }

    // Hidden debug keyboard shortcut: Shift+Alt+D toggles theme
    document.addEventListener('keydown', (event) => {
        if (event.shiftKey && event.altKey && event.code === 'KeyD') {
            toggleThemeDebug();
        }
    });

    // Handle navigation clicks
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Only handle internal links
            if (link.hostname === window.location.hostname) {
                e.preventDefault();
                const href = link.getAttribute('href');

                // Animate main content out
                if (mainContent) {
                    mainContent.style.transition = 'opacity 0.15s ease-out';
                    mainContent.style.opacity = '0';
                }

                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 150);
            }
        });
    });
});




// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 