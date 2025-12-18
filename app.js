// Import libraries
import QRCode from 'qrcodejs2';
// Note: @signalapp/libsignal-client requires WASM and is Node.js focused
// For a browser PWA, you may need to use a different approach or polyfills
// import * as libsignal from '@signalapp/libsignal-client';

document.addEventListener('DOMContentLoaded', () => {
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
            navigator.serviceWorker.register('sw.js')
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
        if (installPrompt) {
            installPrompt.style.display = 'block';
        }
        updateStatus('PWA installation available', 'success');
    });

    if (installButton) {
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
    }

    if (dismissButton) {
        dismissButton.addEventListener('click', () => {
            installPrompt.style.display = 'none';
            updateStatus('Installation dismissed', 'info');
        });
    }

    // Check if app is already installed
    window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        if (installPrompt) {
            installPrompt.style.display = 'none';
        }
        updateStatus('PWA installed', 'success');
    });

    // Check if running as PWA
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
        console.log('Running as PWA');
        updateStatus('Running as PWA', 'success');
    }

    // Menu button functionality
    const menuButton = document.getElementById('menuButton');
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            console.log('Menu button clicked');
            updateStatus('Menu opened', 'info');
            // In a real app, this would open a navigation drawer
        });
    }

    // Search button functionality
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            console.log('Search button clicked');
            updateStatus('Search opened', 'info');
            // In a real app, this would open a search interface
        });
    }

    // More options button functionality
    const moreButton = document.getElementById('moreButton');
    if (moreButton) {
        moreButton.addEventListener('click', () => {
            console.log('More options clicked');
            updateStatus('Options opened', 'info');
            // In a real app, this would open an options menu
        });
    }

    // Signal Login
    const loginContainer = document.getElementById('loginContainer');
    const loginForm = document.getElementById('loginForm');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const qrCodeDiv = document.getElementById('qrCode');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const phoneNumber = phoneNumberInput.value;

            if (!phoneNumber) {
                updateStatus('Please enter a phone number', 'error');
                return;
            }

            try {
                updateStatus('Generating keys...', 'info');
const { libsignal } = window.SignalProtocol;
                if (!libsignal) {
                    throw new Error('Signal protocol library not loaded.');
                }

                // Generate a new identity key pair for the new device
                const identityKeyPair = await libsignal.KeyHelper.generateIdentityKeyPair();
                const publicKey = identityKeyPair.pubKey;

                // The linking URI needs the public key in Base64
                const publicKeyB64 = btoa(String.fromCharCode.apply(null, new Uint8Array(publicKey)));
                
                // A real UUID should be generated
                const uuid = self.crypto.randomUUID();

                const linkingUri = `sgnl://linkdevice?uuid=${uuid}&pub_key=${encodeURIComponent(publicKeyB64)}`;

                loginContainer.querySelector('h2').textContent = 'Link Your Device';
                loginContainer.querySelector('p').textContent = 'Scan the QR code with Signal on your phone.';
                loginForm.style.display = 'none';
                qrCodeContainer.style.display = 'block';

                // Clear any previous QR code
                qrCodeDiv.innerHTML = '';

                new QRCode(qrCodeDiv, {
                    text: linkingUri,
                    width: 256,
                    height: 256,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });

                updateStatus('QR code generated for linking', 'success');

                // After scanning, a real app would listen for a confirmation
                // from the server via WebSocket or polling.
                setTimeout(() => {
                    // Simulate successful linking
                    qrCodeContainer.style.display = 'none';
                    const conversationList = document.createElement('div');
                    conversationList.className = 'conversation-list';
                    conversationList.innerHTML = `
                        <div class="empty-state">
                            <div class="empty-icon">✅</div>
                            <h2>Device Linked!</h2>
                            <p>Your conversations will appear here.</p>
                        </div>
                    `;
                    loginContainer.replaceWith(conversationList);
                    updateStatus('Device linked successfully!', 'success');
                }, 15000); // Simulate a 15-second delay for scanning
            } catch (error) {
                console.error('Failed to generate QR code:', error);
                updateStatus('Failed to generate QR code. See console.', 'error');
            }
        });
    }

    // Status update helper
    function updateStatus(message, type = 'info') {
        if (statusText) {
            statusText.textContent = message;
        }
        
        if (statusBar) {
            const indicator = statusBar.querySelector('.status-indicator');
            if (indicator) {
                indicator.style.backgroundColor = 
                    type === 'success' ? 'var(--success)' :
                    type === 'error' ? 'var(--error)' :
                    'var(--primary-color)';
            }
        }
        
        // Auto-clear status after 3 seconds
        setTimeout(() => {
            if (statusText) {
                statusText.textContent = 'Ready';
            }
            if (statusBar) {
                const indicator = statusBar.querySelector('.status-indicator');
                if (indicator) {
                    indicator.style.backgroundColor = 'var(--success)';
                }
            }
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
});
