// Toggle skill sections
function toggleSkill(button) {
    const content = button.nextElementSibling;
    const allContents = document.querySelectorAll('.skill-content');
    const allButtons = document.querySelectorAll('.skill-button');
    
    // Close all other sections
    allContents.forEach(section => {
        if (section !== content) {
            section.style.display = 'none';
            section.previousElementSibling.classList.remove('active');
        }
    });
    
    // Toggle current section
    if (content.style.display === 'block') {
        content.style.display = 'none';
        button.classList.remove('active');
    } else {
        content.style.display = 'block';
        button.classList.add('active');
    }
}

function expandAll() {
    const allContents = document.querySelectorAll('.skill-content');
    const allButtons = document.querySelectorAll('.skill-button');
    const expandAllBtn = document.getElementById('expandAllBtn');
    
    if (expandAllBtn.textContent === 'Expand All') {
        allContents.forEach(content => {
            content.style.display = 'block';
        });
        allButtons.forEach(button => {
            button.classList.add('active');
        });
        expandAllBtn.textContent = 'Collapse All';
    } else {
        allContents.forEach(content => {
            content.style.display = 'none';
        });
        allButtons.forEach(button => {
            button.classList.remove('active');
        });
        expandAllBtn.textContent = 'Expand All';
    }
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