# uSignal PWA

An unofficial Signal Progressive Web App (PWA) client that runs locally in any browser supporting PWAs.

## 🚀 Features

- **Progressive Web App**: Install and run as a standalone app on any device
- **Offline Support**: Works offline with service worker caching
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark Mode**: Automatic dark mode support based on system preferences
- **Modern UI**: Clean, Signal-inspired interface
- **Cross-Platform**: Works on any browser that supports PWAs (Chrome, Edge, Safari, Firefox)

## 📋 Requirements

- A modern web browser with PWA support:
  - Chrome/Edge (recommended)
  - Safari (iOS 11.3+)
  - Firefox
  - Opera
- HTTPS connection (required for service workers and PWA installation)

## 🛠️ Installation

### Option 1: Install from GitHub Pages (Recommended)

If this app is hosted on GitHub Pages or any web server:

1. Visit the hosted URL in your browser
2. Look for the "Install" button or install prompt
3. Follow your browser's installation instructions

### Option 2: Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/larsnygard/uSignalPWA.git
   cd uSignalPWA
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   The app will open automatically at `http://localhost:3000`

4. Build for production:
   ```bash
   npm run build
   ```
   
   The production files will be in the `dist/` folder.
   
   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

3. Open your browser and navigate to `http://localhost:8000`

4. For PWA installation to work properly, you'll need HTTPS. For local development:
   - Use tools like `ngrok` to create an HTTPS tunnel
   - Or deploy to a hosting service with HTTPS

### Option 3: Deploy to a Hosting Service

Deploy to any static hosting service with HTTPS:

- **GitHub Pages**: Push to `gh-pages` branch
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repository
- **Firebase Hosting**: Use Firebase CLI
- **Cloudflare Pages**: Connect your repository

## 📱 Installing as PWA

### On Desktop (Chrome/Edge):
1. Open the app in your browser
2. Click the install icon (⊕) in the address bar
3. Click "Install" in the popup

### On Android:
1. Open the app in Chrome
2. Tap the menu (⋮) button
3. Tap "Install app" or "Add to Home screen"

### On iOS (Safari):
1. Open the app in Safari
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"

## 🎯 Usage

This is a **demonstration PWA** showing the structure and capabilities of a Progressive Web App. To use actual Signal messaging:

- Use the official Signal app from https://signal.org
- Or connect this PWA to Signal's infrastructure (requires Signal Protocol implementation)

### Current Features:
- ✅ PWA installation and offline support
- ✅ Responsive UI with Signal-inspired design
- ✅ Service worker for caching
- ✅ Dark mode support
- ✅ Status indicators

### Planned Features:
- 🔄 Signal Protocol implementation
- 🔄 End-to-end encryption
- 🔄 Message synchronization
- 🔄 Contact management
- 🔄 Media sharing
- 🔄 Push notifications

## 🏗️ Project Structure

```
uSignalPWA/
├── index.html          # Main HTML file
├── styles.css          # Application styles
├── app.js             # Application logic
├── sw.js              # Service worker
├── manifest.json      # PWA manifest
├── icons/             # App icons (various sizes)
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
├── screenshots/       # App screenshots
└── README.md          # This file
```

## 🔧 Development

### Testing PWA Features

1. **Test Service Worker:**
   - Open DevTools (F12)
   - Go to Application > Service Workers
   - Verify the service worker is registered and active

2. **Test Offline Mode:**
   - Load the app while online
   - Go to DevTools > Network
   - Check "Offline" mode
   - Refresh the page - it should still work

3. **Test Installation:**
   - Serve over HTTPS
   - Look for install prompts
   - Install and verify standalone mode

### Browser DevTools

- **Chrome DevTools**: Application tab > Manifest, Service Workers, Storage
- **Firefox DevTools**: Application panel
- **Safari Web Inspector**: Storage tab

## 🤝 Contributing

This is an unofficial project. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## ⚠️ Disclaimer

This is an **unofficial** Signal client and is not affiliated with Signal Messenger LLC. This is a demonstration PWA showing how to build a Progressive Web App with Signal-inspired design.

For secure messaging, please use the official Signal app from https://signal.org

## 📄 License

This project is provided as-is for educational purposes.

## 🔗 Resources

- [Signal Official Website](https://signal.org)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)

## 🐛 Known Issues

- Icons are placeholder SVG graphics (for production, use proper PNG/WebP icons)
- No actual Signal Protocol implementation yet
- No real messaging functionality (demonstration only)

## 📞 Support

For issues and questions, please open an issue on GitHub.
