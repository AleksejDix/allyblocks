import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/styles/index.css";

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      medidata: "medidata",
      schadcn: "schadcn",
    },
    defaultTheme: "medidata",
    attributeName: "data-brand",
  }),
];

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    toolbar: {
      icon: "globe",
      items: [
        { value: "de", title: "Deutsch" },
        { value: "en", title: "English" },
        { value: "fr", title: "Français" },
        { value: "it", title: "Italiano" },
      ],
      showName: true,
    },
  },
};
