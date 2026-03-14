import { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { useTodoStore } from '../../../store/todoStore';
import { EditTodoForm } from './EditTodoForm';
import { cn } from '../../../lib/utils';

export function EditTodoDrawer() {
  const editingTodoId = useTodoStore((s) => s.editingTodoId);
  const todos = useTodoStore((s) => s.todos);
  const setEditingTodoId = useTodoStore((s) => s.setEditingTodoId);
  const clearSaveError = useTodoStore((s) => s.clearSaveError);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const todo = editingTodoId
    ? todos.find((t) => t.id === editingTodoId) ?? null
    : null;

  const isOpen = !!todo;

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    clearSaveError();
    setEditingTodoId(null);
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 0);
  }, [setEditingTodoId, clearSaveError]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen || !todo) return null;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40 md:hidden"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Edit todo: ${todo.text}`}
        className={cn(
          'fixed z-50 flex flex-col bg-background shadow-lg',
          // Mobile: bottom sheet
          'inset-x-0 bottom-0 max-h-[85vh] rounded-t-xl border-t md:rounded-t-none md:border-t-0',
          // Desktop: side panel
          'md:inset-y-0 md:right-0 md:left-auto md:w-[400px] md:max-h-none md:border-l'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold">Edit Todo</h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close edit drawer"
            className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          <EditTodoForm todo={todo} onClose={handleClose} />
        </div>
      </div>
    </>
  );
}
