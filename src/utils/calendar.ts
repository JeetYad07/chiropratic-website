import { clinicInfo } from '../data/clinicInfo';

export interface CalendarEventDetails {
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:00 AM" or "02:30 PM"
  patientName: string;
  concern?: string;
}

/**
 * Formats a date string (YYYY-MM-DD) and time string ("10:30 AM") into Start and End ISO strings formatted for Google Calendar & ICS (YYYYMMDDTHHmmssZ).
 */
function parseEventTimes(dateStr: string, timeStr: string): { startIso: string; endIso: string } {
  const dateParts = dateStr.split('-');
  const year = parseInt(dateParts[0], 10) || 2026;
  const month = (parseInt(dateParts[1], 10) || 1) - 1;
  const day = parseInt(dateParts[2], 10) || 1;

  let hour = 10;
  let minute = 0;

  if (timeStr) {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (match) {
      hour = parseInt(match[1], 10);
      minute = parseInt(match[2], 10);
      const ampm = match[3].toUpperCase();
      if (ampm === 'PM' && hour < 12) hour += 12;
      if (ampm === 'AM' && hour === 12) hour = 0;
    }
  }

  // Clinic is in IST (UTC+5:30). Convert local IST time to UTC.
  const startLocal = new Date(year, month, day, hour, minute, 0);
  // Default session duration is 45 mins
  const endLocal = new Date(startLocal.getTime() + 45 * 60 * 1000);

  const formatUtcString = (d: Date) => {
    const pad = (n: number) => (n < 10 ? '0' + n : '' + n);
    return (
      d.getUTCFullYear() +
      pad(d.getUTCMonth() + 1) +
      pad(d.getUTCDate()) +
      'T' +
      pad(d.getUTCHours()) +
      pad(d.getUTCMinutes()) +
      '00Z'
    );
  };

  return {
    startIso: formatUtcString(startLocal),
    endIso: formatUtcString(endLocal),
  };
}

/**
 * Generates an instant Google Calendar event URL.
 */
export function generateGoogleCalendarUrl(details: CalendarEventDetails): string {
  const { startIso, endIso } = parseEventTimes(details.date, details.time);

  const title = encodeURIComponent(`Chiropractic Session - ${clinicInfo.name}`);
  const description = encodeURIComponent(
    `Requested Appointment for ${details.patientName}.\nClinic: ${clinicInfo.name}\nPhone: ${clinicInfo.phoneDisplay}\nAddress: ${clinicInfo.address.full}\nLandmark: ${clinicInfo.address.landmark}`
  );
  const location = encodeURIComponent(clinicInfo.address.full);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${description}&location=${location}`;
}

/**
 * Triggers a client-side download of an .ics calendar file.
 */
export function downloadIcsFile(details: CalendarEventDetails): void {
  const { startIso, endIso } = parseEventTimes(details.date, details.time);

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dr Hashi Chiropractic//Appointment Reminder//EN',
    'BEGIN:VEVENT',
    `SUMMARY:Chiropractic Session - ${clinicInfo.name}`,
    `DESCRIPTION:Appointment Request for ${details.patientName}. Clinic: ${clinicInfo.name}. Phone: ${clinicInfo.phoneDisplay}`,
    `LOCATION:${clinicInfo.address.full}`,
    `DTSTART:${startIso}`,
    `DTEND:${endIso}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `appointment-dr-hashi-${details.date}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
