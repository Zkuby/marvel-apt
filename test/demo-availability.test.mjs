import test from 'node:test';
import assert from 'node:assert/strict';
import * as availability from '../app/availability.mjs';
import { stay } from '../app/stay.mjs';

const today = '2026-11-20';
const december = day => `2026-12-${day}`;
const preview = (arrival, departure, blocks) => stay(december(arrival), december(departure), 2, today, blocks);

test('the default calendar declares its bookings are demo data', () => {
  assert.equal(availability.availabilityMode, 'demo');
});

test('the preview rejects arrival on or a stay spanning either demo block', () => {
  for (const [arrival, departure] of [['04', '05'], ['02', '08'], ['18', '19'], ['17', '22']]) {
    assert.equal(preview(arrival, departure), null, `${arrival} to ${departure}`);
  }
});

test('the first booked night allows checkout but the next does not', () => {
  assert.equal(preview('02', '04')?.nights, 2);
  assert.equal(preview('02', '05'), null);
});

test('the demo block ends on the first unblocked night', () => {
  assert.equal(preview('07', '08')?.nights, 1);
  assert.equal(preview('21', '22')?.nights, 1);
});

test('an explicitly empty list replaces the demo blocks', () => {
  assert.equal(preview('04', '05', [])?.nights, 1);
});
