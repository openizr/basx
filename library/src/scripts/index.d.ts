/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

type Any = any; // eslint-disable-line @typescript-eslint/no-explicit-any
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
