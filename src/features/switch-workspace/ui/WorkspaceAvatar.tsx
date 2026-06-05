import { cn } from '~/shared/lib';

interface WorkspaceAvatarProps {
  name: string;
  size?: 'sm' | 'md';
}

export const WorkspaceAvatar = ({ name, size = 'md' }: WorkspaceAvatarProps) => (
  <div
    className={cn(
      'flex shrink-0 items-center justify-center rounded-md bg-primary/10 font-semibold text-primary',
      size === 'md' ? 'size-7 text-xs' : 'size-6 text-[10px]',
    )}
  >
    {name.charAt(0)}
  </div>
);
