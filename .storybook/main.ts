import type { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from 'remark-gfm';
import mdxMermaid from 'mdx-mermaid';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            providerImportSource: "@mdx-js/react",
            remarkPlugins: [remarkGfm, [mdxMermaid, { output: 'svg' }]]
          }
        }
      }
    }
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
    defaultName: '@Documentation',
  },
  staticDirs: ["../public"],
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  core: {
    disableTelemetry: true,
  },
  async viteFinal(config) {
    return {
      ...config,
      define: {
        ...config.define,
        global: "window",
      },
      optimizeDeps: {
        include: ['remark-gfm', 'mermaid'],
      },
    };
  },
};

export default config; 