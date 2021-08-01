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

describe('requester', () => {
  Object.assign(console, { log: jest.fn() });
  const { log } = console;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should perform a real AJAX request in real mode', async () => {
    const request = requester({ baseUri: 'https://test.com', shouldMock: false, mockedResponses: {} });
    await request({ endpoint: '/test', method: 'GET' });
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      endpoint: '/test',
      url: 'https://test.com/test',
      method: 'GET',
    });
  });

  test('should perform a real AJAX request in fake mode when endpoint is not mocked', async () => {
    const request = requester({ baseUri: 'https://test.com', shouldMock: true, mockedResponses: {} });
    await request({ endpoint: '/test', method: 'GET' });
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      endpoint: '/test',
      url: 'https://test.com/test',
      method: 'GET',
    });
  });

  test('should perform a mocked AJAX request in fake mode (default response data)', async () => {
    const request = requester({
      baseUri: 'https://test.com',
      shouldMock: true,
      mockedResponses: {
        'GET /test': {},
      },
    });
    const promise = request({ endpoint: '/test', method: 'GET' });
    jest.runAllTimers();
    const response = await promise;
    expect(axios.request).toHaveBeenCalledTimes(0);
    expect(log).toHaveBeenCalledTimes(2);
    expect(log).toHaveBeenCalledWith('[API CLIENT] Calling GET \'/test\' API endpoint...', '', '');
    expect(log).toHaveBeenCalledWith('[API CLIENT] HTTP status code: 200, HTTP response: ', '');
    expect(response).toEqual({ data: '' });
  });

  test('should perform a mocked AJAX request in fake mode (custom response data)', async () => {
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
    try {
      const promise = request({ endpoint: '/test', method: 'GET' });
      jest.runAllTimers();
      await promise;
    } catch (error) {
      expect(axios.request).toHaveBeenCalledTimes(0);
      expect(log).toHaveBeenCalledTimes(2);
      expect(log).toHaveBeenCalledWith('[API CLIENT] Calling GET \'/test\' API endpoint...', '', '');
      expect(log).toHaveBeenCalledWith('[API CLIENT] HTTP status code: 401, HTTP response: ', { test: 'ok' });
      expect(error).toEqual(new HttpError({ data: { code: 401 } }));
    }
  });
});
