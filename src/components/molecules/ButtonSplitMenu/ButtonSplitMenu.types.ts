import React from "react";

export type ActionEvent = {
  type: string;
  event: Event | React.SyntheticEvent;
  payload?: Record<string, string>;
};

export type Action = {
  label: string;
  type: string;
  action: (action: ActionEvent) => void;
  props?: Record<string, string> & { disabled?: boolean };
  before?: React.ReactNode;
  after?: React.ReactNode;
  payload?: Record<string, string>;
};

// ButtonSplit only supports these variants
export type ButtonVariant = "default" | "outline" | "secondary";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

export type ButtonSplitMenuProps = {
  actions: Action[];
  children: React.ReactNode;
  moreButtonRef?: React.Ref<HTMLButtonElement>;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}; 