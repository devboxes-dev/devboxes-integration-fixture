'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { validateFixturePath } = require('../src/fixture-path');

describe('validateFixturePath', () => {
  it('returns a normalized relative POSIX path under fixtures/', () => {
    assert.equal(validateFixturePath('fixtures/example.json'), 'fixtures/example.json');
    assert.equal(validateFixturePath('example.json'), 'fixtures/example.json');
    assert.equal(validateFixturePath('fixtures/dir/file.txt'), 'fixtures/dir/file.txt');
    assert.equal(validateFixturePath('fixtures/dir//file.txt'), 'fixtures/dir/file.txt');
    assert.equal(validateFixturePath('fixtures/dir/'), 'fixtures/dir');
    assert.equal(validateFixturePath('fixtures'), 'fixtures');
  });

  it('rejects empty and non-string input', () => {
    for (const value of ['', null, undefined, 1, {}, []]) {
      assert.throws(() => validateFixturePath(value), { message: 'invalid fixture path' });
    }
  });

  it('rejects absolute paths', () => {
    assert.throws(() => validateFixturePath('/etc/passwd'), { message: 'invalid fixture path' });
    assert.throws(() => validateFixturePath('/fixtures/example.json'), {
      message: 'invalid fixture path',
    });
  });

  it('rejects . and .. segments', () => {
    assert.throws(() => validateFixturePath('fixtures/./a'), { message: 'invalid fixture path' });
    assert.throws(() => validateFixturePath('fixtures/../a'), { message: 'invalid fixture path' });
    assert.throws(() => validateFixturePath('../fixtures/a'), { message: 'invalid fixture path' });
    assert.throws(() => validateFixturePath('.'), { message: 'invalid fixture path' });
    assert.throws(() => validateFixturePath('..'), { message: 'invalid fixture path' });
  });

  it('rejects backslashes, NUL bytes, query strings, and fragments', () => {
    assert.throws(() => validateFixturePath('fixtures\\a'), { message: 'invalid fixture path' });
    assert.throws(() => validateFixturePath('fixtures/a\0b'), { message: 'invalid fixture path' });
    assert.throws(() => validateFixturePath('fixtures/a?x=1'), { message: 'invalid fixture path' });
    assert.throws(() => validateFixturePath('fixtures/a#hash'), { message: 'invalid fixture path' });
  });

  it('rejects percent-encoded traversal', () => {
    assert.throws(() => validateFixturePath('fixtures/%2e%2e/passwd'), {
      message: 'invalid fixture path',
    });
    assert.throws(() => validateFixturePath('fixtures/%2E%2E/%2Fetc'), {
      message: 'invalid fixture path',
    });
    assert.throws(() => validateFixturePath('%2e%2e/%2e%2e/etc/passwd'), {
      message: 'invalid fixture path',
    });
    assert.throws(() => validateFixturePath('fixtures/%2fetc/passwd'), {
      message: 'invalid fixture path',
    });
    assert.throws(() => validateFixturePath('fixtures/%5c..'), { message: 'invalid fixture path' });
    assert.throws(() => validateFixturePath('fixtures/%00a'), { message: 'invalid fixture path' });
  });
});
