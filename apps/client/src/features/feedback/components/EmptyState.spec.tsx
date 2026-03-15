import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('shows message for "all" view', () => {
    render(<EmptyState view="all" />);
    expect(screen.getByText('No todos yet')).toBeInTheDocument();
    expect(
      screen.getByText(/Type something above and hit Enter/)
    ).toBeInTheDocument();
  });

  it('shows message for "completed" view', () => {
    render(<EmptyState view="completed" />);
    expect(screen.getByText('No completed todos')).toBeInTheDocument();
  });

  it('shows message for "important" view', () => {
    render(<EmptyState view="important" />);
    expect(screen.getByText('No important todos')).toBeInTheDocument();
  });
});
