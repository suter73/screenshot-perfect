import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'normal' | 'alto' | 'baixo';
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
      status === 'normal' && 'status-normal',
      status === 'alto' && 'status-danger',
      status === 'baixo' && 'status-warning',
      className
    )}>
      {status === 'normal' ? 'Normal' : status === 'alto' ? '↑ Alto' : '↓ Baixo'}
    </span>
  );
}
