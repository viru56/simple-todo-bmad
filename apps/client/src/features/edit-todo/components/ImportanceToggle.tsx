import { Star } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface ImportanceToggleProps {
  important: boolean;
  onChange: (value: boolean) => void;
}

export function ImportanceToggle({ important, onChange }: ImportanceToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={important}
      aria-label={important ? 'Remove importance flag' : 'Flag as important'}
      onClick={() => onChange(!important)}
      className={cn(
        'inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring',
        important
          ? 'border-important bg-important/10 text-important'
          : 'border-border text-muted-foreground hover:border-important hover:text-important'
      )}
    >
      <Star className={cn('h-4 w-4', important && 'fill-current')} />
      {important ? 'Important' : 'Mark important'}
    </button>
  );
}
