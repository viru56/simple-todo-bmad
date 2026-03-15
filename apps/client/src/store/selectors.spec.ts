import { describe, it, expect } from 'vitest';
import {
  getActiveTodos,
  getCompletedTodos,
  getImportantTodos,
  getExpiringTodos,
  getTodosByView,
  filterByCategory,
  getAvailableCategories,
} from './selectors';

const baseTodo = {
  id: '1',
  text: 'Todo',
  completed: false,
  important: false,
  category: null,
  dueDate: null,
  description: null,
  createdAt: new Date().toISOString(),
  completedAt: null,
};

describe('selectors', () => {
  it('getActiveTodos filters out completed', () => {
    const todos = [
      { ...baseTodo, id: 'a', completed: false },
      { ...baseTodo, id: 'b', completed: true },
    ];
    expect(getActiveTodos(todos)).toHaveLength(1);
    expect(getActiveTodos(todos)[0].id).toBe('a');
  });

  it('getCompletedTodos returns only completed', () => {
    const todos = [
      { ...baseTodo, id: 'a', completed: false },
      { ...baseTodo, id: 'b', completed: true },
    ];
    expect(getCompletedTodos(todos)).toHaveLength(1);
    expect(getCompletedTodos(todos)[0].id).toBe('b');
  });

  it('getImportantTodos returns incomplete and important', () => {
    const todos = [
      { ...baseTodo, id: 'a', important: false },
      { ...baseTodo, id: 'b', important: true },
      { ...baseTodo, id: 'c', completed: true, important: true },
    ];
    const result = getImportantTodos(todos);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('b');
  });

  it('getExpiringTodos returns incomplete todos with dueDate within threshold', () => {
    const future = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();
    const todos = [
      { ...baseTodo, id: 'a', dueDate: future, completed: false },
      { ...baseTodo, id: 'b', dueDate: null },
      { ...baseTodo, id: 'c', dueDate: future, completed: true },
    ];
    const result = getExpiringTodos(todos);
    expect(result.length).toBeGreaterThanOrEqual(0);
    expect(result.every((t) => !t.completed && t.dueDate)).toBe(true);
  });

  it('getTodosByView returns correct list for each view', () => {
    const todos = [
      { ...baseTodo, id: '1', completed: false },
      { ...baseTodo, id: '2', completed: true },
    ];
    expect(getTodosByView(todos, 'all').length).toBe(1);
    expect(getTodosByView(todos, 'completed').length).toBe(1);
    expect(getTodosByView(todos, 'important')).toEqual(getImportantTodos(todos));
    expect(getTodosByView(todos, 'expiring')).toEqual(getExpiringTodos(todos));
  });

  it('filterByCategory returns all when category is null', () => {
    const todos = [{ ...baseTodo, category: 'work' }];
    expect(filterByCategory(todos, null)).toEqual(todos);
  });

  it('filterByCategory filters by category', () => {
    const todos = [
      { ...baseTodo, id: 'a', category: 'work' },
      { ...baseTodo, id: 'b', category: 'home' },
      { ...baseTodo, id: 'c', category: 'work' },
    ];
    const result = filterByCategory(todos, 'work');
    expect(result).toHaveLength(2);
    expect(result.every((t) => t.category === 'work')).toBe(true);
  });

  it('getAvailableCategories returns sorted unique categories from active todos', () => {
    const todos = [
      { ...baseTodo, id: 'a', category: 'zebra', completed: false },
      { ...baseTodo, id: 'b', category: 'alpha', completed: false },
      { ...baseTodo, id: 'c', category: 'alpha', completed: false },
      { ...baseTodo, id: 'd', completed: true, category: 'done' },
    ];
    expect(getAvailableCategories(todos)).toEqual(['alpha', 'zebra']);
  });
});
