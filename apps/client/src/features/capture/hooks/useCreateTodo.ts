import { useState, useCallback, useRef } from 'react';
import { useTodoStore } from '../../../store/todoStore';

export function useCreateTodo() {
  const [inputText, setInputText] = useState('');
  const pendingTextRef = useRef('');
  const createTodo = useTodoStore((s) => s.createTodo);
  const isCreating = useTodoStore((s) => s.isCreating);
  const createError = useTodoStore((s) => s.createError);
  const clearCreateError = useTodoStore((s) => s.clearCreateError);

  const handleSubmit = useCallback(async () => {
    const text = inputText.trim();
    if (!text) return;

    pendingTextRef.current = text;
    setInputText('');
    clearCreateError();

    try {
      await createTodo(text);
      pendingTextRef.current = '';
    } catch {
      setInputText(pendingTextRef.current);
    }
  }, [inputText, createTodo, clearCreateError]);

  return {
    inputText,
    setInputText,
    handleSubmit,
    isCreating,
    createError,
    clearCreateError,
  };
}
