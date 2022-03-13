/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

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
