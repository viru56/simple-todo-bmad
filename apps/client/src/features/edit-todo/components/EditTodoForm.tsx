import type { Todo } from '@simple-todo-bmad/shared';
import { CATEGORIES } from '@simple-todo-bmad/shared';
import { useEditTodoDraft } from '../hooks/useEditTodoDraft';
import { ImportanceToggle } from './ImportanceToggle';
import { useTodoStore } from '../../../store/todoStore';
import { ErrorBanner } from '../../feedback/components/ErrorBanner';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface EditTodoFormProps {
  todo: Todo;
  onClose: () => void;
}

export function EditTodoForm({ todo, onClose }: EditTodoFormProps) {
  const { draft, updateField, getChanges } = useEditTodoDraft(todo);
  const updateTodo = useTodoStore((s) => s.updateTodo);
  const isSaving = useTodoStore((s) => s.isSaving);
  const saveError = useTodoStore((s) => s.saveError);
  const clearSaveError = useTodoStore((s) => s.clearSaveError);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleSave = async () => {
    const changes = getChanges();
    if (!changes) {
      onClose();
      return;
    }

    const errors: Record<string, string> = {};
    if (changes.text !== undefined && changes.text.trim().length === 0) {
      errors.text = 'Todo text cannot be empty';
    }
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    clearSaveError();

    const result = await updateTodo(todo.id, changes);
    if (result) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Text field */}
      <div className="space-y-1">
        <label htmlFor="edit-text" className="text-sm font-medium text-foreground">
          Todo
        </label>
        <input
          id="edit-text"
          type="text"
          value={draft.text}
          onChange={(e) => {
            updateField('text', e.target.value);
            if (validationErrors.text) {
              setValidationErrors((prev) => {
                const next = { ...prev };
                delete next.text;
                return next;
              });
            }
          }}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring"
        />
        {validationErrors.text && (
          <p className="text-xs text-destructive">{validationErrors.text}</p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-1">
        <label htmlFor="edit-category" className="text-sm font-medium text-foreground">
          Category
        </label>
        <select
          id="edit-category"
          value={draft.category ?? ''}
          onChange={(e) =>
            updateField('category', e.target.value || null)
          }
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring"
        >
          <option value="">No category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Due Date */}
      <div className="space-y-1">
        <label htmlFor="edit-due-date" className="text-sm font-medium text-foreground">
          Due date
        </label>
        <input
          id="edit-due-date"
          type="date"
          value={draft.dueDate ?? ''}
          onChange={(e) =>
            updateField('dueDate', e.target.value || null)
          }
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring"
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label htmlFor="edit-description" className="text-sm font-medium text-foreground">
          Description
        </label>
        <textarea
          id="edit-description"
          value={draft.description ?? ''}
          onChange={(e) =>
            updateField('description', e.target.value || null)
          }
          rows={3}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-ring"
          placeholder="Add notes or details..."
        />
      </div>

      {/* Importance */}
      <ImportanceToggle
        important={draft.important}
        onChange={(val) => updateField('important', val)}
      />

      {/* Error */}
      {saveError && (
        <ErrorBanner
          message={saveError}
          onDismiss={clearSaveError}
          onRetry={handleSave}
        />
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-50"
        >
          {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
          Save
        </button>
      </div>
    </div>
  );
}
