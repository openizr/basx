/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

declare module 'basx/i18n' {
  /** List of labels for a specific language. */
  export type Locale = Record<string, Any>;

  /**
   * Initializes internationalization module.
   *
   * @returns {void}
   */
  export default function i18n(): void;
}
