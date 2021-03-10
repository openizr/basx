/**
 * Copyright (c) Matthieu Jabbour.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as crypto from 'crypto';

export default (): string => `${Date.now().toString(16).slice(0, 10)}${crypto.randomBytes(15).toString('hex')}`;
