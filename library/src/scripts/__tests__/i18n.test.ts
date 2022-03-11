/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import i18n, { Locale } from 'scripts/i18n';

describe('i18n', () => {
  test('should not change label if i18n is not imported', () => {
    const locale: Locale = { TEST: 'test' };
    expect(locale.TEST.t).toBe(undefined);
  });

  test('should generate label from variables if i18n is imported', () => {
    i18n();
    const locale: Locale = { LABEL: 'TEST LABEL {{user}} TEST TEST {{user}}' };
    expect(locale.LABEL.t({})).toBe('TEST LABEL {{user}} TEST TEST {{user}}');
    expect(locale.LABEL.t({ user: 'dev' })).toBe('TEST LABEL dev TEST TEST dev');
  });
});
