import React, { useState, useCallback, useEffect } from 'react'
import { IconButton } from '@/components/atoms/IconButton'
import { Icon } from '@/components/atoms/Icon'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/molecules/Tooltip'
import type { CopyProps, CopyRef } from './Copy.types'

/**
 * Copy component that provides a small IconButton with tooltip for copying text to clipboard.
 * Supports Ctrl+C keyboard shortcut detection and asChild pattern for custom rendering.
 *
 * @example
 * ```tsx
 * <Copy value="Hello, World!" />
 * <Copy value="API Key: abc123" tooltip="Copy API Key" size="sm" variant="outline" />
 * <Copy value="Code snippet" asChild>
 *   <button className="custom-button">Copy Code</button>
 * </Copy>
 * ```
 */
export const Copy = (
  {
    value,
    tooltip = 'Copy',
    copiedTooltip = 'Copied!',
    copiedDuration = 2000,
    onCopySuccess,
    onCopyError,
    'aria-label': ariaLabel,
    tooltipProps,
    size = 'sm',
    variant = 'ghost',
    asChild = false,
    children,
    icon,
    ...props
  }: CopyProps,
  ref?: React.Ref<CopyRef>,
) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setIsCopied(true)
      onCopySuccess?.(value)
    } catch (error) {
      const copyError = error instanceof Error ? error : new Error('Failed to copy to clipboard')
      onCopyError?.(copyError)
    }
  }, [value, onCopySuccess, onCopyError])

  // Handle Ctrl+C keyboard shortcut detection
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        // Only trigger if the copy component is focused or if no other input is focused
        const activeElement = document.activeElement
        const isInputFocused =
          activeElement &&
          (activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            (activeElement as HTMLElement).contentEditable === 'true')

        // If no input is focused, show visual feedback
        if (!isInputFocused) {
          setIsCopied(true)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Reset copied state after duration with proper cleanup
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false)
      }, copiedDuration)

      return () => clearTimeout(timer)
    }
  }, [isCopied, copiedDuration])

  const currentTooltip = isCopied ? copiedTooltip : tooltip
  const currentAriaLabel = ariaLabel || currentTooltip

  const buttonProps = {
    ref,
    'aria-label': currentAriaLabel,
    onClick: handleCopy,
    ...props,
  }

  // Render custom icon or default icons
  const renderIcon = () => {
    if (icon) {
      if (typeof icon === 'function') {
        return icon({ isCopied, size: size as 'sm' | 'md' | 'lg' })
      }
      return icon
    }

    // Default icons
    return (
      <Icon name={isCopied ? 'clipboard-check' : 'clipboard'} size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
    )
  }

  return (
    <Tooltip {...tooltipProps}>
      <TooltipTrigger asChild>
        {asChild ? (
          React.cloneElement(React.Children.only(children) as React.ReactElement, buttonProps)
        ) : (
          <IconButton size={size} variant={variant} {...buttonProps}>
            {renderIcon()}
          </IconButton>
        )}
      </TooltipTrigger>
      <TooltipContent>{currentTooltip}</TooltipContent>
    </Tooltip>
  )
}

Copy.displayName = 'Copy'
