import { useState, useEffect, useCallback } from 'react';
import { getActiveAppointment, StoredAppointment, clearActiveAppointment, updateAppointmentStatus } from '../utils/appointmentStorage';

export function useBookingStatus() {
  const [activeAppointment, setActiveAppointment] = useState<StoredAppointment | null>(null);

  const refreshStatus = useCallback(() => {
    const current = getActiveAppointment();
    setActiveAppointment(current);
  }, []);

  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  const clear = useCallback(() => {
    clearActiveAppointment();
    setActiveAppointment(null);
  }, []);

  const setConfirmed = useCallback(() => {
    if (activeAppointment) {
      const updated = updateAppointmentStatus('CONFIRMED');
      if (updated) {
        setActiveAppointment(updated);
      }
    }
  }, [activeAppointment]);

  return {
    activeAppointment,
    refreshStatus,
    clear,
    setConfirmed,
  };
}
