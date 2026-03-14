import { useMemo } from 'react';
import { useTodoStore } from '../../../store/todoStore';
import { getTodosByView, filterByCategory } from '../../../store/selectors';
import { sortByNewest, sortByCompletedAt } from '../utils/sortTodos';

export function useVisibleTodos() {
  const todos = useTodoStore((s) => s.todos);
  const activeView = useTodoStore((s) => s.activeView);
  const categoryFilter = useTodoStore((s) => s.categoryFilter);

  return useMemo(() => {
    let visible = getTodosByView(todos, activeView);

    if (activeView !== 'completed' && categoryFilter) {
      visible = filterByCategory(visible, categoryFilter);
    }

    return activeView === 'completed'
      ? sortByCompletedAt(visible)
      : sortByNewest(visible);
  }, [todos, activeView, categoryFilter]);
}
