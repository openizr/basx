/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import axios from 'axios';
import requester from 'scripts/requester';
import HttpError from 'scripts/__mocks__/HttpError';

jest.mock('axios');
jest.useFakeTimers();

console.log = jest.fn(); // eslint-disable-line no-console

describe('requester', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should perform a real AJAX request in real mode', () => {
    const request = requester({ baseUri: 'https://test.com', shouldMock: false, mockedResponses: {} });
    request({ endpoint: '/test', method: 'GET' }).then(() => {
      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(axios.request).toHaveBeenCalledWith({
        endpoint: '/test',
        url: 'https://test.com/test',
        method: 'GET',
      });
    });
  });

  test('should perform a mocked AJAX request in fake mode (default response data)', () => {
    const request = requester({ baseUri: 'https://test.com', shouldMock: true, mockedResponses: {} });
    const promise = request({ endpoint: '/test', method: 'GET' });
    jest.runAllTimers();
    promise.then((response) => {
      expect(axios.request).toHaveBeenCalledTimes(0);
      expect(console.log).toHaveBeenCalledTimes(2); // eslint-disable-line no-console
      expect(console.log).toHaveBeenCalledWith('[API CLIENT] Calling GET \'/test\' API endpoint...', '', ''); // eslint-disable-line no-console
      expect(console.log).toHaveBeenCalledWith('[API CLIENT] HTTP status code: 200, HTTP response: ', ''); // eslint-disable-line no-console
      expect(response).toEqual('');
    });
  });

  test('should perform a mocked AJAX request in fake mode (custom response data)', () => {
    const request = requester({
      baseUri: 'https://test.com',
      shouldMock: true,
      mockedResponses: {
        'GET /test': {
          codes: [401],
          durations: [250],
          responses: [{ test: 'ok' }],
        },
      },
    });
    const promise = request({ endpoint: '/test', method: 'GET' });
    jest.runAllTimers();
    promise.catch((error) => {
      expect(axios.request).toHaveBeenCalledTimes(0);
      expect(console.log).toHaveBeenCalledTimes(2); // eslint-disable-line no-console
      expect(console.log).toHaveBeenCalledWith('[API CLIENT] Calling GET \'/test\' API endpoint...', '', ''); // eslint-disable-line no-console
      expect(console.log).toHaveBeenCalledWith('[API CLIENT] HTTP status code: 401, HTTP response: ', { test: 'ok' }); // eslint-disable-line no-console
      expect(error).toEqual(new HttpError({ data: { code: 401 } }));
    });
  });
});
