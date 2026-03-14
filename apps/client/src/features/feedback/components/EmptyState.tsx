import type { ViewName } from '../../../lib/constants';

const emptyMessages: Record<ViewName, { title: string; description: string }> = {
  all: {
    title: 'No todos yet',
    description: 'Type something above and hit Enter to capture your first task.',
  },
  important: {
    title: 'No important todos',
    description: 'Flag a todo as important from the edit drawer to see it here.',
  },
  expiring: {
    title: 'Nothing expiring soon',
    description: 'Add a due date to a todo to track upcoming deadlines.',
  },
  completed: {
    title: 'No completed todos',
    description: 'Complete a todo by clicking the check button to see it here.',
  },
};

interface EmptyStateProps {
  view: ViewName;
}

export function EmptyState({ view }: EmptyStateProps) {
  const { title, description } = emptyMessages[view];

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-lg font-medium text-muted-foreground">{title}</p>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground/70">
        {description}
      </p>
    </div>
  );
}
