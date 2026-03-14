import type { Todo } from '@simple-todo-bmad/shared';
import type { ViewName } from '../lib/constants';

export interface TodoState {
  todos: Todo[];
  activeView: ViewName;
  categoryFilter: string | null;
  editingTodoId: string | null;

  isLoading: boolean;
  loadError: string | null;
  itemLoadingIds: Set<string>;
  itemErrors: Map<string, string>;
  createError: string | null;
  isCreating: boolean;
  isSaving: boolean;
  saveError: string | null;
}

export interface TodoActions {
  fetchTodos: () => Promise<void>;
  createTodo: (text: string) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<Todo | null>;
  completeTodo: (id: string) => Promise<void>;
  reopenTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;

  setActiveView: (view: ViewName) => void;
  setCategoryFilter: (category: string | null) => void;
  setEditingTodoId: (id: string | null) => void;
  clearCreateError: () => void;
  clearItemError: (id: string) => void;
  clearSaveError: () => void;
}

export type TodoStore = TodoState & TodoActions;
