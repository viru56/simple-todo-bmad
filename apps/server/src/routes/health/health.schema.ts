export const healthResponseSchema = {
  200: {
    type: 'object',
    properties: {
      status: { type: 'string', enum: ['ok'] },
    },
    required: ['status'],
  },
} as const;
