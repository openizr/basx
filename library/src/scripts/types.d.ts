/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

declare module 'basx' {
  /** Any valid JavaScript primitive. */
  type Json = any; // eslint-disable-line @typescript-eslint/no-explicit-any

  interface PlainObject {
    [key: string]: Json;
  }

  interface RequestOptions {
    data?: Json;
    endpoint: string;
    method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE';
    headers?: Record<string, string>;
  }

  export type Request = (options: RequestOptions) => Promise<Json>;

  export interface Configuration {
    baseUri: string;
    shouldMock: boolean;
    mockedResponses: {
      [key: string]: {
        codes?: number[];
        responses?: Json[];
        durations?: number[];
      };
    };
  }

  /**
   * Generates a no-collision, 40-chars, unique identifier.
   *
   * @returns {string} Generated identifier.
   */
  export function generateId(): string;

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
  export function i18n(labels: Record<string, string>, quietMode = false);

  /**
   * Returns `true` if the given variable is a plain object, `false` otherwise.
   *
   * @param variable Variable to check against.
   *
   * @returns `true` if the variable is a plain object, `false` otherwise.
   */
  export function isPlainObject(variable: Json): boolean;

  /**
   * Performs a deep copy of a variable. Only plain objects and arrays are deeply copied.
   *
   * @param {Json} variable Variable to deeply copy.
   *
   * @returns {Json} Variable's deep copy.
   */
  export function deepCopy(variable: Json): Json;

  /**
   * Performs a deep merge of two plain objects. Only plain objects and arrays are deeply copied.
   *
   * @param {PlainObject} firstObject First object.
   *
   * @param {PlainObject} secondObject Second object.
   *
   * @param {bool} [mergeArrays = false] Whether to merge objects arrays instead of replacing them.
   *
   * @returns {PlainObject} A new object resulting of merging of the two others.
   *
   * @throws {Error} If one of the arguments is not a plain object.
   */
  export function deepMerge(
    firstObject: PlainObject,
    secondObject: PlainObject,
    mergeArrays = false,
  ): PlainObject;

  /**
   * Performs either an real AJAX with axios or a mocked request, depending on the configuration.
   *
   * @param {Configuration} configuration Requester's configuration.
   *
   * @returns {Request} The actual request function.
   */
  export default function requester(configuration: Configuration): Request;
}
