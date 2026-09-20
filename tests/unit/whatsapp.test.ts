import { describe, it, expect } from 'vitest';
import { generateWhatsAppUrl } from '../../src/utils/whatsapp';

describe('generateWhatsAppUrl', () => {
  it('should generate default inquiry URL when no parameters are provided', () => {
    const url = generateWhatsAppUrl();
    expect(url).toContain('https://wa.me/919645010120');
    expect(url).toContain('inquire%20about%20booking');
  });

  it('should generate formatted appointment message with patient details', () => {
    const url = generateWhatsAppUrl({
      name: 'John Doe',
      phone: '9876543210',
      preferredDate: '2026-09-25',
      preferredTime: 'Morning',
      mainConcern: 'Lower Back Pain',
      message: 'Need morning slot',
    });

    expect(url).toContain('https://wa.me/919645010120');
    expect(url).toContain('John%20Doe');
    expect(url).toContain('9876543210');
    expect(url).toContain('Lower%20Back%20Pain');
  });
});
