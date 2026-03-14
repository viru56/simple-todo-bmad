import { EXPIRING_THRESHOLD_DAYS } from '@simple-todo-bmad/shared';
import type { Todo } from '@simple-todo-bmad/shared';

export function isTodoExpiring(todo: Todo): boolean {
  if (todo.completed || !todo.dueDate) return false;
  const threshold = new Date(
    Date.now() + EXPIRING_THRESHOLD_DAYS * 24 * 60 * 60 * 1000
  );
  return new Date(todo.dueDate) <= threshold;
}
