import { createContext, useContext, type ReactNode } from 'react'
import { type UseQueryStatesKeysMap, type UseQueryStatesReturn, type Values } from 'nuqs'

type FacetFilterContextValue<T extends UseQueryStatesKeysMap> = {
  queryStates: UseQueryStatesReturn<T>
  defaultValues: Partial<Values<T>>
}

/**
 * Creates a type-safe FacetFilter provider and hook pair
 *
 * @example
 * ```tsx
 * // Define your parsers
 * const filterParsers = {
 *   status: parseAsString,
 *   datefrom: parseAsString,
 *   dateto: parseAsString,
 * } as const;
 *
 * // Create typed provider and hook
 * const { FacetFilterProvider, useFacetFilters } = createFacetFilter<typeof filterParsers>();
 *
 * // Use in your app
 * function App() {
 *   const queryStates = useQueryStates(filterParsers);
 *
 *   return (
 *     <FacetFilterProvider queryStates={queryStates}>
 *       <MyFilters />
 *     </FacetFilterProvider>
 *   );
 * }
 *
 * // In child components - fully typed!
 * function MyFilters() {
 *   const { queryStates, defaultValues } = useFacetFilters();
 *   const [values, setValues] = queryStates;
 *   // values is typed as { status?: string | null, datefrom?: string | null, dateto?: string | null }
 * }
 * ```
 */
export function createFacetFilter<T extends UseQueryStatesKeysMap>() {
  const Context = createContext<FacetFilterContextValue<T> | null>(null)

  function FacetFilterProvider(props: {
    children: ReactNode
    queryStates: UseQueryStatesReturn<T>
    defaultValues?: Partial<Values<T>>
  }) {
    const { children, queryStates, defaultValues = {} } = props

    return <Context.Provider value={{ queryStates, defaultValues }}>{children}</Context.Provider>
  }

  function useFacetFilters(): FacetFilterContextValue<T> {
    const context = useContext(Context)
    if (!context) {
      throw new Error('useFacetFilters must be used within FacetFilterProvider')
    }
    return context
  }

  return { FacetFilterProvider, useFacetFilters }
}
