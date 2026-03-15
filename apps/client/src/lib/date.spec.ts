import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatDate, formatDueDate, toInputDateString } from './date';

describe('date', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-06-15T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('formatDate', () => {
    it('returns "just now" for very recent date', () => {
      const d = new Date('2024-06-15T11:59:30.000Z').toISOString();
      expect(formatDate(d)).toBe('just now');
    });

    it('returns "Xm ago" for minutes', () => {
      const d = new Date('2024-06-15T11:55:00.000Z').toISOString();
      expect(formatDate(d)).toBe('5m ago');
    });

    it('returns "Xh ago" for hours', () => {
      const d = new Date('2024-06-15T10:00:00.000Z').toISOString();
      expect(formatDate(d)).toBe('2h ago');
    });

    it('returns "Xd ago" for days under 7', () => {
      const d = new Date('2024-06-12T12:00:00.000Z').toISOString();
      expect(formatDate(d)).toBe('3d ago');
    });

    it('returns locale date string for older dates', () => {
      const d = new Date('2024-01-01T12:00:00.000Z').toISOString();
      const result = formatDate(d);
      expect(result).toMatch(/Jan|Jan\./);
      expect(result).toMatch(/1/);
    });
  });

  describe('formatDueDate', () => {
    it('formats with month, day, year', () => {
      const result = formatDueDate('2024-12-25T00:00:00.000Z');
      expect(result).toMatch(/Dec|Dec\./);
      expect(result).toMatch(/25/);
      expect(result).toMatch(/2024/);
    });
  });

  describe('toInputDateString', () => {
    it('returns date part only', () => {
      expect(toInputDateString('2024-06-15T12:00:00.000Z')).toBe('2024-06-15');
    });
  });
});
