import { describe, it, expect } from 'vitest';
import { isTodoExpiring } from './isTodoExpiring';

const base = {
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

describe('isTodoExpiring', () => {
  it('returns false when todo is completed', () => {
    expect(
      isTodoExpiring({ ...base, completed: true, dueDate: new Date().toISOString() })
    ).toBe(false);
  });

  it('returns false when dueDate is null', () => {
    expect(isTodoExpiring({ ...base, dueDate: null })).toBe(false);
  });

  it('returns true when not completed and dueDate within threshold', () => {
    const due = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString();
    expect(isTodoExpiring({ ...base, dueDate: due })).toBe(true);
  });
});
