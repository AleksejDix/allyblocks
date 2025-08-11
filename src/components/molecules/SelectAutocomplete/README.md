# SelectAutocomplete Component

A simple, accessible select dropdown component built with Downshift's `useSelect` hook.

## Component Structure

```tsx
<SelectAutocomplete
  options={options}
  value={value}
  onChange={onChange}
  placeholder="Select an option..."
  disabled={false}
/>
```

## ARIA Roles & Accessibility

The component implements the following ARIA pattern:

### Trigger Button
- **Role**: `combobox` (set by Downshift's useSelect)
- **Attributes**:
  - `aria-expanded`: Indicates if dropdown is open
  - `aria-haspopup="listbox"`: Indicates it opens a listbox
  - `aria-controls`: References the listbox ID
  - `aria-activedescendant`: References the currently highlighted option

### Dropdown List
- **Role**: `listbox` 
- **Purpose**: Contains the selectable options
- **Behavior**: Hidden when closed, visible when open

### List Items
- **Role**: `option` (implicit from being children of listbox)
- **States**:
  - Highlighted (via keyboard navigation)
  - Selected (currently chosen value)
  - Disabled (non-selectable)

## How It Works

1. **Closed State**: Shows selected value or placeholder
2. **Click Trigger**: Opens dropdown showing all options
3. **Select Option**: Click an option to select it and close dropdown
4. **Keyboard Navigation**: 
   - Arrow keys to navigate options
   - Enter/Space to select
   - Escape to close

## Implementation Details

Currently using Downshift's `useSelect` which provides:
- Keyboard navigation
- ARIA attributes management  
- Focus management
- State management

### Note on Combobox Role

While our trigger has `role="combobox"` (set by Downshift), this component behaves as a traditional select:
- No text input capability
- No filtering/search
- Only predefined options

A true combobox would combine a text input with a dropdown for filtering/searching options.

## Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `options` | `SelectAutocompleteOption[]` | Array of options with `value` and `label` | Required |
| `value` | `string` | Currently selected value | - |
| `onChange` | `(value: string) => void` | Called when selection changes | - |
| `placeholder` | `string` | Text shown when no selection | "Select an option..." |
| `disabled` | `boolean` | Disables the select | false |
| `className` | `string` | Additional CSS classes | - |

## Option Interface

```tsx
interface SelectAutocompleteOption {
  value: string
  label: string  
  disabled?: boolean
}
```

## Usage Example

```tsx
import { SelectAutocomplete } from '@/components/molecules/SelectAutocomplete'

function MyComponent() {
  const [selectedFruit, setSelectedFruit] = useState('')
  
  const fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' }
  ]

  return (
    <SelectAutocomplete
      options={fruits}
      value={selectedFruit}
      onChange={setSelectedFruit}
      placeholder="Select a fruit..."
    />
  )
}
```

## Styling

The component uses Tailwind CSS classes and respects the application's theme tokens:
- `bg-background` - Background color
- `border-input` - Border color
- `text-popover-foreground` - Text color
- `bg-accent` - Highlight color
- Focus ring styles for accessibility

## Testing

The component includes Storybook stories with interaction tests that verify:
- Mouse selection works correctly
- Value updates properly on selection
- Multiple selections can be made sequentially

## Future Enhancements

Potential additions for a full-featured component:
- [ ] Search/filter capability (true combobox)
- [ ] Multi-select support
- [ ] Custom option rendering
- [ ] Grouped options
- [ ] Async option loading
- [ ] Clear button
- [ ] Custom icons