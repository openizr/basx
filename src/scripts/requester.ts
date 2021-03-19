/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import axios from 'axios';
import HttpError from 'scripts/__mocks__/HttpError';
import { Json, Configuration, Request } from 'scripts/types';

/**
 * Performs either an real AJAX with axios or a mocked request, depending on the configuration.
 *
 * @param {Settings} settings Requester's configuration.
 *
 * @returns {Request} The actual request function.
 */
export default function requester(configuration: Configuration): Request {
  return (options): Promise<Json> => {
    const { endpoint, method, headers } = options;

    // Classic HTTP request.
    if (configuration.shouldMock === false) {
      return axios.request({ ...options, url: `${configuration.baseUri}${endpoint}` })
        .then((response) => (response as { data: Json; }).data);
    }

    // Mocked HTTP request.
    return new Promise((resolve, reject) => {
      const key = `${method} ${endpoint}`;
      const statusCode = (configuration.mockedResponses[key]?.codes || [200]).splice(0, 1)[0];
      const response = (configuration.mockedResponses[key]?.responses || ['']).splice(0, 1)[0];
      const duration = (configuration.mockedResponses[key]?.durations || [500]).splice(0, 1)[0];
      // eslint-disable-next-line no-console
      console.log(`[API CLIENT] Calling ${method} '${endpoint}' API endpoint...`, headers || '', options.data || '');
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log(`[API CLIENT] HTTP status code: ${statusCode}, HTTP response: `, response);
        return (statusCode > 300)
          ? reject(new HttpError({ data: { code: statusCode } }))
          : resolve({ data: response });
      }, duration);
    }).then((response) => (response as { data: Json; }).data);
  };
}
