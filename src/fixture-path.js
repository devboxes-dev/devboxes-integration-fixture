'use strict';

const ENCODED_TRAVERSAL = /%(?:2e|2f|5c|00)/i;

function reject() {
  throw new Error('invalid fixture path');
}

function hasUnsafeChars(value) {
  return (
    value.includes('\0') ||
    value.includes('\\') ||
    value.includes('?') ||
    value.includes('#')
  );
}

function validateFixturePath(value) {
  if (typeof value !== 'string' || value === '') {
    reject();
  }
  if (hasUnsafeChars(value) || value.startsWith('/')) {
    reject();
  }
  if (ENCODED_TRAVERSAL.test(value)) {
    reject();
  }

  let decoded = value;
  if (value.includes('%')) {
    try {
      decoded = decodeURIComponent(value);
    } catch {
      reject();
    }
    if (hasUnsafeChars(decoded) || decoded.startsWith('/') || ENCODED_TRAVERSAL.test(decoded)) {
      reject();
    }
  }

  const segments = decoded.split('/').filter((segment) => segment !== '');
  if (segments.length === 0) {
    reject();
  }
  for (const segment of segments) {
    if (segment === '.' || segment === '..') {
      reject();
    }
  }
  if (segments[0] !== 'fixtures') {
    segments.unshift('fixtures');
  }
  return segments.join('/');
}

module.exports = { validateFixturePath };
