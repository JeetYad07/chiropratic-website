import { clinicInfo } from '../data/clinicInfo';

export interface WhatsAppBookingParams {
  name: string;
  phone: string;
  preferredDate?: string;
  preferredTime?: string;
  mainConcern?: string;
  message?: string;
  referenceId?: string;
}

/**
 * Generates a formatted, structured WhatsApp click-to-chat URL with pre-filled message text.
 * Includes reference ID, clinic address, and doctor confirmation prompt.
 */
export function generateWhatsAppUrl(params?: WhatsAppBookingParams): string {
  const cleanNumber = clinicInfo.whatsappNumber.replace(/\D/g, '');
  
  if (!params || !params.name) {
    const defaultMsg = `Hi Dr Hashi, I found your website and would like to inquire about booking a chiropractic consultation.`;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(defaultMsg)}`;
  }

  let text = `🏥 *APPOINTMENT REQUEST - ${clinicInfo.name}*\n\n`;

  if (params.referenceId) {
    text += `🆔 *Booking Ref:* \`${params.referenceId}\`\n`;
  }

  text += `👤 *Patient Name:* ${params.name.trim()}\n`;
  text += `📞 *Contact Phone:* ${params.phone.trim()}\n`;

  if (params.preferredDate) {
    text += `📅 *Requested Date:* ${params.preferredDate}\n`;
  }
  if (params.preferredTime) {
    text += `⏰ *Time Slot:* ${params.preferredTime}\n`;
  }
  if (params.mainConcern) {
    text += `🩺 *Primary Concern:* ${params.mainConcern}\n`;
  }
  if (params.message && params.message.trim()) {
    text += `💬 *Patient Note:* ${params.message.trim()}\n`;
  }

  text += `\n📍 *Clinic Address:* ${clinicInfo.address.full}\n`;
  text += `🗺️ *Directions:* ${clinicInfo.googleMapsUrl}\n\n`;
  text += `--- \n`;
  text += `Dr. Hashi, please reply to confirm this appointment slot. Thank you!`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Opens WhatsApp chat directly in a new window/tab.
 */
export function openWhatsAppChat(params?: WhatsAppBookingParams): void {
  const url = generateWhatsAppUrl(params);
  window.open(url, '_blank', 'noopener,noreferrer');
}
