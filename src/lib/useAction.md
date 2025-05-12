# Action Mechanism

This module provides a reusable action mechanism that can be used by any component that needs to process actions with values, callbacks, and context.

## Key Features

1. **Generic Type Support** - Type-safe actions with context
2. **Consistent API** - Standardized approach for all components
3. **Animation Support** - Actions are processed after animations complete
4. **Context-Based** - Uses React Context for state management
5. **Extensible** - Easy to add to new components

## Usage Example

```tsx
// 1. Create a context file for your component
// MyComponent.context.ts
import { createActionContext, createActionHook } from "@/lib/useAction";
import type { MyComponentContext } from "./MyComponent.types";

export const MyComponentContext = createActionContext<MyComponentContext>();
export const useMyComponent = createActionHook<MyComponentContext>(
  MyComponentContext,
  "useMyComponent"
);
```

```tsx
// 2. Define types for your component
// MyComponent.types.ts
import type {
  ActionContextType,
  ActionTriggerProps,
  ActionProviderProps,
} from "@/lib/useAction";

export type MyComponentContext = Record<string, unknown>;
export type MyComponentContextType = ActionContextType<MyComponentContext>;

export type MyComponentProps = ActionProviderProps<MyComponentContext> & {
  // Additional props...
};

export type MyComponentButtonProps = ActionTriggerProps<MyComponentContext> & {
  // Additional props...
};
```

```tsx
// 3. Implement your component
// MyComponent.tsx
import { useActionProvider, useActionHandler } from "@/lib/useAction";
import { MyComponentContext, useMyComponent } from "./MyComponent.context";

export function MyComponent({ children, onValueChange, ...props }) {
  const { action, setAction } = useActionProvider();

  return (
    <MyComponentContext.Provider value={{ action, setAction, onValueChange }}>
      <div {...props}>{children}</div>
    </MyComponentContext.Provider>
  );
}

export function MyComponentButton({
  action,
  onAction,
  value,
  context,
  ...props
}) {
  const myComponentContext = useMyComponent();

  const handleClick = (event) => {
    const actionHandler = onAction || action;

    if (value || actionHandler) {
      myComponentContext.setAction({
        callback: actionHandler,
        value,
        context,
        event,
      });
    }
  };

  return <button onClick={handleClick} {...props} />;
}

export function MyComponentContent({ children, ...props }) {
  const actionContext = useMyComponent();
  const handleAnimationEnd = useActionHandler(actionContext);

  return (
    <div onAnimationEnd={handleAnimationEnd} {...props}>
      {children}
    </div>
  );
}
```

## Benefits

By using this shared action mechanism, components can:

1. Process actions after animations complete
2. Pass values and context through actions
3. Execute callbacks both at the item and component level
4. Maintain a consistent API across all components
5. Support complex actions with rich context
