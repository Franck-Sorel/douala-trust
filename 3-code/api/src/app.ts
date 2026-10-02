import Fastify from 'fastify';

export interface AppOptions {
  logger?: boolean;
}

export function buildApp(options: AppOptions = {}): ReturnType<typeof Fastify> {
  const app = Fastify({ logger: options.logger ?? true });

  app.get('/health', async () => ({ status: 'ok' }));

  return app;
}
