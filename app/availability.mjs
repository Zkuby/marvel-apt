// DEMO ONLY, not real reservations. Replace with provider blocks: [first booked night, first unblocked night).
export const availabilityMode = 'demo';
export const blockedDates = [
  ['2026-12-04', '2026-12-07'],
  ['2026-12-18', '2026-12-21'],
];

export function includesBlockedNights(arrival, departure, blocks = blockedDates) {
  return blocks.some(([from, to]) => arrival < to && from < departure);
}
