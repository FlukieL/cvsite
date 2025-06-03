// Function to load HTML components with retry logic
async function loadComponent(elementId, componentPath, retries = 3) {
    const timestamp = new Date().getTime();
    const url = `${componentPath}?t=${timestamp}`;
    
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'text/html',
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                },
                cache: 'no-store'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = html;
                console.log(`Successfully loaded component: ${componentPath}`);
                // Return a promise that resolves when the component is in the DOM
                return new Promise(resolve => {
                    // Use MutationObserver to detect when the component is actually in the DOM
                    const observer = new MutationObserver((mutations, obs) => {
                        const navContent = document.querySelector('.nav-content');
                        if (navContent) {
                            obs.disconnect();
                            resolve(true);
                        }
                    });
                    
                    observer.observe(document.body, {
                        childList: true,
                        subtree: true
                    });
                    
                    // Fallback timeout
                    setTimeout(() => {
                        observer.disconnect();
                        resolve(true);
                    }, 1000);
                });
            } else {
                console.error(`Element with id ${elementId} not found`);
                return false;
            }
        } catch (error) {
            console.error(`Attempt ${attempt}/${retries} failed to load component ${componentPath}:`, error);
            if (attempt === retries) {
                console.error(`Failed to load component ${componentPath} after ${retries} attempts`);
                return false;
            }
            // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
    }
    return false;
}

// Load components on page load
document.addEventListener('DOMContentLoaded', async () => {
    const footerPath = './components/footer.html';
    const navbarPath = './components/navbar.html';
    
    // Load navbar first, then footer
    const navbarLoaded = await loadComponent('navbar-container', navbarPath);
    
    // Only load footer after navbar is confirmed loaded
    if (navbarLoaded) {
        await loadComponent('footer-container', footerPath);
    } else {
        console.error('Navbar failed to load, skipping footer');
    }
}); 