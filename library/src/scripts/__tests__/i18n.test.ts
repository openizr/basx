/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import i18n from 'scripts/i18n';

describe('i18n', () => {
  Object.assign(console, { warn: jest.fn() });
  const { warn } = console;

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
    expect(warn).not.toHaveBeenCalled();
  });

  test('should return label name and display a warning when label key does not exist in non-quiet mode', () => {
    expect(translate('TEST_LABEL_NEW')).toBe('TEST_LABEL_NEW');
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith('No translation found for label "TEST_LABEL_NEW".');
  });
});
