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
