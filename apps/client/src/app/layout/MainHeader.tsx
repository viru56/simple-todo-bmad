import { CheckSquare } from 'lucide-react';

export function MainHeader() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-2xl items-center gap-2 px-4 py-3">
        <CheckSquare className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold text-foreground">Simple Todo</h1>
      </div>
    </header>
  );
}
