/**
 * Copyright (c) Matthieu Jabbour.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Generates a no-collision, 40-chars, unique identifier.
 *
 * @returns {string} Generated identifier.
 */
export default function generateId(): string {
  // NodeJS environment...
  if (typeof window === 'undefined') {
    const crypto = require('crypto'); // eslint-disable-line
    return `${Date.now().toString(16).slice(0, 10)}${crypto.randomBytes(15).toString('hex')}`;
  }
  // Browser environment...
  return `${Date.now().toString(16).slice(0, 10)}${Array.prototype.map.call(window.crypto.getRandomValues(new Uint32Array(4)), (uint) => uint.toString(16)).join('')}`.slice(0, 40);
}
