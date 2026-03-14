interface PrismaTodo {
  id: string;
  text: string;
  completed: boolean;
  important: boolean;
  category: string | null;
  due_date: Date | null;
  description: string | null;
  created_at: Date;
  completed_at: Date | null;
}

export interface TodoResponse {
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

export function toTodoResponse(todo: PrismaTodo): TodoResponse {
  return {
    id: todo.id,
    text: todo.text,
    completed: todo.completed,
    important: todo.important,
    category: todo.category,
    dueDate: todo.due_date?.toISOString() ?? null,
    description: todo.description,
    createdAt: todo.created_at.toISOString(),
    completedAt: todo.completed_at?.toISOString() ?? null,
  };
}
