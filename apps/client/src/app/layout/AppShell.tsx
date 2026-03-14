import { useEffect } from 'react';
import { MainHeader } from './MainHeader';
import { CreateTodoInput } from '../../features/capture/components/CreateTodoInput';
import { ViewTabs } from '../../features/filters/components/ViewTabs';
import { CategoryFilter } from '../../features/filters/components/CategoryFilter';
import { TodoList } from '../../features/todos/components/TodoList';
import { EditTodoDrawer } from '../../features/edit-todo/components/EditTodoDrawer';
import { useTodoStore } from '../../store/todoStore';

export function AppShell() {
  const fetchTodos = useTodoStore((s) => s.fetchTodos);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <main className="mx-auto max-w-2xl space-y-4 px-4 py-6">
        <CreateTodoInput />
        <ViewTabs />
        <CategoryFilter />
        <div id="tabpanel-all" role="tabpanel">
          <TodoList />
        </div>
      </main>
      <EditTodoDrawer />
    </div>
  );
}
