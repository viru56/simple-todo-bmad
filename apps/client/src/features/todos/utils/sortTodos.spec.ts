import { describe, it, expect } from 'vitest';
import { sortByNewest, sortByCompletedAt } from './sortTodos';

const base = {
  id: '1',
  text: 'T',
  completed: false,
  important: false,
  category: null,
  dueDate: null,
  description: null,
  createdAt: '',
  completedAt: null,
};

describe('sortTodos', () => {
  it('sortByNewest orders by createdAt descending', () => {
    const todos = [
      { ...base, id: 'a', createdAt: '2024-01-01T00:00:00.000Z' },
      { ...base, id: 'b', createdAt: '2024-01-03T00:00:00.000Z' },
      { ...base, id: 'c', createdAt: '2024-01-02T00:00:00.000Z' },
    ];
    const result = sortByNewest(todos);
    expect(result.map((t) => t.id)).toEqual(['b', 'c', 'a']);
  });

  it('sortByCompletedAt orders by completedAt descending', () => {
    const todos = [
      { ...base, id: 'a', completed: true, completedAt: '2024-01-01T12:00:00.000Z' },
      { ...base, id: 'b', completed: true, completedAt: '2024-01-03T12:00:00.000Z' },
      { ...base, id: 'c', completed: true, completedAt: null },
    ];
    const result = sortByCompletedAt(todos);
    expect(result[0].id).toBe('b');
    expect(result[1].id).toBe('a');
    expect(result[2].id).toBe('c');
  });

  it('sortByCompletedAt puts items without completedAt at end', () => {
    const todos = [
      { ...base, id: 'a', completed: true, completedAt: '2024-01-02T12:00:00.000Z' },
      { ...base, id: 'b', completed: true, completedAt: null },
      { ...base, id: 'c', completed: true, completedAt: null },
    ];
    const result = sortByCompletedAt(todos);
    expect(result[0].id).toBe('a');
    expect(result[1].id).toBe('b');
    expect(result[2].id).toBe('c');
  });

  it('sortByCompletedAt orders two items with completedAt by time descending', () => {
    const todos = [
      { ...base, id: 'a', completed: true, completedAt: '2024-01-01T12:00:00.000Z' },
      { ...base, id: 'b', completed: true, completedAt: '2024-01-03T12:00:00.000Z' },
    ];
    const result = sortByCompletedAt(todos);
    expect(result[0].id).toBe('b');
    expect(result[1].id).toBe('a');
  });

  it('sortByCompletedAt puts item without completedAt after item with completedAt', () => {
    const todos = [
      { ...base, id: 'a', completed: true, completedAt: '2024-01-02T12:00:00.000Z' },
      { ...base, id: 'b', completed: true, completedAt: null },
    ];
    const result = sortByCompletedAt(todos);
    expect(result[0].id).toBe('a');
    expect(result[1].id).toBe('b');
  });
});
