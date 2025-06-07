import { cn } from '@/lib/utils'
import { Card } from '@/components/molecules/Card'
import type { FeedbackProps } from './Feedback.types'

/**
 * Feedback component for displaying testimonials and user feedback.
 *
 * Following the same composition pattern as Empty component - minimal container
 * that accepts all content as children for maximum flexibility.
 *
 * @example
 * <Feedback>
 *   <Avatar size="md">
 *     <AvatarImage src="/avatar.jpg" alt="User" />
 *     <AvatarFallback>FK</AvatarFallback>
 *   </Avatar>
 *   <Text size="lg" className="font-medium text-foreground">
 *     Subframe was a game changer for us...
 *   </Text>
 *   <div>
 *     <Text weight={600}>Fawad Khaliq</Text>
 *     <Text tone="muted">CTO @ Chkk</Text>
 *   </div>
 * </Feedback>
 */
function Feedback({ className, children, ...props }: FeedbackProps) {
  return (
    <Card className={cn('p-6 relative flex flex-col gap-6', className)} {...props}>
      {/* Quote icon at top right */}
      <div className="absolute top-6 right-6 text-muted-foreground/20">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="rotate-180">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>
      </div>

      {/* All content as children */}
      {children}
    </Card>
  )
}

export { Feedback }
