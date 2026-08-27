'use strict';

/**
 * Validate a fixture path as a normalized relative POSIX path that stays
 * within a logical fixtures root.
 *
 * Does not access the filesystem or network.
 *
 * @param {unknown} value
 * @returns {boolean}
 */
function validateFixturePath(value) {
  if (typeof value !== 'string') {
    return false;
  }

  if (value.length === 0) {
    return false;
  }

  if (value.trim().length === 0) {
    return false;
  }

  if (value.includes('\0')) {
    return false;
  }

  if (value.includes('\\')) {
    return false;
  }

  if (value.includes('?')) {
    return false;
  }

  if (value.includes('#')) {
    return false;
  }

  // Reject percent-encoding entirely so encoded traversal cannot sneak through
  // (`%2e`, `%2e%2e`, `%2f`, `%5c`, `%00`, mixed case, etc.).
  if (value.includes('%')) {
    return false;
  }

  if (value.startsWith('/')) {
    return false;
  }

  if (/^[A-Za-z]:/.test(value)) {
    return false;
  }

  const segments = value.split('/');
  for (const segment of segments) {
    if (segment.length === 0) {
      return false;
    }
    if (segment === '.' || segment === '..') {
      return false;
    }
  }

  return true;
}

module.exports = { validateFixturePath };
