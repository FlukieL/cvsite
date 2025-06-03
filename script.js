// Toggle skill sections
function toggleSkill(button) {
    const content = button.nextElementSibling;
    const isActive = button.classList.contains('active');
    
    // Close all other sections
    document.querySelectorAll('.skill-button.active').forEach(activeButton => {
        if (activeButton !== button) {
            activeButton.classList.remove('active');
            activeButton.nextElementSibling.classList.remove('active');
        }
    });
    
    // Toggle current section
    button.classList.toggle('active');
    content.classList.toggle('active');
}

function expandAll() {
    const buttons = document.querySelectorAll('.skill-button');
    const isExpanded = buttons[0]?.classList.contains('active');
    
    buttons.forEach(button => {
        const content = button.nextElementSibling;
        if (isExpanded) {
            button.classList.remove('active');
            content.classList.remove('active');
        } else {
            button.classList.add('active');
            content.classList.add('active');
        }
    });
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
                    window.location.href = href;
                }, 300);
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