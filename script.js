// Toggle skill sections
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
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
    }
}

function expandAll() {
    const buttons = document.querySelectorAll('.skill-button');
    const expandBtn = document.getElementById('expandAllBtn');
    const isExpanded = buttons[0]?.classList.contains('active');
    
    buttons.forEach(button => {
        const content = button.nextElementSibling;
        if (isExpanded) {
            button.classList.remove('active');
            content.style.maxHeight = '0';
            content.style.opacity = '0';
        } else {
            button.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
        }
    });
    
    // Update button text
    expandBtn.textContent = isExpanded ? 'Expand All' : 'Collapse All';
}

// Page transition handling
document.addEventListener('DOMContentLoaded', () => {
    // Add page transition class to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('page-transition');
    }

    // Handle navigation clicks
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Only handle internal links
            if (link.hostname === window.location.hostname) {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                // Add fade-out animation
                document.body.style.opacity = '0';
                
                // Navigate after animation
                setTimeout(() => {
                    // Handle root path
                    if (href === '/') {
                        window.location.href = '/index.html';
                    } else {
                        window.location.href = href + '.html';
                    }
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