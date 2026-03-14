import { FastifyInstance, FastifyRequest } from 'fastify';
import { todoService } from '../../services/todo.service';
import {
  getTodosSchema,
  createTodoSchema,
  updateTodoSchema,
  deleteTodoSchema,
} from './todos.schema';

export default async function todosRoute(fastify: FastifyInstance) {
  fastify.get('/todos', {
    schema: getTodosSchema,
    handler: async () => {
      return todoService.getAll();
    },
  });

  fastify.post('/todos', {
    schema: createTodoSchema,
    handler: async (
      request: FastifyRequest<{ Body: { text: string } }>,
      reply
    ) => {
      const todo = await todoService.create({ text: request.body.text });
      return reply.status(201).send(todo);
    },
  });

  fastify.patch('/todos/:id', {
    schema: updateTodoSchema,
    handler: async (
      request: FastifyRequest<{
        Params: { id: string };
        Body: {
          text?: string;
          completed?: boolean;
          important?: boolean;
          category?: string | null;
          dueDate?: string | null;
          description?: string | null;
        };
      }>
    ) => {
      return todoService.update(request.params.id, request.body);
    },
  });

  fastify.delete('/todos/:id', {
    schema: deleteTodoSchema,
    handler: async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply
    ) => {
      await todoService.delete(request.params.id);
      return reply.status(204).send();
    },
  });
}
