import type { Todo } from '@simple-todo-bmad/shared';
import { EXPIRING_THRESHOLD_DAYS } from '@simple-todo-bmad/shared';
import type { ViewName } from '../lib/constants';

export function getActiveTodos(todos: Todo[]): Todo[] {
  return todos.filter((t) => !t.completed);
}

export function getCompletedTodos(todos: Todo[]): Todo[] {
  return todos.filter((t) => t.completed);
}

export function getImportantTodos(todos: Todo[]): Todo[] {
  return todos.filter((t) => !t.completed && t.important);
}

export function getExpiringTodos(todos: Todo[]): Todo[] {
  const now = new Date();
  const threshold = new Date(
    now.getTime() + EXPIRING_THRESHOLD_DAYS * 24 * 60 * 60 * 1000
  );

  return todos.filter((t) => {
    if (t.completed || !t.dueDate) return false;
    return new Date(t.dueDate) <= threshold;
  });
}

export function getTodosByView(todos: Todo[], view: ViewName): Todo[] {
  switch (view) {
    case 'all':
      return getActiveTodos(todos);
    case 'important':
      return getImportantTodos(todos);
    case 'expiring':
      return getExpiringTodos(todos);
    case 'completed':
      return getCompletedTodos(todos);
  }
}

export function filterByCategory(
  todos: Todo[],
  category: string | null
): Todo[] {
  if (!category) return todos;
  return todos.filter((t) => t.category === category);
}

export function getAvailableCategories(todos: Todo[]): string[] {
  const activeTodos = todos.filter((t) => !t.completed);
  const categories = new Set<string>();
  for (const todo of activeTodos) {
    if (todo.category) categories.add(todo.category);
  }
  return Array.from(categories).sort();
}
