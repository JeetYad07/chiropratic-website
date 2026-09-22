import { useCallback } from 'react';
import { generateWhatsAppUrl, openWhatsAppChat, WhatsAppBookingParams } from '../utils/whatsapp';

export function useWhatsApp() {
  const getUrl = useCallback((params?: WhatsAppBookingParams) => {
    return generateWhatsAppUrl(params);
  }, []);

  const openChat = useCallback((params?: WhatsAppBookingParams) => {
    openWhatsAppChat(params);
  }, []);

  return {
    generateUrl: getUrl,
    openChat,
  };
}
