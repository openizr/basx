/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

type Any = any; // eslint-disable-line @typescript-eslint/no-explicit-any
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

declare module 'basx' {
  /**
   * Generates a no-collision, 40-chars, unique identifier.
   *
   * @returns {string} Generated identifier.
   */
  export function generateId(): string;
}

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

declare module 'basx/requester' {
  import { AxiosResponse, AxiosRequestConfig } from 'axios';

  /**
   * Requester configuration.
   */
  export interface RequesterConfiguration {
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
   * Requester.
   */
  export type Requester = <T = Json>(options: AxiosRequestConfig & {
    endpoint: string;
  }) => Promise<AxiosResponse<T>>;

  /**
   * Performs either an real AJAX with axios or a mocked request, depending on the configuration.
   *
   * @param {RequesterConfiguration} configuration Requester's configuration.
   *
   * @returns {Requester} The actual request function.
   */
  export function requester(configuration: RequesterConfiguration): Requester;
}

declare module 'basx/cloner' {
  /**
   * Plain JavaScript object.
   */
  export type PlainObject = { [key: string]: Json };

  /**
   * Performs a deep merge of two plain objects. Only plain objects and arrays are deeply copied.
   *
   * @param {PlainObject} firstObject First object.
   *
   * @param {PlainObject} secondObject Second object.
   *
   * @param {bool} [mergeArrays = false] Whether to merge objects arrays instead of replacing them.
   *
   * @returns {any} A new object resulting of merging of the two others.
   *
   * @throws {Error} If one of the arguments is not a plain object.
   */
  export function deepMerge<T1 = PlainObject, T2 = PlainObject>(
    firstObject: T1,
    secondObject: T2,
    mergeArrays?: boolean,
  ): T1 & T2;

  /**
   * Returns `true` if the given variable is a plain object, `false` otherwise.
   *
   * @param {any} variable Variable to check against.
   *
   * @returns {boolean} `true` if the variable is a plain object, `false` otherwise.
   */
  export function isPlainObject<T>(variable: T): boolean;

  /**
   * Performs a deep copy of a variable. Only plain objects and arrays are deeply copied.
   *
   * @param {any} variable Variable to deeply copy.
   *
   * @returns {any} Variable's deep copy.
   */
  export function deepCopy<T>(variable: T): T;
}
