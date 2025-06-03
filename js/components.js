// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath, {
            method: 'GET',
            headers: {
                'Accept': 'text/html'
            },
            cache: 'no-cache'
        });
        
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
    const footerPath = './components/footer.html';
    loadComponent('footer-container', footerPath);
}); 