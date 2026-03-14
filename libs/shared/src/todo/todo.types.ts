export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  important: boolean;
  category: string | null;
  dueDate: string | null;
  description: string | null;
  createdAt: string;
  completedAt: string | null;
}

export interface CreateTodoInput {
  text: string;
}

export interface UpdateTodoInput {
  text?: string;
  completed?: boolean;
  important?: boolean;
  category?: string | null;
  dueDate?: string | null;
  description?: string | null;
}
