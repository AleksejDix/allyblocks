import React from "react";
import { Button } from "@/components/atoms/Button";
import { useFacetFilters } from "./FacetFilter.context";

type FacetFilterResetProps = {
  children?: React.ReactNode;
  className?: string;
  onReset?: () => void;
};

export function FacetFilterReset({
  children = "Reset",
  className,
  onReset,
}: FacetFilterResetProps) {
  const { setUrlValues, defaultValues } = useFacetFilters();

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (onReset) {
      onReset();
    } else {
      setUrlValues(defaultValues || {});
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleReset}
      className={className}
    >
      {children}
    </Button>
  );
}
