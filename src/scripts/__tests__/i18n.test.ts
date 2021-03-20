/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import i18n from 'scripts/i18n';

console.warn = jest.fn(); // eslint-disable-line no-console

describe('i18n', () => {
  let translate: (label: string, values?: Record<string, string>) => string;

  beforeEach(() => {
    translate = i18n({ TEST_LABEL: 'TEST LABEL {{user}} TEST TEST {{user}}' });
  });

  test('should generate label from template and variables', () => {
    expect(translate('TEST_LABEL', { user: 'dev' })).toBe('TEST LABEL dev TEST TEST dev');
  });

  test('should just return label name when label key does not exist in quiet mode', () => {
    translate = i18n({}, true);
    expect(translate('TEST_LABEL')).toBe('TEST_LABEL');
    expect(console.warn).not.toHaveBeenCalled(); // eslint-disable-line no-console
  });

  test('should return label name and display a warning when label key does not exist in non-quiet mode', () => {
    expect(translate('TEST_LABEL_NEW')).toBe('TEST_LABEL_NEW');
    expect(console.warn).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
    expect(console.warn).toHaveBeenCalledWith('No translation found for label "TEST_LABEL_NEW".'); // eslint-disable-line no-console
  });
});
