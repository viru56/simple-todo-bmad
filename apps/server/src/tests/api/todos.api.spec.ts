/**
 * API tests for health and todos endpoints.
 * Uses Fastify inject() – no HTTP server needed.
 * Todo service is mocked so tests pass without a database.
 */
// Ensure DATABASE_URL is set before any app code loads (required by config/env)
process.env.DATABASE_URL =
  process.env.TEST_DATABASE_URL ||
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/todo_test';

import { beforeAll, afterAll, beforeEach, vi, describe, it, expect } from 'vitest';
import { buildServer } from '../../app/buildServer';
import { disconnectPrisma } from '../../lib/prisma';
import { todoService } from '../../services/todo.service';
import { AppError } from '../../errors/appError';
import { ErrorCodes } from '../../errors/errorCodes';
import type { FastifyInstance } from 'fastify';

vi.mock('../../services/todo.service', () => ({
  todoService: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockTodoResponse = {
  id: '11111111-1111-1111-1111-111111111111',
  text: 'Test todo',
  completed: false,
  important: false,
  category: null,
  dueDate: null,
  description: null,
  createdAt: new Date().toISOString(),
  completedAt: null,
};

describe('API', () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = await buildServer();
  });

  afterAll(async () => {
    await disconnectPrisma();
  });

  beforeEach(() => {
    vi.mocked(todoService.getAll).mockReset();
    vi.mocked(todoService.create).mockReset();
    vi.mocked(todoService.update).mockReset();
    vi.mocked(todoService.delete).mockReset();
  });

  describe('GET /health', () => {
    it('returns 200 and status ok', async () => {
      const res = await server.inject({ method: 'GET', url: '/health' });
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.payload)).toEqual({ status: 'ok' });
    });
  });

  describe('GET /todos', () => {
    it('returns 200 and list of todos', async () => {
      vi.mocked(todoService.getAll).mockResolvedValue([mockTodoResponse]);
      const res = await server.inject({ method: 'GET', url: '/todos' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(Array.isArray(body)).toBe(true);
      expect(body).toHaveLength(1);
      expect(body[0]).toMatchObject({ text: 'Test todo', completed: false });
    });

    it('returns 200 and empty array when no todos', async () => {
      vi.mocked(todoService.getAll).mockResolvedValue([]);
      const res = await server.inject({ method: 'GET', url: '/todos' });
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.payload)).toEqual([]);
    });
  });

  describe('POST /todos', () => {
    it('returns 201 and created todo when body is valid', async () => {
      vi.mocked(todoService.create).mockResolvedValue(mockTodoResponse);
      const res = await server.inject({
        method: 'POST',
        url: '/todos',
        payload: { text: 'New todo' },
      });
      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body).toMatchObject({ text: 'Test todo' });
      expect(todoService.create).toHaveBeenCalledWith({ text: 'New todo' });
    });

    it('returns 400 when text is missing', async () => {
      const res = await server.inject({
        method: 'POST',
        url: '/todos',
        payload: {},
      });
      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.error).toBeDefined();
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });

    it('returns 400 when text is empty string', async () => {
      const res = await server.inject({
        method: 'POST',
        url: '/todos',
        payload: { text: '' },
      });
      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.payload).error).toBeDefined();
    });
  });

  describe('PATCH /todos/:id', () => {
    const id = mockTodoResponse.id;

    it('returns 200 and updated todo', async () => {
      const updated = { ...mockTodoResponse, text: 'Updated', completed: true };
      vi.mocked(todoService.update).mockResolvedValue(updated);
      const res = await server.inject({
        method: 'PATCH',
        url: `/todos/${id}`,
        payload: { text: 'Updated', completed: true },
      });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.text).toBe('Updated');
      expect(body.completed).toBe(true);
      expect(todoService.update).toHaveBeenCalledWith(id, {
        text: 'Updated',
        completed: true,
      });
    });

    it('returns 400 for invalid id format', async () => {
      const res = await server.inject({
        method: 'PATCH',
        url: '/todos/not-a-uuid',
        payload: { completed: true },
      });
      expect(res.statusCode).toBe(400);
    });

    it('returns 404 when todo not found', async () => {
      vi.mocked(todoService.update).mockRejectedValue(
        new AppError(404, ErrorCodes.NOT_FOUND, 'Todo with id \'x\' not found')
      );
      const res = await server.inject({
        method: 'PATCH',
        url: `/todos/${id}`,
        payload: { completed: true },
      });
      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.error.code).toBe('NOT_FOUND');
      expect(body.error.message).toContain('not found');
    });
  });

  describe('DELETE /todos/:id', () => {
    const id = mockTodoResponse.id;

    it('returns 204 when delete succeeds', async () => {
      vi.mocked(todoService.delete).mockResolvedValue(undefined);
      const res = await server.inject({
        method: 'DELETE',
        url: `/todos/${id}`,
      });
      expect(res.statusCode).toBe(204);
      expect(todoService.delete).toHaveBeenCalledWith(id);
    });

    it('returns 400 for invalid id format', async () => {
      const res = await server.inject({
        method: 'DELETE',
        url: '/todos/not-a-uuid',
      });
      expect(res.statusCode).toBe(400);
    });

    it('returns 404 when todo not found', async () => {
      vi.mocked(todoService.delete).mockRejectedValue(
        new AppError(404, ErrorCodes.NOT_FOUND, 'Todo with id \'y\' not found')
      );
      const res = await server.inject({
        method: 'DELETE',
        url: `/todos/${id}`,
      });
      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('Error handler', () => {
    it('returns 500 and INTERNAL_ERROR when service throws generic Error', async () => {
      vi.mocked(todoService.getAll).mockRejectedValue(new Error('Database connection failed'));
      const res = await server.inject({ method: 'GET', url: '/todos' });
      expect(res.statusCode).toBe(500);
      const body = JSON.parse(res.payload);
      expect(body.error.code).toBe('INTERNAL_ERROR');
      expect(body.error.message).toBe('Database connection failed');
    });
  });
});
