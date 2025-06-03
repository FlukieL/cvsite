// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        } else {
            console.error(`Element with id ${elementId} not found`);
        }
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Load footer on page load
document.addEventListener('DOMContentLoaded', () => {
    // Get the current page's path
    const currentPath = window.location.pathname;
    // Determine if we're in a subdirectory
    const isSubDir = currentPath.split('/').length > 2;
    // Set the correct path to the footer component
    const footerPath = isSubDir ? '../components/footer.html' : './components/footer.html';
    
    loadComponent('footer-container', footerPath);
}); 