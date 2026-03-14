import { apiClient } from './apiClient';
import type { Todo, CreateTodoInput, UpdateTodoInput } from '@simple-todo-bmad/shared';

export const todoApi = {
  fetchAll(): Promise<Todo[]> {
    return apiClient.get<Todo[]>('/todos');
  },

  create(input: CreateTodoInput): Promise<Todo> {
    return apiClient.post<Todo>('/todos', input);
  },

  update(id: string, input: UpdateTodoInput): Promise<Todo> {
    return apiClient.patch<Todo>(`/todos/${id}`, input);
  },

  delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/todos/${id}`);
  },
};
