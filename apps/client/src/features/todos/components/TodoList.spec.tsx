import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Todo } from '@simple-todo-bmad/shared';
import type { TodoStore } from '../../../store/types';
import { ViewName } from '../../../lib/constants';
import { useTodoStore } from '../../../store/todoStore';
import { TodoList } from './TodoList';

const mockTodo = {
  id: '1',
  text: 'Test todo',
  completed: false,
  important: false,
  category: null,
  dueDate: null,
  description: null,
  createdAt: new Date().toISOString(),
  completedAt: null,
};

const defaultState = {
  isLoading: false,
  loadError: null,
  fetchTodos: vi.fn(),
  activeView: 'all' as const,
  setEditingTodoId: vi.fn(),
  todos: [mockTodo],
  categoryFilter: null,
  editingTodoId: null,
  itemLoadingIds: new Set<string>(),
  itemErrors: new Map<string, string>(),
  createError: null,
  isCreating: false,
  isSaving: false,
  saveError: null,
  clearItemError: vi.fn(),
  completeTodo: vi.fn(),
  reopenTodo: vi.fn(),
  deleteTodo: vi.fn(),
  createTodo: vi.fn(),
  updateTodo: vi.fn(),
  setActiveView: vi.fn(),
  setCategoryFilter: vi.fn(),
  clearCreateError: vi.fn(),
  clearSaveError: vi.fn(),
};

vi.mock('../../../store/todoStore', () => ({
  useTodoStore: vi.fn(),
}));

describe('TodoList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTodoStore).mockImplementation((selector) => selector(defaultState as TodoStore));
  });

  it('renders list of todos when there are items', () => {
    render(<TodoList />);
    expect(screen.getByRole('list', { name: /all todos/i })).toBeInTheDocument();
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('renders todo item with edit affordance', () => {
    render(<TodoList />);
    expect(
      screen.getByRole('button', { name: /edit todo: test todo/i })
    ).toBeInTheDocument();
  });

  it('shows loading state when isLoading is true', () => {
    vi.mocked(useTodoStore).mockImplementation((selector) =>
      selector({
        ...defaultState, isLoading: true,
        editingTodoId: null,
        createError: null,
        isCreating: false,
        isSaving: false,
        saveError: null,
        createTodo: function (text: string): Promise<void> {
          throw new Error('Function not implemented.');
        },
        updateTodo: function (id: string, updates: Partial<Todo>): Promise<Todo | null> {
          throw new Error('Function not implemented.');
        },
        setActiveView: function (view: ViewName): void {
          throw new Error('Function not implemented.');
        },
        setCategoryFilter: function (category: string | null): void {
          throw new Error('Function not implemented.');
        },
        clearCreateError: function (): void {
          throw new Error('Function not implemented.');
        },
        clearSaveError: function (): void {
          throw new Error('Function not implemented.');
        }
      })
    );
    render(<TodoList />);
    expect(screen.getByText('Loading todos...')).toBeInTheDocument();
  });

  it('shows error banner and retry when loadError is set', () => {
    const fetchTodos = vi.fn();
    vi.mocked(useTodoStore).mockImplementation((selector) =>
      selector({
        ...defaultState, loadError: 'Failed to load', fetchTodos,
        editingTodoId: null,
        createError: null,
        isCreating: false,
        isSaving: false,
        saveError: null,
        createTodo: function (text: string): Promise<void> {
          throw new Error('Function not implemented.');
        },
        updateTodo: function (id: string, updates: Partial<Todo>): Promise<Todo | null> {
          throw new Error('Function not implemented.');
        },
        setActiveView: function (view: ViewName): void {
          throw new Error('Function not implemented.');
        },
        setCategoryFilter: function (category: string | null): void {
          throw new Error('Function not implemented.');
        },
        clearCreateError: function (): void {
          throw new Error('Function not implemented.');
        },
        clearSaveError: function (): void {
          throw new Error('Function not implemented.');
        }
      })
    );
    render(<TodoList />);
    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load');
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('shows empty state when no todos', () => {
    vi.mocked(useTodoStore).mockImplementation((selector) =>
      selector({
        ...defaultState, todos: [],
        editingTodoId: null,
        createError: null,
        isCreating: false,
        isSaving: false,
        saveError: null,
        createTodo: function (text: string): Promise<void> {
          throw new Error('Function not implemented.');
        },
        updateTodo: function (id: string, updates: Partial<Todo>): Promise<Todo | null> {
          throw new Error('Function not implemented.');
        },
        setActiveView: function (view: ViewName): void {
          throw new Error('Function not implemented.');
        },
        setCategoryFilter: function (category: string | null): void {
          throw new Error('Function not implemented.');
        },
        clearCreateError: function (): void {
          throw new Error('Function not implemented.');
        },
        clearSaveError: function (): void {
          throw new Error('Function not implemented.');
        }
      })
    );
    render(<TodoList />);
    expect(screen.getByText('No todos yet')).toBeInTheDocument();
  });
});
