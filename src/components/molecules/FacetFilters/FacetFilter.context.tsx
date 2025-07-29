import React, { createContext, useContext } from "react";
import {
  useQueryStates,
  type UseQueryStatesOptions,
  type UseQueryStatesKeysMap,
} from "nuqs";

const FacetFilterContext = createContext<any>(null);

type FacetFilterProviderProps<T extends UseQueryStatesKeysMap> = {
  children: React.ReactNode;
  parsers: T;
  defaultValues?: Record<string, any>;
  options?: UseQueryStatesOptions<T>;
};

export function FacetFilterProvider<T extends UseQueryStatesKeysMap>({
  children,
  parsers,
  defaultValues = {},
  options,
}: FacetFilterProviderProps<T>) {
  const [urlValues, setUrlValues] = useQueryStates(parsers, {
    history: "replace",
    clearOnDefault: true,
    ...options,
  });


  return (
    <FacetFilterContext.Provider value={{ urlValues, setUrlValues, defaultValues }}>
      {children}
    </FacetFilterContext.Provider>
  );
}

export function useFacetFilters() {
  const context = useContext(FacetFilterContext);
  if (!context) {
    throw new Error("useFacetFilters must be used within FacetFilterProvider");
  }
  return context;
}
