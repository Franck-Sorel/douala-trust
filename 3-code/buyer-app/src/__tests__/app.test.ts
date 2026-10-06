import { describe, expect, it, beforeEach } from 'vitest';

describe('buyer-app smoke', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <main id="app">
        <h1>Douala Trust — Buyer App</h1>
        <p class="subtitle">Trust &amp; evidence layer for physical transactions.</p>
      </main>
    `;
  });

  it('mounts the buyer app', async () => {
    await import('../main');
    const app = document.querySelector<HTMLDivElement>('#app');
    expect(app).toBeTruthy();
    expect(app?.dataset.mounted).toBe('true');
  });
});
