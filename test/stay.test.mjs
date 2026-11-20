import test from 'node:test';
import assert from 'node:assert/strict';
import { stay, kaunasToday } from '../app/stay.mjs';

const today = '2026-11-19';

test('stay counts calendar nights across a daylight saving change', () => {
  assert.deepEqual(stay('2027-03-27', '2027-03-30', '8', today), { arrival: '2027-03-27', departure: '2027-03-30', guests: 8, nights: 3 });
});

test('invalid dates, reversed dates and invalid guest counts cannot open a preview', () => {
  for (const dates of [['', '2026-11-21'], ['2026-11-18', '2026-11-21'], [today, today], [today, '2026-11-18'], ['2027-02-30', '2027-03-02']]) {
    assert.equal(stay(...dates, '2', today), null);
  }
  for (const guests of ['0', '9', '5.5', '']) assert.equal(stay(today, '2026-11-20', guests, today), null);
});

test('reservation uses the property’s local day', () => {
  assert.equal(kaunasToday(new Date('2026-11-19T22:15:00Z')), '2026-11-20');
});

const blocks = [['2027-03-29', '2027-04-02']];

test('a stay cannot start on a blocked night or include one', () => {
  for (const dates of [['2027-03-29', '2027-03-30'], ['2027-04-01', '2027-04-03'], ['2027-03-28', '2027-03-30'], ['2027-03-28', '2027-04-03']]) {
    assert.equal(stay(...dates, 2, today, blocks), null, dates.join(' to '));
  }
});

test('a stay may end on the first blocked night or start after the block', () => {
  assert.equal(stay('2027-03-27', '2027-03-29', 1, today, blocks)?.nights, 2);
  assert.equal(stay('2027-04-02', '2027-04-03', 8, today, blocks)?.nights, 1);
});
