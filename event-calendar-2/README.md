# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

---

## Event Calendar Project

This project is a React application built with Vite, TypeScript, Shadcn UI, and TanStack Query to display an event calendar. Currently, it uses mock data to simulate calendar events.

### Prerequisites

- Node.js (v18 or later recommended)
- Yarn (as it was used during project setup due to `npm` issues in the development environment)

### Setup

1.  **Clone the repository (if applicable) or ensure you are in the `event-calendar-2` directory.**
2.  **Install dependencies:**
    ```bash
    yarn install
    ```
    *Note: If `components.json` is missing or you encounter issues with UI components, you might need to manually create `components.json` as detailed in previous steps or re-run Shadcn UI initialization (`npx shadcn@latest init`) ensuring "Default" style and "Slate" color are configured, and that TypeScript aliases are correctly set in both `tsconfig.app.json` and the root `tsconfig.json`.*

### Running the Development Server

1.  **Start the Vite development server:**
    ```bash
    yarn dev
    ```
2.  Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

### Current Implementation Details

*   **Calendar Data:** The application currently uses a mock event service (`src/services/mockCalendarApi.ts`) to display events. It does not connect to a live Google Calendar API.
*   **UI Components:** Built using Shadcn UI. Components used: Calendar, Button.
*   **State Management & Data Fetching:** Uses TanStack Query for fetching and caching mock event data.
*   **Styling:** Tailwind CSS with CSS variables, configured via Shadcn UI.

### Known Issues & Workarounds During Development

*   **Shadcn UI Initialization (`shadcn@latest init`):**
    *   This command had issues creating `components.json` reliably in the development environment. Manual creation or careful re-runs were sometimes needed.
    *   The CLI had difficulty selecting non-default options (e.g., "Default" style when "New York" was the first option) via input redirection.
    *   For successful alias detection by `shadcn@latest init`, TypeScript path aliases (`baseUrl`, `paths`) needed to be defined in *both* `tsconfig.app.json` and the root `tsconfig.json`.
*   **Dependency Installation:** `npm install` encountered persistent `uv_cwd` errors. `yarn` was used as a workaround for all dependency management.

These notes are primarily for context on the development process of this iteration. For a clean setup, follow the main "Setup" and "Running the Development Server" instructions.
