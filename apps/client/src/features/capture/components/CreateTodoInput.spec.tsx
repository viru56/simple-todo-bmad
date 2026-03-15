import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useCreateTodo } from '../hooks/useCreateTodo';
import { CreateTodoInput } from './CreateTodoInput';

const mockHandleSubmit = vi.fn();
const mockClearCreateError = vi.fn();

vi.mock('../hooks/useCreateTodo', () => ({
  useCreateTodo: vi.fn(),
}));

describe('CreateTodoInput', () => {
  beforeEach(() => {
    vi.mocked(useCreateTodo).mockReturnValue({
      inputText: '',
      setInputText: vi.fn(),
      handleSubmit: mockHandleSubmit,
      isCreating: false,
      createError: null,
      clearCreateError: mockClearCreateError,
    });
  });

  it('renders input and Add button', () => {
    render(<CreateTodoInput />);
    expect(
      screen.getByRole('textbox', { name: /new todo text/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
  });

  it('has correct placeholder', () => {
    render(<CreateTodoInput />);
    expect(
      screen.getByPlaceholderText('What needs to be done?')
    ).toBeInTheDocument();
  });

  it('calls handleSubmit when Add button is clicked', () => {
    mockHandleSubmit.mockResolvedValue(undefined);
    render(<CreateTodoInput />);
    fireEvent.click(screen.getByRole('button', { name: /add todo/i }));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('calls handleSubmit when Enter is pressed in input', () => {
    mockHandleSubmit.mockResolvedValue(undefined);
    render(<CreateTodoInput />);
    const input = screen.getByRole('textbox', { name: /new todo text/i });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('shows error banner when createError is set', () => {
    vi.mocked(useCreateTodo).mockReturnValue({
      inputText: '',
      setInputText: vi.fn(),
      handleSubmit: mockHandleSubmit,
      isCreating: false,
      createError: 'Network error',
      clearCreateError: mockClearCreateError,
    });
    render(<CreateTodoInput />);
    expect(screen.getByRole('alert')).toHaveTextContent('Network error');
  });

  it('calls setInputText when input value changes', () => {
    const setInputText = vi.fn();
    vi.mocked(useCreateTodo).mockReturnValue({
      inputText: '',
      setInputText,
      handleSubmit: mockHandleSubmit,
      isCreating: false,
      createError: null,
      clearCreateError: mockClearCreateError,
    });
    render(<CreateTodoInput />);
    fireEvent.change(screen.getByRole('textbox', { name: /new todo text/i }), {
      target: { value: 'new task' },
    });
    expect(setInputText).toHaveBeenCalledWith('new task');
  });

  it('calls clearCreateError when error banner Dismiss is clicked', () => {
    vi.mocked(useCreateTodo).mockReturnValue({
      inputText: '',
      setInputText: vi.fn(),
      handleSubmit: mockHandleSubmit,
      isCreating: false,
      createError: 'Error',
      clearCreateError: mockClearCreateError,
    });
    render(<CreateTodoInput />);
    fireEvent.click(screen.getByRole('button', { name: /dismiss error/i }));
    expect(mockClearCreateError).toHaveBeenCalled();
  });

  it('calls handleSubmit when error banner Retry is clicked', () => {
    mockHandleSubmit.mockResolvedValue(undefined);
    vi.mocked(useCreateTodo).mockReturnValue({
      inputText: '',
      setInputText: vi.fn(),
      handleSubmit: mockHandleSubmit,
      isCreating: false,
      createError: 'Error',
      clearCreateError: mockClearCreateError,
    });
    render(<CreateTodoInput />);
    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
