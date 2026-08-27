'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { validateFixturePath } = require('../src/fixture-path.js');

describe('validateFixturePath', () => {
  describe('accepted paths', () => {
    const accepted = [
      'example.json',
      'nested/dir/file.txt',
      'fixtures/sample.js',
      'a-b_c.d',
      'deeply/nested/path/to/fixture.yaml',
      'file.name.with.dots.json',
    ];

    for (const value of accepted) {
      it(`accepts ${JSON.stringify(value)}`, () => {
        assert.equal(validateFixturePath(value), true);
      });
    }
  });

  describe('rejected values', () => {
    const rejected = [
      { value: '', reason: 'empty string' },
      { value: '   ', reason: 'whitespace-only' },
      { value: '/etc/passwd', reason: 'absolute POSIX path' },
      { value: '/fixtures/sample.js', reason: 'absolute path under fixtures' },
      { value: 'C:/windows/system32', reason: 'absolute Windows path' },
      { value: 'c:foo', reason: 'Windows drive prefix' },
      { value: '.', reason: 'dot segment' },
      { value: '..', reason: 'dot-dot segment' },
      { value: './file.json', reason: 'leading dot segment' },
      { value: 'foo/./bar', reason: 'interior dot segment' },
      { value: 'foo/../bar', reason: 'dot-dot segment' },
      { value: '../fixtures/x', reason: 'dot-dot escape' },
      { value: 'foo\\bar', reason: 'backslash' },
      { value: 'foo\0bar', reason: 'NUL byte' },
      { value: 'foo.json?x=1', reason: 'query string' },
      { value: 'foo.json#section', reason: 'fragment' },
      { value: 'foo/%2e%2e/bar', reason: 'percent-encoded traversal' },
      { value: '%2e%2e/etc/passwd', reason: 'percent-encoded dot-dot' },
      { value: '%2E%2E/secret', reason: 'percent-encoded mixed-case traversal' },
      { value: 'foo%2fbar', reason: 'percent-encoded slash' },
      { value: '%2fetc/passwd', reason: 'percent-encoded absolute slash' },
      { value: 'foo%5cbar', reason: 'percent-encoded backslash' },
      { value: 'foo%00bar', reason: 'percent-encoded NUL' },
      { value: 'foo%bar.json', reason: 'literal percent (any % rejected)' },
      { value: 'foo%20bar.json', reason: 'non-traversal percent-encoding' },
      { value: 'foo//bar', reason: 'empty segment / not normalized' },
      { value: 'foo/', reason: 'trailing slash' },
      { value: null, reason: 'non-string null' },
      { value: undefined, reason: 'non-string undefined' },
      { value: 1, reason: 'non-string number' },
    ];

    for (const { value, reason } of rejected) {
      it(`rejects ${JSON.stringify(value)} (${reason})`, () => {
        assert.equal(validateFixturePath(value), false);
      });
    }
  });

  it('does not access the filesystem or network', () => {
    assert.equal(validateFixturePath('missing/file.json'), true);
    assert.equal(validateFixturePath('../etc/passwd'), false);
  });
});
