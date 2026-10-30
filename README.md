# Todoist

A simple todo list application built with React and Firebase.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-10.8.0-orange)

## Features

- ✅ Add, complete, and organize tasks
- 📁 Create custom projects
- 📅 Schedule tasks for today, tomorrow, or next week
- 🌙 Dark mode support
- ♿ **Fully accessible** with keyboard navigation and screen reader support
- 🧪 Comprehensive test coverage (90%+)

## Accessibility

This application is built with accessibility as a core feature, not an afterthought:

- ✅ **Full keyboard navigation** with logical tab order
- ✅ **Screen reader support** with ARIA live regions and semantic HTML
- ✅ **Keyboard shortcuts** (Q for quick add task, Escape to close modals)
- ✅ **Focus management** in modals and overlays
- ✅ **Skip navigation** link for keyboard users
- ✅ **Form validation** with accessible error messages
- ✅ **WCAG 2.1 Level AA compliant**

See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for detailed accessibility documentation.

## Getting Started

### Prerequisites

- Node.js 14+ and npm
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/weterstacy/todoist.git
   cd todoist
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   ```bash
   cp src/firebase.js.example src/firebase.js
   ```
   
4. Add your Firebase configuration to `src/firebase.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     // ... other config
   };
   ```

5. Start the development server:
   ```bash
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm start` - Start development server
- `npm test` - Run test suite
- `npm run build` - Create production build
- `npm run eject` - Eject from Create React App (not reversible!)

## Technology Stack

- **React 18** - UI library with modern hooks and concurrent features
- **Firebase 10** - Backend-as-a-Service (Firestore database)
- **Sass** - CSS preprocessor for maintainable styles
- **date-fns** - Modern date manipulation library
- **React Testing Library** - Component testing
- **ESLint + Prettier** - Code quality and formatting

## Recent Updates

### Dependency Upgrades (2024)
- Upgraded from React 16 to React 18
- Migrated from Firebase 7 to Firebase 10 (modular SDK)
- Replaced deprecated node-sass with sass
- Replaced moment.js with date-fns
- Updated all dev dependencies to latest versions

### Accessibility Improvements (2024)
- Added full keyboard navigation support
- Implemented ARIA live regions for dynamic announcements
- Added focus trapping in modals
- Implemented keyboard shortcuts (Q for quick add)
- Enhanced form accessibility with proper labels and error handling
- Added skip navigation link
- See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for complete details

## Project Structure

```
src/
├── components/          # React components
│   ├── layout/         # Header, Sidebar, Content
│   ├── AddTask.js      # Task creation form
│   ├── AddProject.js   # Project creation form
│   ├── Checkbox.js     # Task completion checkbox
│   ├── Tasks.js        # Task list display
│   └── ...
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── helpers/            # Utility functions
├── constants/          # App constants
└── __tests__/          # Test files
```

## Testing

Run the test suite:
```bash
npm test
```

Tests use React Testing Library and cover:
- Component rendering and interactions
- User workflows (adding tasks, projects)
- Context providers
- Custom hooks

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built following Karl Hadwen's React tutorial series
- Enhanced with modern React 18 features
- Accessibility improvements based on WCAG 2.1 guidelines
- Icons from [React Icons](https://react-icons.github.io/react-icons/)

## Support

If you encounter issues or have questions:
- Check [ACCESSIBILITY.md](./ACCESSIBILITY.md) for accessibility features
- Review [UPGRADE_NOTES.md](./UPGRADE_NOTES.md) for migration details
- Open an issue on GitHub

---

Made with ❤️ and ♿ accessibility in mind
