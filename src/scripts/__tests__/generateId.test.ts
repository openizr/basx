/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import generateId from 'scripts/generateId';

describe('generateId', () => {
  test('should generate a unique id', () => {
    expect(generateId().length).toBe(40);
  });
});
