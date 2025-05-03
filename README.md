# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

# @allyship/allyblocks

Accessible UI components built with ShadcnUI, designed for seamless integration with Tailwind CSS v4.

## Installation

### 1. Install the package and peer dependencies

```sh
npm install @allyship/allyblocks tailwindcss@^4.0.0 react@^19.0.0 react-dom@^19.0.0 i18next@^25.0.0 react-i18next@^15.5.1
```

### 2. Configure Tailwind CSS v4

Add the preset to your `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
  presets: [require("@allyship/allyblocks/tailwind.preset")],
  // ...your config
};
```

### 3. Import and use components

```tsx
import { Button } from "@allyship/allyblocks";

export default function Example() {
  return <Button>Click me</Button>;
}
```

## Documentation

- [Installation Guide](./docs/installation.md)
- [Component Usage](./docs/components.md)
- [Accessibility](./docs/accessibility.md)

## Troubleshooting

- Ensure all peer dependencies are installed in your project.
- Make sure your Tailwind config includes the provided preset.
- If you use Storybook, ensure your config supports Tailwind v4.

## License

MIT
