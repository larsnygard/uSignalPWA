// App initialization
let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');
const installButton = document.getElementById('installButton');
const dismissButton = document.getElementById('dismissButton');
const statusBar = document.getElementById('statusBar');
const statusText = statusBar.querySelector('.status-text');

// Service Worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
                updateStatus('Service Worker active', 'success');
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
                updateStatus('Service Worker failed', 'error');
            });
    });
}

// PWA install prompt handling
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Show the install prompt
    installPrompt.style.display = 'block';
    updateStatus('PWA installation available', 'success');
});

installButton.addEventListener('click', async () => {
    if (!deferredPrompt) {
        return;
    }
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        updateStatus('PWA installed successfully', 'success');
    } else {
        console.log('User dismissed the install prompt');
        updateStatus('Installation cancelled', 'info');
    }
    
    // Clear the deferredPrompt
    deferredPrompt = null;
    installPrompt.style.display = 'none';
});

dismissButton.addEventListener('click', () => {
    installPrompt.style.display = 'none';
    updateStatus('Installation dismissed', 'info');
});

// Check if app is already installed
window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    installPrompt.style.display = 'none';
    updateStatus('PWA installed', 'success');
});

// Check if running as PWA
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
    console.log('Running as PWA');
    updateStatus('Running as PWA', 'success');
}

// Menu button functionality
const menuButton = document.getElementById('menuButton');
menuButton.addEventListener('click', () => {
    console.log('Menu button clicked');
    updateStatus('Menu opened', 'info');
    // In a real app, this would open a navigation drawer
});

// Search button functionality
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
    console.log('Search button clicked');
    updateStatus('Search opened', 'info');
    // In a real app, this would open a search interface
});

// More options button functionality
const moreButton = document.getElementById('moreButton');
moreButton.addEventListener('click', () => {
    console.log('More options clicked');
    updateStatus('Options opened', 'info');
    // In a real app, this would open an options menu
});

// Status update helper
function updateStatus(message, type = 'info') {
    statusText.textContent = message;
    
    const indicator = statusBar.querySelector('.status-indicator');
    indicator.style.backgroundColor = 
        type === 'success' ? 'var(--success)' :
        type === 'error' ? 'var(--error)' :
        'var(--primary-color)';
    
    // Auto-clear status after 3 seconds
    setTimeout(() => {
        statusText.textContent = 'Ready';
        indicator.style.backgroundColor = 'var(--success)';
    }, 3000);
}

// Network status monitoring
window.addEventListener('online', () => {
    updateStatus('Back online', 'success');
});

window.addEventListener('offline', () => {
    updateStatus('Offline mode', 'error');
});

// Check initial network status
if (!navigator.onLine) {
    updateStatus('Offline mode', 'error');
}

// Handle visibility changes (app coming back into focus)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        console.log('App is now visible');
        // In a real app, this would refresh data
    }
});

// Demo: Add some sample data after a short delay
setTimeout(() => {
    const conversationList = document.getElementById('conversationList');
    const emptyState = conversationList.querySelector('.empty-state');
    
    // You can add sample conversations here in a real implementation
    console.log('App initialized and ready');
}, 1000);

// Prevent default context menu in standalone mode for a more app-like feel
if (window.matchMedia('(display-mode: standalone)').matches) {
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
}

// Log app version and info
console.log('%c uSignal PWA ', 'background: #2090EA; color: white; font-size: 16px; padding: 4px 8px;');
console.log('Version: 1.0.0');
console.log('An unofficial Signal PWA client');
console.log('Running in:', window.matchMedia('(display-mode: standalone)').matches ? 'Standalone mode' : 'Browser mode');
