import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareInvitation } from '../src/wedding/prepareInvitation.js';

const deferred = () => {
  let resolve;
  const promise = new Promise(done => { resolve = done; });
  return { promise, resolve };
};

test('entry waits for both typography and all visible opening images', async () => {
  const font = deferred();
  const background = deferred();
  const foreground = deferred();
  const hero = { querySelectorAll: () => [
    { decode: () => background.promise },
    { decode: () => foreground.promise },
  ] };
  let ready = false;
  const preparation = prepareInvitation(hero, { load: () => font.promise }).then(() => { ready = true; });
  background.resolve();
  font.resolve();
  await new Promise(done => setImmediate(done));
  assert.equal(ready, false, 'Doors must stay closed while foreground artwork is decoding');
  foreground.resolve();
  await preparation;
  assert.equal(ready, true);
});

test('an unavailable decorative image or font still allows entry', async () => {
  await prepareInvitation({ querySelectorAll: () => [{ decode: async () => { throw new Error('Image unavailable'); } }] }, {
    load: async () => { throw new Error('Font unavailable'); },
  });
});

test('entry waits for the final font layout after the requested faces load', async () => {
  const layout = deferred();
  let ready = false;
  const preparation = prepareInvitation({ querySelectorAll: () => [] }, {
    load: async () => [], ready: layout.promise,
  }).then(() => { ready = true; });
  await new Promise(done => setImmediate(done));
  assert.equal(ready, false);
  layout.resolve();
  await preparation;
  assert.equal(ready, true);
});

test('entry also works without optional font or image decoding APIs', async () => {
  await prepareInvitation({ querySelectorAll: () => [{}] });
});
