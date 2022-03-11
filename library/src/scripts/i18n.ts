/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

type Any = any; // eslint-disable-line @typescript-eslint/no-explicit-any

export type Locale = Record<string, Any>;

/**
 * Replaces `variables` keys by their values in the label, if they exist.
 *
 * @param {Record<string, string>} [variables] Variables to replace in the label.
 *
 * @returns {string} Updated label.
 */
function translate(this: string, variables: Record<string, string>): string {
  let translation = `${this}`;
  Object.keys(variables).forEach((key) => {
    translation = translation.replace(new RegExp(`{{${key}}}`, 'g'), variables[key]);
  });
  return translation;
}

/**
 * Initializes internationalization module.
 *
 * @returns {void}
 */
export default function i18n(): void {
  if ((String.prototype as Any).t === undefined) {
    (String.prototype as Any).t = translate;
  }
}
