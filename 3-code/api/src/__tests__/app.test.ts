import { describe, expect, it } from 'vitest';
import { buildApp } from '../app.js';

describe('api smoke', () => {
  it('GET /health returns ok', async () => {
    const app = buildApp({ logger: false });
    const res = await app.inject({ method: 'GET', url: '/health' });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ status: 'ok' });
    await app.close();
  });
});
