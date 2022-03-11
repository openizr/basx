/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Generates a no-collision, 40-chars, unique identifier.
 *
 * @returns {string} Generated identifier.
 */
export function generateId(): string { // eslint-disable-line import/prefer-default-export
  const timestamp = Date.now().toString(16).slice(0, 10);

  // NodeJS environment...
  if (typeof window === 'undefined') {
    const req = require;
    const crypto = req('crypto');
    return `${timestamp}${crypto.randomBytes(15).toString('hex')}`;
  }

  // Browser environment...
  return `${timestamp}${Array.prototype.map.call(window.crypto.getRandomValues(new Uint32Array(4)), (uint) => uint.toString(16)).join('')}`.slice(0, 40);
}
