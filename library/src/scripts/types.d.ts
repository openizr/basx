/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

declare module 'basx' {
  import { AxiosResponse, AxiosRequestConfig } from 'axios';

  /**
   * Plain JavaScript object.
   */
  export type PlainObject = { [key: string]: Json };

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
   * @param {any} variable Variable to check against.
   *
   * @returns {boolean} `true` if the variable is a plain object, `false` otherwise.
   */
  export function isPlainObject(variable: any): boolean;

  /**
   * Performs a deep copy of a variable. Only plain objects and arrays are deeply copied.
   *
   * @param {any} variable Variable to deeply copy.
   *
   * @returns {any} Variable's deep copy.
   */
  export function deepCopy<T = any>(variable: T): T;

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
   * Performs either an real AJAX with axios or a mocked request, depending on the configuration.
   *
   * @param {RequesterConfiguration} configuration Requester's configuration.
   *
   * @returns {Requester} The actual request function.
   */
  export function requester(configuration: RequesterConfiguration): Requester;
}
