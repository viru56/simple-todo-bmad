import { useState, useEffect, useCallback } from 'react';
import type { Todo, UpdateTodoInput } from '@simple-todo-bmad/shared';

export interface DraftState {
  text: string;
  category: string | null;
  description: string | null;
  dueDate: string | null;
  important: boolean;
}

export function useEditTodoDraft(todo: Todo | null) {
  const [draft, setDraft] = useState<DraftState>({
    text: '',
    category: null,
    description: null,
    dueDate: null,
    important: false,
  });

  useEffect(() => {
    if (todo) {
      setDraft({
        text: todo.text,
        category: todo.category,
        description: todo.description,
        dueDate: todo.dueDate ? todo.dueDate.split('T')[0] : null,
        important: todo.important,
      });
    }
  }, [todo]);

  const updateField = useCallback(
    <K extends keyof DraftState>(field: K, value: DraftState[K]) => {
      setDraft((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const getChanges = useCallback((): UpdateTodoInput | null => {
    if (!todo) return null;

    const changes: UpdateTodoInput = {};
    let hasChanges = false;

    if (draft.text.trim() !== todo.text) {
      changes.text = draft.text.trim();
      hasChanges = true;
    }
    if (draft.category !== todo.category) {
      changes.category = draft.category;
      hasChanges = true;
    }
    if (draft.description !== todo.description) {
      changes.description = draft.description || null;
      hasChanges = true;
    }
    if (draft.important !== todo.important) {
      changes.important = draft.important;
      hasChanges = true;
    }

    const todoDueDate = todo.dueDate ? todo.dueDate.split('T')[0] : null;
    if (draft.dueDate !== todoDueDate) {
      changes.dueDate = draft.dueDate
        ? new Date(draft.dueDate + 'T00:00:00').toISOString()
        : null;
      hasChanges = true;
    }

    return hasChanges ? changes : null;
  }, [draft, todo]);

  return { draft, updateField, getChanges };
}
