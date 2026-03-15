import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBanner } from './ErrorBanner';

describe('ErrorBanner', () => {
  it('renders message and has role alert', () => {
    render(<ErrorBanner message="Something went wrong" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows Retry button when onRetry is provided', () => {
    const onRetry = vi.fn();
    render(<ErrorBanner message="Failed" onRetry={onRetry} />);
    const retry = screen.getByRole('button', { name: /retry/i });
    expect(retry).toBeInTheDocument();
    fireEvent.click(retry);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('shows Dismiss button when onDismiss is provided', () => {
    const onDismiss = vi.fn();
    render(<ErrorBanner message="Failed" onDismiss={onDismiss} />);
    const dismiss = screen.getByRole('button', { name: /dismiss error/i });
    expect(dismiss).toBeInTheDocument();
    fireEvent.click(dismiss);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('renders both Retry and Dismiss when both handlers provided', () => {
    render(
      <ErrorBanner
        message="Error"
        onRetry={vi.fn()}
        onDismiss={vi.fn()}
      />
    );
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /dismiss error/i })).toBeInTheDocument();
  });
});
