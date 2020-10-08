/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import i18n from 'scripts/i18n';

describe('i18n', () => {
  const translate = i18n({ TEST_LABEL: 'TEST LABEL {{user}}' });

  test('should generate label from template and variables', () => {
    expect(translate('TEST_LABEL', { user: 'dev' })).toBe('TEST LABEL dev');
  });

  test('should generate an empty label when calling with no argument', () => {
    expect(translate()).toBe('');
  });

  test('should return label name when label key does not exist', () => {
    expect(translate('TEST_LABEL_NEW')).toBe('TEST_LABEL_NEW');
  });
});
