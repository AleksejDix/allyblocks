import { DynamicIcon } from 'lucide-react/dynamic';
import { type LucideProps } from 'lucide-react';

type IconName = Parameters<typeof DynamicIcon>[0]['name'];

export function Icon({ name, ...props }: LucideProps & { name: IconName }) {
  return <DynamicIcon name={name} {...props} />;
}
