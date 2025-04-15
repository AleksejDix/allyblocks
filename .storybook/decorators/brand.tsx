import type { Decorator } from "@storybook/react";
import React from "react";
export const withBrand: Decorator = (Story, context) => {
  const { brand } = context.globals;

  const html = document.documentElement;

  switch (brand) {
    case "medidata":
      html.setAttribute("data-brand", "medidata");
      break;
    case "schadcn":
      html.removeAttribute("data-brand");
      break;
  }
  return <Story />;
};
