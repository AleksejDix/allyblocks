import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import type { IconProps } from '@/components/atoms/Icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/molecules/DropdownMenu'

export interface ActionItem<T> {
  label: string
  icon?: IconProps['name']
  onClick: (row: T) => void
  variant?: 'default' | 'destructive'
  separator?: boolean
}

export interface ActionCellProps<T> {
  row: T
  actions: ActionItem<T>[]
  align?: 'start' | 'center' | 'end'
  triggerIcon?: IconProps['name']
  triggerLabel?: string
}

export function ActionCell<T>({
  row,
  actions,
  align = 'end',
  triggerIcon = 'more-horizontal',
  triggerLabel,
}: ActionCellProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Icon name={triggerIcon} className="h-4 w-4" />
          {triggerLabel && <span className="ml-2">{triggerLabel}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {actions.map((action, index) => (
          <div key={index}>
            {action.separator && index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuItem
              onClick={() => action.onClick(row)}
              className={action.variant === 'destructive' ? 'text-destructive' : ''}
            >
              {action.icon && <Icon name={action.icon} className="mr-2 h-4 w-4" />}
              {action.label}
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
