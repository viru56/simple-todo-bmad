import type { Todo } from '@simple-todo-bmad/shared';

export function sortByNewest(todos: Todo[]): Todo[] {
  return [...todos].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function sortByCompletedAt(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    if (!a.completedAt) return 1;
    if (!b.completedAt) return -1;
    return (
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
  });
}
