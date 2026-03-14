import { prisma } from '../lib/prisma';

export const todoRepository = {
  async findAll() {
    return prisma.todo.findMany({
      orderBy: { created_at: 'desc' },
    });
  },

  async findById(id: string) {
    return prisma.todo.findUnique({ where: { id } });
  },

  async create(data: { text: string }) {
    return prisma.todo.create({ data: { text: data.text } });
  },

  async update(
    id: string,
    data: {
      text?: string;
      completed?: boolean;
      important?: boolean;
      category?: string | null;
      due_date?: Date | null;
      description?: string | null;
      completed_at?: Date | null;
    }
  ) {
    return prisma.todo.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.todo.delete({ where: { id } });
  },
};
