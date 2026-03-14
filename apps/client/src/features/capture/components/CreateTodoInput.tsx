import { useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import { useCreateTodo } from '../hooks/useCreateTodo';
import { ErrorBanner } from '../../feedback/components/ErrorBanner';

function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function CreateTodoInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    inputText,
    setInputText,
    handleSubmit,
    createError,
    clearCreateError,
  } = useCreateTodo();

  useEffect(() => {
    if (!isMobile() && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const refocusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="What needs to be done?"
          aria-label="New todo text"
          className="flex-1 rounded-md border border-input bg-background px-4 py-3 text-base placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
        />
        <button
          type="button"
          onClick={() => {
            handleSubmit().then(refocusInput);
          }}
          aria-label="Add todo"
          className="inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-ring"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      {createError && (
        <ErrorBanner
          message={createError}
          onDismiss={clearCreateError}
          onRetry={() => handleSubmit().then(refocusInput)}
        />
      )}
    </div>
  );
}
