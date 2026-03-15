import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useTodoStore } from '../../../store/todoStore';
import type { TodoStore } from '../../../store/types';
import { useVisibleTodos } from './useVisibleTodos';

const baseTodo = {
  id: '1',
  text: 'T',
  completed: false,
  important: false,
  category: null,
  dueDate: null,
  description: null,
  createdAt: new Date().toISOString(),
  completedAt: null,
};

function TestHarness() {
  const visible = useVisibleTodos();
  return (
    <div>
      <span data-testid="count">{visible.length}</span>
      {visible.map((t) => (
        <span key={t.id} data-testid="todo-id">
          {t.id}
        </span>
      ))}
    </div>
  );
}

vi.mock('../../../store/todoStore', () => ({
  useTodoStore: vi.fn(),
}));

describe('useVisibleTodos', () => {
  it('returns active todos for view "all"', () => {
    const todos = [
      { ...baseTodo, id: 'a', completed: false },
      { ...baseTodo, id: 'b', completed: true },
    ];
    vi.mocked(useTodoStore).mockImplementation((selector: (s: TodoStore) => unknown) =>
      selector({ todos, activeView: 'all', categoryFilter: null } as TodoStore)
    );
    render(<TestHarness />);
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('todo-id')).toHaveTextContent('a');
  });

  it('returns completed todos for view "completed"', () => {
    const todos = [
      { ...baseTodo, id: 'a', completed: false },
      { ...baseTodo, id: 'b', completed: true, completedAt: new Date().toISOString() },
    ];
    vi.mocked(useTodoStore).mockImplementation((selector: (s: TodoStore) => unknown) =>
      selector({ todos, activeView: 'completed', categoryFilter: null } as TodoStore)
    );
    render(<TestHarness />);
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('todo-id')).toHaveTextContent('b');
  });

  it('filters by category when categoryFilter is set and view is not completed', () => {
    const todos = [
      { ...baseTodo, id: 'a', category: 'work' },
      { ...baseTodo, id: 'b', category: 'home' },
    ];
    vi.mocked(useTodoStore).mockImplementation((selector: (s: TodoStore) => unknown) =>
      selector({ todos, activeView: 'all', categoryFilter: 'work' } as TodoStore)
    );
    render(<TestHarness />);
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('todo-id')).toHaveTextContent('a');
  });
});
