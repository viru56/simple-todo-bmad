import { useTodoStore } from '../../../store/todoStore';
import { getAvailableCategories } from '../../../store/selectors';
import { cn } from '../../../lib/utils';

export function CategoryFilter() {
  const todos = useTodoStore((s) => s.todos);
  const categoryFilter = useTodoStore((s) => s.categoryFilter);
  const setCategoryFilter = useTodoStore((s) => s.setCategoryFilter);
  const activeView = useTodoStore((s) => s.activeView);
  const categories = getAvailableCategories(todos);

  if (activeView === 'completed' || categories.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by category">
      <button
        type="button"
        onClick={() => setCategoryFilter(null)}
        className={cn(
          'rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring',
          categoryFilter === null
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        )}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring',
            categoryFilter === cat
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
