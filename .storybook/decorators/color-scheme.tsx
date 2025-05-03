import { Decorator } from "@storybook/react";
import React, { useEffect, useRef } from "react";

export const withScheme: Decorator = (Story, context) => {
  const initialScheme = context.globals.scheme;

  const SchemeWrapper = () => {
    const schemeRef = useRef(initialScheme);

    useEffect(() => {
      const html = document.documentElement;
      const query = window.matchMedia("(prefers-color-scheme: dark)");

      function applyScheme(s: string) {
        if (s === "auto") {
          html.classList.toggle("dark", query.matches);
        } else if (s === "dark") {
          html.classList.add("dark");
        } else {
          html.classList.remove("dark");
        }
      }

      // Initial apply
      applyScheme(schemeRef.current);

      // Listen for Storybook global changes
      // @ts-expect-error: __STORYBOOK_ADDONS_CHANNEL__ is not typed
      const channel = window.__STORYBOOK_ADDONS_CHANNEL__;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function onGlobals({ globals }: any) {
        if (globals && typeof globals.scheme === "string") {
          schemeRef.current = globals.scheme;
          applyScheme(globals.scheme);
        }
      }
      if (channel) {
        channel.on("globalsUpdated", onGlobals);
      }

      // Listen for system dark mode changes
      function handleChange(e: MediaQueryListEvent) {
        if (schemeRef.current === "auto") {
          html.classList.toggle("dark", e.matches);
        }
      }
      if (schemeRef.current === "auto") {
        query.addEventListener("change", handleChange);
      }

      return () => {
        if (channel) channel.off("globalsUpdated", onGlobals);
        query.removeEventListener("change", handleChange);
      };
    }, []);

    return <Story />;
  };

  return <SchemeWrapper />;
};
