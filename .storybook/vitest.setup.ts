import { beforeAll } from "vitest";
import { setProjectAnnotations } from "@storybook/react";
import * as projectAnnotations from "./preview";
// import React from "react";

// Mock react-i18next
// vi.mock("react-i18next", () => ({
//   useTranslation: () => {
//     return {
//       t: (str: string) => str,
//       i18n: {
//         changeLanguage: () => new Promise(() => {}),
//       },
//     };
//   },
//   initReactI18next: {
//     type: "3rdParty",
//     init: () => {},
//   },
//   I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
// }));

const annotations = setProjectAnnotations([projectAnnotations]);

beforeAll(annotations.beforeAll);
