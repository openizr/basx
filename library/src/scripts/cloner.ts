/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

type PlainObject = { [key: string]: Json };
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

/**
 * Returns `true` if the given variable is a plain object, `false` otherwise.
 *
 * @param {any} variable Variable to check against.
 *
 * @returns `true` if the variable is a plain object, `false` otherwise.
 */
export function isPlainObject<T>(variable: T): boolean {
  if (Object.prototype.toString.call(variable) !== '[object Object]') {
    return false;
  }
  const { constructor } = variable as unknown as { constructor: ObjectConstructor };
  if (constructor === undefined) {
    return true;
  }
  const { prototype } = constructor;
  if (Object.prototype.toString.call(prototype) !== '[object Object]') {
    return false;
  }
  if (Object.prototype.hasOwnProperty.call(prototype, 'isPrototypeOf') === false) {
    return false;
  }
  return true;
}

/**
 * Performs a deep copy of a variable. Only plain objects and arrays are deeply copied.
 *
 * @param {any} variable Variable to deeply copy.
 *
 * @returns {any} Variable's deep copy.
 */
export function deepCopy<T>(variable: T): T {
  if (isPlainObject(variable)) {
    return Object.keys(variable).reduce(
      (newObject, key) => Object.assign(newObject, {
        [key]: deepCopy((variable as unknown as Record<string, Json>)[key]),
      }),
      <T>{},
    );
  }
  if (Array.isArray(variable)) {
    return (variable as unknown as Json[]).map(deepCopy) as unknown as T;
  }
  return variable;
}

/**
 * Performs a deep merge of two plain objects. Only plain objects and arrays are deeply copied.
 *
 * @param {PlainObject} firstObject First object.
 *
 * @param {PlainObject} secondObject Second object.
 *
 * @param {bool} [mergeArrays = false] Whether to merge objects arrays instead of replacing them.
 *
 * @returns {PlainObject} A new object resulting of merging of the two others.
 *
 * @throws {Error} If one of the arguments is not a plain object.
 */
export function deepMerge<T1 = PlainObject, T2 = PlainObject>(
  firstObject: T1,
  secondObject: T2,
  mergeArrays = false,
): T1 & T2 {
  if (!isPlainObject(firstObject) || !isPlainObject(secondObject)) {
    throw new Error('Arguments must both be plain objects.');
  }
  const newObject = deepCopy(firstObject) as unknown as PlainObject;
  Object.keys(secondObject).forEach((key) => {
    const firstValue = (firstObject as unknown as PlainObject)[key];
    const secondValue = (secondObject as unknown as PlainObject)[key];
    if (isPlainObject(firstValue) && isPlainObject(secondValue)) {
      newObject[key] = deepMerge(firstValue, secondValue);
    } else if (Array.isArray(firstValue) && Array.isArray(secondValue) && mergeArrays) {
      newObject[key] = (newObject[key] as unknown as Json[]).concat(deepCopy(secondValue));
    } else {
      newObject[key] = deepCopy(secondValue);
    }
  });
  return newObject as unknown as T1 & T2;
}
