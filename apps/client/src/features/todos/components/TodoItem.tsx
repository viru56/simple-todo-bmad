import { Check, RotateCcw, Trash2, Loader2, Star } from 'lucide-react';
import type { Todo } from '@simple-todo-bmad/shared';
import { cn } from '../../../lib/utils';
import { TodoTimestamp } from './TodoTimestamp';
import { isTodoExpiring } from '../utils/isTodoExpiring';
import { formatDueDate } from '../../../lib/date';
import { useTodoStore } from '../../../store/todoStore';
import { ErrorBanner } from '../../feedback/components/ErrorBanner';

interface TodoItemProps {
  todo: Todo;
  onEdit: (id: string) => void;
}

export function TodoItem({ todo, onEdit }: TodoItemProps) {
  const completeTodo = useTodoStore((s) => s.completeTodo);
  const reopenTodo = useTodoStore((s) => s.reopenTodo);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);
  const itemLoadingIds = useTodoStore((s) => s.itemLoadingIds);
  const itemErrors = useTodoStore((s) => s.itemErrors);
  const clearItemError = useTodoStore((s) => s.clearItemError);

  const isLoading = itemLoadingIds.has(todo.id);
  const error = itemErrors.get(todo.id);
  const isPending = todo.id.startsWith('temp-');
  const isExpiring = isTodoExpiring(todo);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-action]')) return;
    onEdit(todo.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement;
      if (target.closest('[data-action]')) return;
      onEdit(todo.id);
    }
  };

  return (
    <div className="space-y-1">
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={`Edit todo: ${todo.text}`}
        className={cn(
          'group flex items-center gap-3 rounded-lg border border-border px-4 py-3 transition-colors hover:bg-accent/50 focus-visible:outline-2 focus-visible:outline-ring',
          isPending && 'opacity-60',
          todo.completed && 'opacity-70'
        )}
      >
        {/* Complete/Reopen button */}
        <button
          data-action="toggle"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            todo.completed ? reopenTodo(todo.id) : completeTodo(todo.id);
          }}
          disabled={isLoading || isPending}
          aria-label={todo.completed ? `Reopen: ${todo.text}` : `Complete: ${todo.text}`}
          className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors focus-visible:outline-2 focus-visible:outline-ring',
            todo.completed
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border hover:border-primary md:opacity-0 md:group-hover:opacity-100'
          )}
        >
          {todo.completed && <Check className="h-3.5 w-3.5" />}
          {!todo.completed && isLoading && (
            <Loader2 className="h-3 w-3 animate-spin" />
          )}
        </button>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span
            className={cn(
              'truncate text-sm font-medium',
              todo.completed && 'line-through text-muted-foreground'
            )}
          >
            {todo.text}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {todo.completedAt && (
              <TodoTimestamp label="Completed" isoString={todo.completedAt} />
            )}
            {!todo.completed && (
              <TodoTimestamp label="Created" isoString={todo.createdAt} />
            )}
            {todo.important && !todo.completed && (
              <span className="inline-flex items-center gap-0.5 text-xs text-important">
                <Star className="h-3 w-3 fill-current" />
                Important
              </span>
            )}
            {isExpiring && todo.dueDate && (
              <span className="text-xs text-expiring">
                Due {formatDueDate(todo.dueDate)}
              </span>
            )}
            {todo.category && !todo.completed && (
              <span className="rounded bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground">
                {todo.category}
              </span>
            )}
          </div>
        </div>

        {/* Loading spinner */}
        {isLoading && (
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
        )}

        {/* Delete button */}
        {!todo.completed && (
          <button
            data-action="delete"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              deleteTodo(todo.id);
            }}
            disabled={isLoading || isPending}
            aria-label={`Delete: ${todo.text}`}
            className="shrink-0 rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive focus-visible:outline-2 focus-visible:outline-ring md:opacity-0 md:group-hover:opacity-100"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}

        {/* Reopen for completed */}
        {todo.completed && (
          <button
            data-action="reopen"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              reopenTodo(todo.id);
            }}
            disabled={isLoading}
            aria-label={`Reopen: ${todo.text}`}
            className="shrink-0 rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring md:opacity-0 md:group-hover:opacity-100"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}

        {/* Delete for completed */}
        {todo.completed && (
          <button
            data-action="delete"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              deleteTodo(todo.id);
            }}
            disabled={isLoading}
            aria-label={`Delete: ${todo.text}`}
            className="shrink-0 rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive focus-visible:outline-2 focus-visible:outline-ring md:opacity-0 md:group-hover:opacity-100"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
      {error && (
        <ErrorBanner
          message={error}
          onDismiss={() => clearItemError(todo.id)}
          onRetry={() => {
            clearItemError(todo.id);
            todo.completed ? reopenTodo(todo.id) : completeTodo(todo.id);
          }}
        />
      )}
    </div>
  );
}
