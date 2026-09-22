import { getStoredUtmParams } from './utm';

export type AnalyticsEventType =
  | 'page_view'
  | 'cta_phone_click'
  | 'cta_whatsapp_click'
  | 'cta_book_click'
  | 'booking_form_view'
  | 'booking_form_submit'
  | 'calendar_sync_click'
  | 'review_cta_click'
  | 'referral_cta_click'
  | 'referral_share_click'
  | 'desk_stretch_open';

export interface AnalyticsEventPayload {
  event: AnalyticsEventType;
  placement?: string;
  sourcePage?: string;
  refId?: string;
  slotTime?: string;
  calendarType?: 'google' | 'ics';
  channel?: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Tracks privacy-safe conversion and funnel events.
 * CRITICAL RULE: Never send names, phone numbers, symptoms, or medical data.
 */
export function trackEvent(
  eventName: AnalyticsEventType,
  metadata: Omit<AnalyticsEventPayload, 'event'> = {}
): void {
  try {
    const utm = getStoredUtmParams() || {};
    const payload: Record<string, unknown> = {
      event: eventName,
      timestamp: new Date().toISOString(),
      url: window.location.pathname,
      ...metadata,
      ...utm,
    };

    // Push to Google Tag Manager / GA4 dataLayer if available
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push(payload);
    }

    // In development or when debug is enabled, log cleanly
    const isDev = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development';
    if (isDev) {
      console.log(`[Analytics Event] ${eventName}:`, payload);
    }
  } catch (err) {
    // Fail silently in production without impacting UX
    console.debug('Analytics dispatch error:', err);
  }
}
