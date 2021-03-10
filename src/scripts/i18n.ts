/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Initializes the translation function from given labels.
 *
 * @param {Record<string, string>} labels Set of labels for translation.
 *
 * @returns {(string, Record<string, string>) => string} The actual translation function,
 * accepting the following parameters:
 *  - `label`, the label to translate
 *  - `values`, the variables `key`- `value` mapping for replacement
 */
export default function i18n(labels: Record<string, string>) {
  return function translate(label = '', values: Record<string, string> = {}): string {
    let translation = labels[label] || label;
    Object.keys(values).forEach((key) => {
      translation = translation.replace(new RegExp(`{{${key}}}`, 'g'), values[key]);
    });
    return translation;
  };
}
