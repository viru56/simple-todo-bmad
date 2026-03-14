import { useTodoStore } from '../../../store/todoStore';
import { VIEWS, type ViewName } from '../../../lib/constants';
import { cn } from '../../../lib/utils';

const viewLabels: Record<ViewName, string> = {
  all: 'All',
  important: 'Important',
  expiring: 'Expiring',
  completed: 'Completed',
};

export function ViewTabs() {
  const activeView = useTodoStore((s) => s.activeView);
  const setActiveView = useTodoStore((s) => s.setActiveView);

  return (
    <div role="tablist" aria-label="Todo views" className="flex gap-1 rounded-lg bg-secondary p-1">
      {VIEWS.map((view) => (
        <button
          key={view}
          role="tab"
          aria-selected={activeView === view}
          aria-controls={`tabpanel-${view}`}
          onClick={() => setActiveView(view)}
          className={cn(
            'flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring',
            activeView === view
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {viewLabels[view]}
        </button>
      ))}
    </div>
  );
}
