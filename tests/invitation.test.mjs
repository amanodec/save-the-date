import test from 'node:test';
import assert from 'node:assert/strict';
import { getCountdown, rsvpUrl } from '../src/wedding/invitation.js';

test('the countdown uses the engagement’s exact 7 PM IST start', () => {
  const result = getCountdown(Date.parse('2026-11-30T19:00:00+05:30'));
  assert.equal(result.event.id, 'engagement');
  assert.deepEqual([result.days, result.hours, result.minutes, result.seconds], [1, 0, 0, 0]);
});

test('at engagement time the countdown switches to the baraat', () => {
  const before = getCountdown(Date.parse('2026-12-01T18:59:59+05:30'));
  assert.equal(before.event.id, 'engagement');
  assert.equal(before.seconds, 1);
  const during = getCountdown(Date.parse('2026-12-01T19:00:00+05:30'));
  assert.equal(during.event.id, 'baraat');
  assert.equal(during.days, 1);
});

test('after the baraat begins, the countdown ends without negative values', () => {
  for (const date of ['2026-12-02T19:00:00+05:30', '2027-01-01T00:00:00Z']) {
    assert.deepEqual(getCountdown(Date.parse(date)), { event: null, days: 0, hours: 0, minutes: 0, seconds: 0 });
  }
});

test('RSVP opens the confirmed WhatsApp number with an editable guest response', () => {
  const url = new URL(rsvpUrl());
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/918334907636');
  assert.match(url.searchParams.get('text'), /Number of guests:/);
  assert.match(url.searchParams.get('text'), /Engagement \/ Baraat \/ Both/);
});
