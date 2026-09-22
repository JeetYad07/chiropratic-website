export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  ref?: string;
  gclid?: string;
  capturedAt?: string;
}

const UTM_STORAGE_KEY = 'dr_hashi_utm_attribution';

/**
 * Parses UTM and lead referral parameters from URL query string
 * and persists them into sessionStorage.
 */
export function captureUtmParameters(search: string = window.location.search): UtmParams {
  try {
    const params = new URLSearchParams(search);
    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const utmCampaign = params.get('utm_campaign');
    const utmTerm = params.get('utm_term');
    const utmContent = params.get('utm_content');
    const ref = params.get('ref') || params.get('referral');
    const gclid = params.get('gclid');

    if (utmSource || utmMedium || utmCampaign || ref || gclid) {
      const attribution: UtmParams = {
        ...(utmSource ? { utm_source: utmSource } : {}),
        ...(utmMedium ? { utm_medium: utmMedium } : {}),
        ...(utmCampaign ? { utm_campaign: utmCampaign } : {}),
        ...(utmTerm ? { utm_term: utmTerm } : {}),
        ...(utmContent ? { utm_content: utmContent } : {}),
        ...(ref ? { ref } : {}),
        ...(gclid ? { gclid } : {}),
        capturedAt: new Date().toISOString(),
      };

      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(attribution));
      return attribution;
    }

    const stored = getStoredUtmParams();
    return stored || {};
  } catch (err) {
    console.error('Failed to capture UTM parameters:', err);
    return {};
  }
}

/**
 * Retrieves the stored UTM parameters from sessionStorage.
 */
export function getStoredUtmParams(): UtmParams | null {
  try {
    const data = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data) as UtmParams;
  } catch {
    return null;
  }
}
