import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from './TodoItem';

const mockTodo = {
  id: 'todo-1',
  text: 'Buy milk',
  completed: false,
  important: false,
  category: null,
  dueDate: null,
  description: null,
  createdAt: new Date().toISOString(),
  completedAt: null,
};

const completeTodo = vi.fn();
const reopenTodo = vi.fn();
const deleteTodo = vi.fn();
const clearItemError = vi.fn();

const defaultStoreState = {
  completeTodo,
  reopenTodo,
  deleteTodo,
  clearItemError,
  itemLoadingIds: new Set<string>(),
  itemErrors: new Map<string, string>(),
};

vi.mock('../../../store/todoStore', () => ({
  useTodoStore: (selector: (s: Record<string, unknown>) => unknown) =>
    selector(defaultStoreState),
}));

describe('TodoItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders todo text and edit button', () => {
    render(<TodoItem todo={mockTodo} onEdit={vi.fn()} />);
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit todo: buy milk/i })).toBeInTheDocument();
  });

  it('calls onEdit when main area is clicked', () => {
    const onEdit = vi.fn();
    render(<TodoItem todo={mockTodo} onEdit={onEdit} />);
    fireEvent.click(screen.getByRole('button', { name: /edit todo: buy milk/i }));
    expect(onEdit).toHaveBeenCalledWith('todo-1');
  });

  it('calls onEdit when Enter is pressed on main area', () => {
    const onEdit = vi.fn();
    render(<TodoItem todo={mockTodo} onEdit={onEdit} />);
    const main = screen.getByRole('button', { name: /edit todo: buy milk/i });
    fireEvent.keyDown(main, { key: 'Enter' });
    expect(onEdit).toHaveBeenCalledWith('todo-1');
  });

  it('shows Complete button and calls completeTodo when clicked', () => {
    render(<TodoItem todo={mockTodo} onEdit={vi.fn()} />);
    const completeBtn = screen.getByRole('button', { name: /complete: buy milk/i });
    fireEvent.click(completeBtn);
    expect(completeTodo).toHaveBeenCalledWith('todo-1');
  });

  it('shows Reopen and Delete for completed todo', () => {
    const completed = { ...mockTodo, completed: true, completedAt: new Date().toISOString() };
    render(<TodoItem todo={completed} onEdit={vi.fn()} />);
    const reopenButtons = screen.getAllByRole('button', { name: /reopen: buy milk/i });
    expect(reopenButtons.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('button', { name: /delete: buy milk/i })).toBeInTheDocument();
  });

  it('calls deleteTodo when delete is clicked', () => {
    render(<TodoItem todo={mockTodo} onEdit={vi.fn()} />);
    const deleteBtn = screen.getByRole('button', { name: /delete: buy milk/i });
    fireEvent.click(deleteBtn);
    expect(deleteTodo).toHaveBeenCalledWith('todo-1');
  });

  it('shows error banner when item has error', () => {
    defaultStoreState.itemErrors = new Map([['todo-1', 'Update failed']]);
    render(<TodoItem todo={mockTodo} onEdit={vi.fn()} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Update failed');
    defaultStoreState.itemErrors = new Map();
  });

  it('does not call onEdit when Complete button is clicked', () => {
    const onEdit = vi.fn();
    render(<TodoItem todo={mockTodo} onEdit={onEdit} />);
    fireEvent.click(screen.getByRole('button', { name: /complete: buy milk/i }));
    expect(onEdit).not.toHaveBeenCalled();
    expect(completeTodo).toHaveBeenCalledWith('todo-1');
  });

  it('shows loading spinner when item is loading', () => {
    defaultStoreState.itemLoadingIds = new Set(['todo-1']);
    render(<TodoItem todo={mockTodo} onEdit={vi.fn()} />);
    expect(screen.getByRole('button', { name: /complete: buy milk/i })).toBeDisabled();
    defaultStoreState.itemLoadingIds = new Set();
  });

  it('shows Important badge when todo is important and not completed', () => {
    const importantTodo = { ...mockTodo, important: true };
    render(<TodoItem todo={importantTodo} onEdit={vi.fn()} />);
    expect(screen.getByText('Important')).toBeInTheDocument();
  });

  it('shows category badge when todo has category', () => {
    const withCategory = { ...mockTodo, category: 'work' };
    render(<TodoItem todo={withCategory} onEdit={vi.fn()} />);
    expect(screen.getByText('work')).toBeInTheDocument();
  });

  it('shows Due date when todo is expiring', () => {
    const dueSoon = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();
    const expiringTodo = { ...mockTodo, dueDate: dueSoon };
    render(<TodoItem todo={expiringTodo} onEdit={vi.fn()} />);
    expect(screen.getByText(/Due/)).toBeInTheDocument();
  });

  it('calls clearItemError and completeTodo when ErrorBanner Retry is clicked', () => {
    defaultStoreState.itemErrors = new Map([['todo-1', 'Failed']]);
    render(<TodoItem todo={mockTodo} onEdit={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(clearItemError).toHaveBeenCalledWith('todo-1');
    expect(completeTodo).toHaveBeenCalledWith('todo-1');
    defaultStoreState.itemErrors = new Map();
  });

  it('calls reopenTodo when Reopen button is clicked on completed todo', () => {
    const completed = { ...mockTodo, completed: true, completedAt: new Date().toISOString() };
    render(<TodoItem todo={completed} onEdit={vi.fn()} />);
    const reopenButtons = screen.getAllByRole('button', { name: /reopen: buy milk/i });
    fireEvent.click(reopenButtons[0]);
    expect(reopenTodo).toHaveBeenCalledWith('todo-1');
  });

  it('calls reopenTodo when Reopen action button (data-action=reopen) is clicked', () => {
    const completed = { ...mockTodo, completed: true, completedAt: new Date().toISOString() };
    render(<TodoItem todo={completed} onEdit={vi.fn()} />);
    const reopenButtons = screen.getAllByRole('button', { name: /reopen: buy milk/i });
    fireEvent.click(reopenButtons[1]);
    expect(reopenTodo).toHaveBeenCalledWith('todo-1');
  });

  it('calls reopenTodo on ErrorBanner Retry when todo is completed', () => {
    const completed = { ...mockTodo, completed: true, completedAt: new Date().toISOString() };
    defaultStoreState.itemErrors = new Map([['todo-1', 'Failed']]);
    render(<TodoItem todo={completed} onEdit={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(clearItemError).toHaveBeenCalledWith('todo-1');
    expect(reopenTodo).toHaveBeenCalledWith('todo-1');
    defaultStoreState.itemErrors = new Map();
  });

  it('calls deleteTodo when Delete is clicked on completed todo', () => {
    const completed = { ...mockTodo, completed: true, completedAt: new Date().toISOString() };
    render(<TodoItem todo={completed} onEdit={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /delete: buy milk/i }));
    expect(deleteTodo).toHaveBeenCalledWith('todo-1');
  });
});
