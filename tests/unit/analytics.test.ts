import { describe, it, expect, beforeEach, vi } from 'vitest';
import { trackEvent } from '../../src/utils/analytics';

describe('Analytics Telemetry (Zero PHI)', () => {
  beforeEach(() => {
    window.dataLayer = [];
    vi.restoreAllMocks();
  });

  it('pushes event to window.dataLayer without sensitive medical data', () => {
    trackEvent('cta_whatsapp_click', {
      placement: 'hero_section',
      refId: 'HASHI-20260922-1234',
    });

    expect(window.dataLayer?.length).toBe(1);
    const event = window.dataLayer?.[0];
    expect(event?.event).toBe('cta_whatsapp_click');
    expect(event?.placement).toBe('hero_section');
    expect(event?.refId).toBe('HASHI-20260922-1234');
    // Ensure no sensitive clinical keys exist
    expect(event?.name).toBeUndefined();
    expect(event?.phone).toBeUndefined();
    expect(event?.medicalRecord).toBeUndefined();
  });

  it('safely handles missing window.dataLayer', () => {
    delete (window as unknown as { dataLayer?: unknown }).dataLayer;
    expect(() => trackEvent('page_view')).not.toThrow();
  });
});
