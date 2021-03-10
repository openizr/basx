/**
 * Copyright (c) KivFinance, Inc.
 * All rights reserved.
 */

/**
 * axios HTTP erros mock.
 */
export default class HttpError extends Error {
  public response: { data: { code: number }; };

  constructor(response: { data: { code: number; }; }) {
    super('HTTP Error');
    this.response = response;
  }
}
