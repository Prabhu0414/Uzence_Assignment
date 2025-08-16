# Frontend Assignment

This project is a frontend assignment built with React, TypeScript, Vite, and Tailwind CSS. It demonstrates component-driven development, modern styling, and best practices for scalable frontend applications.

## Table of Contents
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Tech Stack](#tech-stack)
- [Component Overview](#component-overview)
- [Storybook](#storybook)
- [Testing](#testing)
- [Linting & Formatting](#linting--formatting)
- [Contributing](#contributing)
- [License](#license)

---

## Project Structure
```
frontend-assignment/
├── public/                # Static assets
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   │   ├── DataTable/     # DataTable component and stories
│   │   └── InputField/    # InputField component and stories
│   └── stories/           # Storybook stories and assets
├── index.html             # Main HTML file
├── package.json           # Project metadata and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or above recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd frontend-assignment
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the Development Server
```sh
npm run dev
# or
yarn dev
```
The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## Available Scripts
- `npm run dev` — Start the development server
- `npm run build` — Build the app for production
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint for code quality
- `npm run storybook` — Start Storybook for component development

## Tech Stack
- **React** — UI library
- **TypeScript** — Static typing
- **Vite** — Fast build tool
- **Tailwind CSS** — Utility-first CSS framework
- **Storybook** — UI component explorer

## Component Overview

### DataTable
Reusable table component for displaying tabular data. Includes Storybook stories for usage examples.

### InputField
Custom input field component with type safety and styling. Includes Storybook stories and a demo.

## Storybook
Storybook is used for developing and testing UI components in isolation.

To start Storybook:
```sh
npm run storybook
# or
yarn storybook
```

Stories are located in `src/components/*/*.stories.tsx` and `src/stories/`.

## Testing
This project is set up for testing with [Vitest](https://vitest.dev/) (if configured).

To run tests:
```sh
npm run test
# or
yarn test
```

## Linting & Formatting
- **ESLint** is used for code linting. Run `npm run lint` to check code quality.
- **Prettier** (if configured) for code formatting.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License
This project is licensed under the MIT License.
