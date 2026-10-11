import { useState, useEffect } from 'react';
import { OPENING_HOURS } from '../config';

/**
 * useOpenStatus — returns { isOpen, label } based on current Asia/Kolkata time.
 * Updates every minute.
 */
function getStatusNow() {
  try {
    const now = new Date();

    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const formatted = fmt.format(now); // e.g. "Mon, 14:30"
    const [dayStr, timeStr] = formatted.split(', ');

    const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const dayIndex = dayMap[dayStr];

    const [hStr, mStr] = timeStr.split(':');
    const currentMinutes = parseInt(hStr, 10) * 60 + parseInt(mStr, 10);

    const todayHours = OPENING_HOURS[dayIndex];
    if (!todayHours) return { isOpen: false, label: 'Closed today' };

    const [openH, openM] = todayHours.open.split(':').map(Number);
    const [closeH, closeM] = todayHours.close.split(':').map(Number);
    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

    // Format time helper → "10:30 AM"
    const fmt12 = (h, m) => {
      const period = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 === 0 ? 12 : h % 12;
      return `${h12}:${String(m).padStart(2, '0')} ${period}`;
    };

    if (isOpen) {
      return { isOpen: true, label: `Open now · closes ${fmt12(closeH, closeM)}` };
    } else {
      if (currentMinutes < openMinutes) {
        return { isOpen: false, label: `Closed · opens ${fmt12(openH, openM)}` };
      }
      // Find next day with hours
      for (let d = 1; d <= 7; d++) {
        const nextDay = (dayIndex + d) % 7;
        const nextHours = OPENING_HOURS[nextDay];
        if (nextHours) {
          const [nh, nm] = nextHours.open.split(':').map(Number);
          const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          const label = d === 1
            ? `Closed · opens tomorrow ${fmt12(nh, nm)}`
            : `Closed · opens ${dayNames[nextDay]} ${fmt12(nh, nm)}`;
          return { isOpen: false, label };
        }
      }
      return { isOpen: false, label: 'Closed' };
    }
  } catch {
    return { isOpen: false, label: 'Hours unavailable' };
  }
}

export function useOpenStatus() {
  const [status, setStatus] = useState(() => getStatusNow());

  useEffect(() => {
    const tick = () => setStatus(getStatusNow());
    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    const timeout = setTimeout(() => {
      tick();
      const interval = setInterval(tick, 60_000);
      return () => clearInterval(interval);
    }, msUntilNextMinute);

    return () => clearTimeout(timeout);
  }, []);

  return status;
}

export default useOpenStatus;
