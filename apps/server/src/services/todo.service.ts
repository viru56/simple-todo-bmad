import { todoRepository } from '../repositories/todo.repository';
import { toTodoResponse, TodoResponse } from '../mappers/todo.mapper';
import { AppError } from '../errors/appError';
import { ErrorCodes } from '../errors/errorCodes';

export const todoService = {
  async getAll(): Promise<TodoResponse[]> {
    const todos = await todoRepository.findAll();
    return todos.map(toTodoResponse);
  },

  async getById(id: string): Promise<TodoResponse> {
    const todo = await todoRepository.findById(id);
    if (!todo) {
      throw new AppError(404, ErrorCodes.NOT_FOUND, `Todo with id '${id}' not found`);
    }
    return toTodoResponse(todo);
  },

  async create(input: { text: string }): Promise<TodoResponse> {
    const todo = await todoRepository.create({ text: input.text.trim() });
    return toTodoResponse(todo);
  },

  async update(
    id: string,
    input: {
      text?: string;
      completed?: boolean;
      important?: boolean;
      category?: string | null;
      dueDate?: string | null;
      description?: string | null;
    }
  ): Promise<TodoResponse> {
    const existing = await todoRepository.findById(id);
    if (!existing) {
      throw new AppError(404, ErrorCodes.NOT_FOUND, `Todo with id '${id}' not found`);
    }

    const updateData: Record<string, unknown> = {};

    if (input.text !== undefined) {
      updateData.text = input.text.trim();
    }

    if (input.completed !== undefined) {
      updateData.completed = input.completed;
      updateData.completed_at = input.completed ? new Date() : null;
    }

    if (input.important !== undefined) {
      updateData.important = input.important;
    }

    if (input.category !== undefined) {
      updateData.category = input.category;
    }

    if (input.dueDate !== undefined) {
      updateData.due_date = input.dueDate ? new Date(input.dueDate) : null;
    }

    if (input.description !== undefined) {
      updateData.description = input.description;
    }

    const updated = await todoRepository.update(id, updateData);
    return toTodoResponse(updated);
  },

  async delete(id: string): Promise<void> {
    const existing = await todoRepository.findById(id);
    if (!existing) {
      throw new AppError(404, ErrorCodes.NOT_FOUND, `Todo with id '${id}' not found`);
    }
    await todoRepository.delete(id);
  },
};
