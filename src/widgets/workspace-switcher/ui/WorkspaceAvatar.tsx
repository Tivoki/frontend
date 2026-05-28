import { cn } from '~/shared/lib';

interface WorkspaceAvatarProps {
  name: string;
  size?: 'sm' | 'md';
}

export const WorkspaceAvatar = ({ name, size = 'md' }: WorkspaceAvatarProps) => (
  <div
    className={cn(
      'bg-primary/10 text-primary flex shrink-0 items-center justify-center rounded-md font-semibold',
      size === 'md' ? 'size-7 text-xs' : 'size-6 text-[10px]',
    )}
  >
    {name.charAt(0)}
  </div>
);
