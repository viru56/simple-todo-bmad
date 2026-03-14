import { useTodoStore } from '../../../store/todoStore';
import { useVisibleTodos } from '../hooks/useVisibleTodos';
import { EmptyState } from '../../feedback/components/EmptyState';
import { LoadingState } from '../../feedback/components/LoadingState';
import { ErrorBanner } from '../../feedback/components/ErrorBanner';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const isLoading = useTodoStore((s) => s.isLoading);
  const loadError = useTodoStore((s) => s.loadError);
  const fetchTodos = useTodoStore((s) => s.fetchTodos);
  const activeView = useTodoStore((s) => s.activeView);
  const setEditingTodoId = useTodoStore((s) => s.setEditingTodoId);
  const visibleTodos = useVisibleTodos();

  if (isLoading) {
    return <LoadingState />;
  }

  if (loadError) {
    return (
      <div className="py-8">
        <ErrorBanner
          message={loadError}
          onRetry={fetchTodos}
        />
      </div>
    );
  }

  if (visibleTodos.length === 0) {
    return <EmptyState view={activeView} />;
  }

  return (
    <div className="space-y-2" role="list" aria-label={`${activeView} todos`}>
      {visibleTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={setEditingTodoId}
        />
      ))}
    </div>
  );
}
