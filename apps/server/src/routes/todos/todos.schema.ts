import { MAX_TEXT_LENGTH, MAX_DESCRIPTION_LENGTH } from '../../config/constants';

const todoResponseProperties = {
  id: { type: 'string', format: 'uuid' },
  text: { type: 'string' },
  completed: { type: 'boolean' },
  important: { type: 'boolean' },
  category: { type: ['string', 'null'] },
  dueDate: { type: ['string', 'null'], format: 'date-time' },
  description: { type: ['string', 'null'] },
  createdAt: { type: 'string', format: 'date-time' },
  completedAt: { type: ['string', 'null'], format: 'date-time' },
} as const;

export const getTodosSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: todoResponseProperties,
      },
    },
  },
};

export const createTodoSchema = {
  body: {
    type: 'object',
    required: ['text'],
    properties: {
      text: { type: 'string', minLength: 1, maxLength: MAX_TEXT_LENGTH },
    },
    additionalProperties: false,
  },
  response: {
    201: {
      type: 'object',
      properties: todoResponseProperties,
    },
  },
};

export const updateTodoSchema = {
  params: {
    type: 'object',
    properties: { id: { type: 'string', format: 'uuid' } },
    required: ['id'],
  },
  body: {
    type: 'object',
    properties: {
      text: { type: 'string', minLength: 1, maxLength: MAX_TEXT_LENGTH },
      completed: { type: 'boolean' },
      important: { type: 'boolean' },
      category: { type: ['string', 'null'] },
      dueDate: { type: ['string', 'null'] },
      description: { type: ['string', 'null'], maxLength: MAX_DESCRIPTION_LENGTH },
    },
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'object',
      properties: todoResponseProperties,
    },
  },
};

export const deleteTodoSchema = {
  params: {
    type: 'object',
    properties: { id: { type: 'string', format: 'uuid' } },
    required: ['id'],
  },
  response: {
    204: { type: 'null' },
  },
};
