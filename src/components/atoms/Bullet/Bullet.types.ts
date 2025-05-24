import * as React from 'react'

export interface BulletProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string
  label?: string
}
