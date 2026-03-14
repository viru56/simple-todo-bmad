import type { Todo } from '@simple-todo-bmad/shared';

export function getFilteredTodos(
  todos: Todo[],
  category: string | null
): Todo[] {
  if (!category) return todos;
  return todos.filter((t) => t.category === category);
}
