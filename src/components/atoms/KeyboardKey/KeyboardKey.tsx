import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { keyboardKeyVariants } from './KeyboardKey.variants'
import type { KeyboardKeyProps, KeyboardKeyRef, CommonKeyName } from './KeyboardKey.types'

/**
 * Detect if the user is on macOS
 */
const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0

/**
 * Key display mappings for better UX
 */
const keyDisplayMap: Record<CommonKeyName, { default: string; mac?: string; aria: string }> = {
  ctrl: { default: 'Ctrl', mac: '⌃', aria: 'Control' },
  cmd: { default: 'Cmd', mac: '⌘', aria: 'Command' },
  alt: { default: 'Alt', mac: '⌥', aria: 'Alt' },
  shift: { default: 'Shift', mac: '⇧', aria: 'Shift' },
  tab: { default: 'Tab', mac: '⇥', aria: 'Tab' },
  enter: { default: 'Enter', mac: '↵', aria: 'Enter' },
  space: { default: 'Space', mac: '␣', aria: 'Space' },
  esc: { default: 'Esc', aria: 'Escape' },
  delete: { default: 'Del', mac: '⌦', aria: 'Delete' },
  backspace: { default: '⌫', aria: 'Backspace' },
  up: { default: '↑', aria: 'Up arrow' },
  down: { default: '↓', aria: 'Down arrow' },
  left: { default: '←', aria: 'Left arrow' },
  right: { default: '→', aria: 'Right arrow' },
  home: { default: 'Home', aria: 'Home' },
  end: { default: 'End', aria: 'End' },
  pageup: { default: 'PgUp', aria: 'Page up' },
  pagedown: { default: 'PgDn', aria: 'Page down' },
  f1: { default: 'F1', aria: 'F1' },
  f2: { default: 'F2', aria: 'F2' },
  f3: { default: 'F3', aria: 'F3' },
  f4: { default: 'F4', aria: 'F4' },
  f5: { default: 'F5', aria: 'F5' },
  f6: { default: 'F6', aria: 'F6' },
  f7: { default: 'F7', aria: 'F7' },
  f8: { default: 'F8', aria: 'F8' },
  f9: { default: 'F9', aria: 'F9' },
  f10: { default: 'F10', aria: 'F10' },
  f11: { default: 'F11', aria: 'F11' },
  f12: { default: 'F12', aria: 'F12' },
}

/**
 * Modifier keys that should use the modifier styling
 */
const modifierKeys: CommonKeyName[] = ['ctrl', 'cmd', 'alt', 'shift']

/**
 * KeyboardKey component that displays keyboard keys with proper styling and accessibility.
 * Automatically handles platform-specific key representations and provides semantic markup.
 *
 * @example
 * ```tsx
 * <KeyboardKey>K</KeyboardKey>
 * <KeyboardKey keyName="ctrl" />
 * <KeyboardKey keyName="cmd" size="lg" />
 * <KeyboardKey variant="pressed">Enter</KeyboardKey>
 * ```
 */
export const KeyboardKey = (
  {
    className,
    asChild = false,
    children,
    keyName,
    platformSpecific = true,
    size = 'md',
    variant = 'default',
    modifier,
    'aria-label': ariaLabel,
    ...props
  }: KeyboardKeyProps,
  ref?: React.Ref<KeyboardKeyRef>,
) => {
  // Determine if this is a modifier key
  const isModifier = modifier ?? (keyName ? modifierKeys.includes(keyName) : false)

  // Get the display text and aria-label
  let displayText = children
  let computedAriaLabel = ariaLabel

  if (keyName) {
    const keyInfo = keyDisplayMap[keyName]
    if (keyInfo) {
      displayText = platformSpecific && isMac && keyInfo.mac ? keyInfo.mac : keyInfo.default
      computedAriaLabel = ariaLabel || keyInfo.aria
    }
  }

  const Component = asChild ? Slot : 'kbd'

  return (
    <Component
      ref={ref}
      className={cn(
        keyboardKeyVariants({
          size,
          variant,
          modifier: isModifier,
        }),
        className,
      )}
      aria-label={computedAriaLabel}
      {...props}
    >
      {asChild ? children : displayText}
    </Component>
  )
}

KeyboardKey.displayName = 'KeyboardKey'
