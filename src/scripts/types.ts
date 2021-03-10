/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

interface RequestOptions {
  data?: Json;
  endpoint: string;
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE';
  headers?: Record<string, string>;
}

/** Any valid JavaScript primitive. */
export type Json = any; // eslint-disable-line @typescript-eslint/no-explicit-any

export type Request = (options: RequestOptions) => Promise<Json>;

export interface Configuration {
  baseUri: string;
  shouldMock: boolean;
  mockedResponses: {
    [key: string]: {
      codes: number[];
      responses: Json[];
      durations: number[];
    };
  };
}
