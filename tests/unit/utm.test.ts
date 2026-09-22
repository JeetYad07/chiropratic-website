import { describe, it, expect, beforeEach } from 'vitest';
import { captureUtmParameters, getStoredUtmParams } from '../../src/utils/utm';

describe('UTM & Attribution Tracking', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('captures UTM parameters from query string and persists to sessionStorage', () => {
    const search = '?utm_source=google&utm_medium=cpc&utm_campaign=electronic_city_chiro&ref=tech_park';
    const captured = captureUtmParameters(search);

    expect(captured.utm_source).toBe('google');
    expect(captured.utm_medium).toBe('cpc');
    expect(captured.utm_campaign).toBe('electronic_city_chiro');
    expect(captured.ref).toBe('tech_park');

    const stored = getStoredUtmParams();
    expect(stored?.utm_source).toBe('google');
    expect(stored?.ref).toBe('tech_park');
  });

  it('returns empty object when no UTM parameters are present', () => {
    const captured = captureUtmParameters('');
    expect(captured.utm_source).toBeUndefined();
  });
});
