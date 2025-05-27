# smolikja team Portfolio

A modern, responsive portfolio website with smooth scroll snapping between pages.

## 🚀 Features

- **Smooth Scroll Navigation**: Navigate between pages with mouse wheel, keyboard, or touch gestures
- **Snap Scrolling**: Pages automatically snap into view for better user experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modular Architecture**: Clean, maintainable code structure with separated concerns
- **Test-Driven Development**: Comprehensive test suite for reliability
- **Modern CSS**: Uses CSS Grid, Flexbox, and modern animations
- **Accessibility**: Keyboard navigation and reduced motion support

## 📁 Project Structure

```text
portfolio-web/
├── index.html              # Main HTML file
├── test-runner.html         # Test suite runner
├── styles.css              # Legacy CSS (redirects to new structure)
├── assets/                 # Media files
│   └── team-logo-*.mp4/webm
├── src/
│   ├── css/               # Stylesheets
│   │   ├── styles.css     # Main styles
│   │   ├── pages.css      # Page-specific styles
│   │   └── projects.css   # Projects page styles
│   ├── js/                # JavaScript modules
│   │   ├── app.js         # Main application entry point
│   │   ├── scrollController.js  # Handles scroll navigation
│   │   ├── pageManager.js # Manages page lifecycle
│   │   └── components/    # Reusable components
│   └── tests/             # Test files
└── deploy.sh              # Deployment script
```

## 🛠️ Setup and Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd portfolio-web
   ```

2. **Local Development**
   - Open `index.html` in a modern web browser
   - Or use a local server for better development experience:

   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Running Tests**
   - Open `test-runner.html` in your browser
   - Click "Run All Tests" to execute the test suite

## 🎯 Usage

### Navigation

- **Mouse Wheel**: Scroll up/down to navigate between pages
- **Keyboard**: Use arrow keys, Page Up/Down, Home/End
- **Touch**: Swipe up/down on mobile devices
- **Navigation Dots**: Click the dots on the right side

### Adding New Pages

1. Add a new `<section>` with the `page` class in `index.html`
2. Set a unique `data-page-name` attribute
3. Add corresponding styles in the CSS files
4. Update the navigation dots if needed

### Adding Projects

Projects are dynamically loaded. To add new projects:

1. Edit the `projects` array in `src/js/components/projectsComponent.js`
2. Add project images to the `assets/` folder
3. Projects will automatically appear in the grid

## 🧪 Testing

The project includes a comprehensive test suite:

- **ScrollController Tests**: Navigation logic and page transitions
- **ProjectsComponent Tests**: Project data management and rendering
- **Mock Framework**: Custom lightweight testing framework

Run tests by opening `test-runner.html` in your browser.

## 🎨 Customization

### Styling

- **Colors**: Modify CSS custom properties in `src/css/styles.css`
- **Animations**: Adjust keyframes and transitions in respective CSS files
- **Layout**: Update grid and flexbox properties in `src/css/projects.css`

### Functionality

- **Scroll Behavior**: Modify `scrollController.js` for different navigation patterns
- **Page Transitions**: Update animation classes in `pageManager.js`
- **Project Display**: Customize the project card template in `projectsComponent.js`

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🔧 Development Guidelines

### Best Practices

1. **Modular Code**: Keep components separated and focused
2. **ES6 Modules**: Use import/export for better code organization
3. **CSS Architecture**: Follow BEM methodology for CSS classes
4. **Accessibility**: Always include ARIA labels and keyboard support
5. **Performance**: Optimize images and use lazy loading where appropriate

### Code Style

- Use ES6+ features (arrow functions, template literals, destructuring)
- Follow consistent naming conventions (camelCase for JS, kebab-case for CSS)
- Add JSDoc comments for complex functions
- Write tests for new features

## 🚀 Deployment

The project includes a deployment script (`deploy.sh`). Customize it for your hosting platform:

```bash
./deploy.sh
```

For static hosting (GitHub Pages, Netlify, Vercel):

1. Upload all files to your hosting platform
2. Set `index.html` as the entry point
3. Ensure MIME types are configured for `.webm` and `.mp4` files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Write tests for your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/new-feature`)
6. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

#### Video not playing

- Check that video files exist in the `assets/` folder
- Verify MIME types are configured correctly on your server

#### Scroll not working

- Ensure JavaScript is enabled
- Check browser console for any errors
- Verify CSS `scroll-snap-type` is supported

##### Tests failing

- Open browser developer tools to see detailed error messages
- Ensure all JavaScript files are loading correctly

### Performance Tips

- Compress video files for faster loading
- Use WebP images for project thumbnails
- Enable gzip compression on your server
- Consider implementing lazy loading for project images

## 📞 Support

If you encounter any issues or have questions, please create an issue in the repository or contact the development team.

---

Built with ❤️ by the smolikja team
