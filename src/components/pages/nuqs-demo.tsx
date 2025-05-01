import * as React from "react";
import { parseAsString, useQueryState } from "nuqs";
import { Input } from "./input";

type Props = {
  paramName: string;
  defaultValue?: string;
};

export function NuqsInput({ paramName, defaultValue }: Props) {
  // Connect to URL query parameter
  const [value, setValue] = useQueryState(
    paramName,
    parseAsString.withDefault(defaultValue || "")
  );

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <Input value={value || defaultValue || ""} onChange={handleChange} />;
}
