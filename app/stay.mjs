import { includesBlockedNights } from './availability.mjs';

export function kaunasToday(date = new Date()) {
  const parts = new Intl.DateTimeFormat('lt-LT', {
    timeZone: 'Europe/Vilnius', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date);
  return ['year', 'month', 'day'].map(key => parts.find(part => part.type === key).value).join('-');
}

export function stay(arrival, departure, guestCount, today = kaunasToday(), blocks) {
  const dates = [arrival, departure];
  const times = dates.map(date => Date.parse(date));
  const valid = dates.every((date, i) => /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    Number.isFinite(times[i]) && new Date(times[i]).toISOString().slice(0, 10) === date);
  const guests = Number(guestCount);
  if (!valid || arrival < today || departure <= arrival || !Number.isInteger(guests) || guests < 1 || guests > 8) return null;
  if (includesBlockedNights(arrival, departure, blocks)) return null;
  return { arrival, departure, guests, nights: (times[1] - times[0]) / 86_400_000 };
}
