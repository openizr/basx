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
 * @param {boolean} [quietMode = false] Whether to display a warning when a label is not found.
 *
 * @param {Record<string, string>} labels Set of labels for translation.
 *
 * @returns {(string, Record<string, string>) => string} The actual translation function,
 * accepting the following parameters:
 *  - `label`, the label to translate
 *  - `values`, the variables `key`- `value` mapping for replacement
 */
export default function i18n(labels: Record<string, string>, quietMode = false) {
  return function translate(label: string, values: Record<string, string> = {}): string {
    if (labels[label] === undefined && quietMode === false) {
      console.warn(`No translation found for label "${label}".`); // eslint-disable-line no-console
    }
    let translation = labels[label] || label;
    Object.keys(values).forEach((key) => {
      translation = translation.replace(new RegExp(`{{${key}}}`, 'g'), values[key]);
    });
    return translation;
  };
}
