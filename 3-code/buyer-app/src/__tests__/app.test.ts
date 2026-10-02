import { describe, expect, it } from 'vitest';

export function appTitle(): string {
  return 'Douala Trust — Buyer App';
}

describe('buyer-app smoke', () => {
  it('exposes the buyer app title', () => {
    expect(appTitle()).toContain('Buyer App');
  });
});
