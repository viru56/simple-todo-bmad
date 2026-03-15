import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingState } from './LoadingState';

describe('LoadingState', () => {
  it('renders loading message for screen readers', () => {
    render(<LoadingState />);
    expect(screen.getByText('Loading todos...')).toBeInTheDocument();
  });
});
