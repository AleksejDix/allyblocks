import { Decorator } from "@storybook/react";
import React from "react";

export const withScheme: Decorator = (Story, context) => {
  const { scheme } = context.globals;

  console.log("scheme", context.globals);

  const html = document.documentElement;

  const query = window.matchMedia("(prefers-color-scheme: dark)");

  query.addEventListener("change", (e) => {
    switch (scheme) {
      case "auto":
        html.classList.toggle("dark", e.matches);
        break;
      case "dark":
        html.classList.add("dark");
        break;
      default:
        html.classList.remove("dark");
    }
  });

  return <Story />;
};
