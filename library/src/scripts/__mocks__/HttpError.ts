/**
 * Copyright (c) KivFinance, Inc.
 * All rights reserved.
 */

/**
 * axios HTTP error mock.
 */
export default class HttpError extends Error {
  public response: { data: Json; status: number; };

  constructor(response: { data: Json; status: number; }) {
    super('HTTP Error');
    this.response = response;
  }
}
