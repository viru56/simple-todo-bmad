import { create } from 'zustand';
import type { Todo } from '@simple-todo-bmad/shared';
import type { TodoStore } from './types';
import { todoApi } from '../services/todoApi';
import { getUserFacingError } from '../features/feedback/utils/getUserFacingError';

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  activeView: 'all',
  categoryFilter: null,
  editingTodoId: null,

  isLoading: false,
  loadError: null,
  itemLoadingIds: new Set(),
  itemErrors: new Map(),
  createError: null,
  isCreating: false,
  isSaving: false,
  saveError: null,

  fetchTodos: async () => {
    set({ isLoading: true, loadError: null });
    try {
      const todos = await todoApi.fetchAll();
      set({ todos, isLoading: false });
    } catch (err) {
      set({ isLoading: false, loadError: getUserFacingError(err) });
    }
  },

  createTodo: async (text: string) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticTodo: Todo = {
      id: tempId,
      text,
      completed: false,
      important: false,
      category: null,
      dueDate: null,
      description: null,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };

    set((state) => ({
      todos: [optimisticTodo, ...state.todos],
      isCreating: true,
      createError: null,
    }));

    try {
      const saved = await todoApi.create({ text });
      set((state) => ({
        todos: state.todos.map((t) => (t.id === tempId ? saved : t)),
        isCreating: false,
      }));
    } catch (err) {
      set((state) => ({
        todos: state.todos.filter((t) => t.id !== tempId),
        isCreating: false,
        createError: getUserFacingError(err),
      }));
      throw err;
    }
  },

  updateTodo: async (id: string, updates: Partial<Todo>) => {
    const previous = get().todos.find((t) => t.id === id);
    if (!previous) return null;

    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
      isSaving: true,
      saveError: null,
    }));

    try {
      const saved = await todoApi.update(id, updates);
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? saved : t)),
        isSaving: false,
      }));
      return saved;
    } catch (err) {
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? previous : t)),
        isSaving: false,
        saveError: getUserFacingError(err),
      }));
      return null;
    }
  },

  completeTodo: async (id: string) => {
    const previous = get().todos.find((t) => t.id === id);
    if (!previous) return;

    const addLoading = new Set(get().itemLoadingIds);
    addLoading.add(id);

    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id
          ? { ...t, completed: true, completedAt: new Date().toISOString() }
          : t
      ),
      itemLoadingIds: addLoading,
    }));

    try {
      const saved = await todoApi.update(id, { completed: true });
      const removeLoading = new Set(get().itemLoadingIds);
      removeLoading.delete(id);
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? saved : t)),
        itemLoadingIds: removeLoading,
      }));
    } catch (err) {
      const removeLoading = new Set(get().itemLoadingIds);
      removeLoading.delete(id);
      const newErrors = new Map(get().itemErrors);
      newErrors.set(id, getUserFacingError(err));
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? previous : t)),
        itemLoadingIds: removeLoading,
        itemErrors: newErrors,
      }));
    }
  },

  reopenTodo: async (id: string) => {
    const previous = get().todos.find((t) => t.id === id);
    if (!previous) return;

    const addLoading = new Set(get().itemLoadingIds);
    addLoading.add(id);

    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, completed: false, completedAt: null } : t
      ),
      itemLoadingIds: addLoading,
    }));

    try {
      const saved = await todoApi.update(id, { completed: false });
      const removeLoading = new Set(get().itemLoadingIds);
      removeLoading.delete(id);
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? saved : t)),
        itemLoadingIds: removeLoading,
      }));
    } catch (err) {
      const removeLoading = new Set(get().itemLoadingIds);
      removeLoading.delete(id);
      const newErrors = new Map(get().itemErrors);
      newErrors.set(id, getUserFacingError(err));
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? previous : t)),
        itemLoadingIds: removeLoading,
        itemErrors: newErrors,
      }));
    }
  },

  deleteTodo: async (id: string) => {
    const previous = get().todos.find((t) => t.id === id);
    if (!previous) return;

    const addLoading = new Set(get().itemLoadingIds);
    addLoading.add(id);

    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
      itemLoadingIds: addLoading,
    }));

    try {
      await todoApi.delete(id);
      const removeLoading = new Set(get().itemLoadingIds);
      removeLoading.delete(id);
      set({ itemLoadingIds: removeLoading });
    } catch (err) {
      const removeLoading = new Set(get().itemLoadingIds);
      removeLoading.delete(id);
      const newErrors = new Map(get().itemErrors);
      newErrors.set(id, getUserFacingError(err));
      set((state) => ({
        todos: [previous, ...state.todos],
        itemLoadingIds: removeLoading,
        itemErrors: newErrors,
      }));
    }
  },

  setActiveView: (view) => set({ activeView: view }),
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  setEditingTodoId: (id) => set({ editingTodoId: id }),
  clearCreateError: () => set({ createError: null }),
  clearItemError: (id) => {
    const newErrors = new Map(get().itemErrors);
    newErrors.delete(id);
    set({ itemErrors: newErrors });
  },
  clearSaveError: () => set({ saveError: null }),
}));
