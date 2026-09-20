import { describe, it, expect } from 'vitest';
import { generateGoogleCalendarUrl } from '../../src/utils/calendar';

describe('generateGoogleCalendarUrl', () => {
  it('should generate valid Google Calendar template URL', () => {
    const url = generateGoogleCalendarUrl({
      date: '2026-10-05',
      time: '10:00 AM',
      patientName: 'Rahul Sharma',
      concern: 'Neck Pain',
    });

    expect(url).toContain('https://calendar.google.com/calendar/render?action=TEMPLATE');
    expect(url).toContain('Rahul%20Sharma');
    expect(url).toContain('Chiropractic%20Session');
  });
});
