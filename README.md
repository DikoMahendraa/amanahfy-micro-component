# React Project Architecture

This document outlines the architecture, design patterns, naming conventions, and best practices for our React application with Storybook integration.

## Project Structure

```
project-root/
├── .storybook/               # Storybook configuration
│   ├── main.js
│   ├── preview.js
│   └── theme.js
├── public/                   # Static assets
├── src/
│   ├── assets/               # Images, fonts, etc.
│   ├── components/           # Reusable UI components
│   │   ├── common/           # Basic building blocks (buttons, inputs)
│   │   ├── icons/            # Icons components
│   │   ├── organisms/        # Complex components (forms, data tables)
│   │   ├── pages/            # Page layouts
│   │   └── index.ts          # Export all components
│   ├── hooks/                # Custom React hooks
│   ├── context/              # React Context providers
│   ├── pages/                # App pages/routes
│   ├── styles/               # Global styles, themes, variables
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Helper functions
│   ├── App.tsx               # Main app component
│   └── index.tsx             # Entry point
```

## Design Patterns

We use several established React design patterns:

### 1. Atomic Design

We organize components based on the Atomic Design methodology:

- **Common**: Basic UI components like buttons, inputs, and icons
- **Organisms**: Complex components composed common ui
- **Pages**: Page layouts that organize organisms and common ui

### 2. Component Composition

Building complex UIs from smaller, focused components to maximize reusability.

### 3. Custom Hooks

Extracting and sharing stateful logic between components.

### 4. Container/Presenter Pattern

- **Container components**: Handle state, data fetching, and business logic
- **Presenter components**: Handle rendering UI based on passed props

### 5. Context API

For sharing state across components without prop drilling.

## Naming Conventions

### Files and Folders

1. **Component Files**:

   - Use PascalCase for component files and folders: `Button.tsx`, `Modal.tsx`
   - Component folders should match component name: `Button/Button.tsx`
   - Index files should use camelCase: `index.ts`

2. **Utility Files**:

   - Use camelCase: `formatDate.ts`, `apiUtils.ts`

3. **File Structure**:
   - Each component should have its own folder with related files:
     ```
     Button/
     ├── Button.tsx         # Component implementation
     ├── Button.test.tsx    # Tests
     ├── Button.stories.tsx # Storybook
     ├── Button.module.css  # Scoped styles (if using CSS modules)
     └── index.ts           # Re-export for cleaner imports
     ```

### Component Naming

1. **Component Names**:

   - Use PascalCase and descriptive names: `SubmitButton`, `UserProfileCard`
   - Higher-Order Components should be prefixed with `with`: `withAuth`, `withTheme`
   - Compound components should be nested: `Menu.Item`, `Tabs.Panel`

2. **Props**:

   - Use camelCase for prop names: `onClick`, `isVisible`
   - Boolean props should start with `is`, `has`, or `should`: `isDisabled`, `hasError`
   - Event handler props should start with `on`: `onClick`, `onSubmit`

3. **Custom Hooks**:
   - Always prefix with `use`: `useForm`, `useLocalStorage`

### CSS/Styling

1. **CSS Class Names**:

   - Use kebab-case for CSS class names: `button-primary`, `nav-item`
   - Use BEM methodology when appropriate: `card__title`, `button--large`

2. **CSS-in-JS**:
   - Use camelCase for styled-components: `const StyledButton = styled.button`

### TypeScript

1. **Types and Interfaces**:
   - Use PascalCase
   - Interfaces for component props should end with `Props`: `ButtonProps`
   - Types for component states should end with `State`: `FormState`
   - Enums should use PascalCase: `ButtonVariant`, `ThemeMode`

## Storybook Guidelines

### Story Organization

1. Each component should have a corresponding `.stories.tsx` file
2. Stories should be organized by component hierarchy (common, organisms, pages)
3. Use meaningful names for story variations
4. Document component props with argTypes
5. Include usage guidelines and examples

### Example Story File:

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Components/common/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline"],
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "The size of the button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
    onClick: () => console.log("Button clicked"),
  },
};
```

## Best Practices

1. **Component Structure**:

   - Keep components small and focused
   - Avoid deeply nested components
   - Extract reusable logic to custom hooks
   - Use React.memo for performance optimization when appropriate

2. **State Management**:

   - Use local state for component-specific state
   - Use Context API for shared state across components
   - Consider Redux/Zustand for complex global state

3. **TypeScript**:

   - Define types for all props and state
   - Use generics for reusable components
   - Avoid `any` type when possible

4. **Testing**:
   - Write tests for all components and utilities
   - Use React Testing Library for component tests
   - Test edge cases and error states

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm start
   ```
4. Run Storybook:
   ```bash
   npm run storybook
   ```

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

# Amanahfy UI Components

A reusable React component library for Amanahfy UK.

## Installation

Install the package using npm:

```bash
npm install amanahfy-ui-components
```

Or using yarn:

```bash
yarn add amanahfy-ui-components
```

## Peer Dependencies

This library requires the following peer dependencies to be installed in your project:

- `react` (^17.0.0 || ^18.0.0)
- `react-dom` (^17.0.0 || ^18.0.0)
- `react-router-dom` (^6.0.0)
- `@headlessui/react` (^2.0.0)

Make sure these are installed in your project.

## Usage

First, you need to import the CSS file into your main application file (e.g., `src/index.js`, `src/main.tsx`, or `src/App.js`):

```javascript
import "amanahfy-ui-components/dist/index.css";

// Your other application setup...
```

Then, you can import and use the components as needed:

```javascript
import React from "react";
import { Button, AddExistingCampaignPopup } from "amanahfy-ui-components";

function MyApp() {
  // Example state for the popup
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  return (
    <div>
      <h1>My Application</h1>
      <Button variant="primary" onClick={() => setIsPopupOpen(true)}>
        Open Campaign Popup
      </Button>

      <AddExistingCampaignPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        // Add other necessary props for AddExistingCampaignPopup
        // e.g., onAddCampaigns={...} campaigns={...} etc.
      />

      {/* Other components and content */}
    </div>
  );
}

export default MyApp;
```

Refer to the specific component documentation or source code for required props and further usage details.

## Theming / Customization

This library uses CSS Custom Properties (variables) for theming key aspects like the primary color. You can override these variables in your own global CSS file to match your application's theme.

**Primary Color:**

The primary color used by components (e.g., for buttons, accents) is controlled by the `--color-primary` CSS variable. The default value is `#003080`.

To override it, define the variable in your project's main CSS file (the one where you also import the library's CSS):

```css
/* Your global CSS file (e.g., src/index.css or src/globals.css) */

:root {
  --color-primary: #YOUR_CUSTOM_COLOR_HERE; /* e.g., #e53e3e for red */
}

/* Make sure to import the library's CSS *after* defining your variables */
@import "amanahfy-ui-components/dist/index.css";

/* Or if using JS import: */
/* import "amanahfy-ui-components/dist/index.css"; */

/* Other global styles... */
```

Refer to the specific component documentation or source code for required props and further usage details.
