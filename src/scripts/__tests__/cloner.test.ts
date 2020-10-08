/**
 * Copyright (c) Matthieu Jabbour. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { deepCopy, deepMerge, isPlainObject } from 'scripts/cloner';

let obj = {};

describe('extensions/cloner', () => {
  beforeEach(() => {
    obj = {};
    jest.clearAllMocks();
  });

  describe('isPlainObject', () => {
    test('should return `false` if variable type is not an object', () => {
      expect(isPlainObject(2)).toBe(false);
    });
    test('should return `true` if variable has a modified constructor', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (obj as any).constructor = undefined;
      expect(isPlainObject(obj)).toBe(true);
    });
    test('should return `false` if variable has a modified constructor\'s prototype', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (obj as any).constructor = {};
      expect(isPlainObject(obj)).toBe(false);
    });
    test('should return `false` if variable has a modified constructor\'s prototype', () => {
      const { hasOwnProperty } = obj.constructor.prototype;
      obj.constructor.prototype.hasOwnProperty = jest.fn(() => false);
      expect(isPlainObject(obj)).toBe(false);
      obj.constructor.prototype.hasOwnProperty = hasOwnProperty;
    });
    test('should return `true` if variable is a plain JS object', () => {
      expect(isPlainObject(obj)).toBe(true);
    });
  });

  describe('deepCopy', () => {
    test('should deeply copy nested plain objects', () => {
      const source = {
        firstKey: {
          a: 'test',
          b: {
            c: 'test',
          },
        },
        secondKey: 14,
        thirdKey: [{ a: 'test' }],
      };
      const copy = deepCopy(source);
      expect(copy).toEqual(source);
      expect(copy).not.toBe(source);
      expect(copy.firstKey).toEqual(source.firstKey);
      expect(copy.firstKey).not.toBe(source.firstKey);
      expect(copy.firstKey.b).toEqual(source.firstKey.b);
      expect(copy.firstKey.b).not.toBe(source.firstKey.b);
      expect(copy.thirdKey).toEqual(source.thirdKey);
      expect(copy.thirdKey).not.toBe(source.thirdKey);
      expect(copy.thirdKey[0]).toEqual(source.thirdKey[0]);
      expect(copy.thirdKey[0]).not.toBe(source.thirdKey[0]);
    });
  });

  describe('deepMerge', () => {
    test('should throw if one of the arguments is not a plain object', () => {
      const firstObject = 3;
      const secondObject = {
        firstKey: {
          a: 'test new',
          b: 'ok',
          c: { a: 'test' },
        },
        secondKey: 14,
        thirdKey: [{ a: 'new' }],
      };
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        deepMerge(firstObject as any, secondObject);
      }).toThrow(new Error('Arguments must both be plain objects.'));
    });

    test('should deeply merge nested plain objects', () => {
      const firstObject = {
        firstKey: {
          a: 'test',
          b: {
            c: 'test',
          },
        },
        secondKey: 14,
        thirdKey: [{ a: 'test' }],
      };
      const secondObject = {
        firstKey: {
          a: 'test new',
          b: 'ok',
          c: { a: 'test' },
        },
        secondKey: 15,
        thirdKey: [{ a: 'new' }],
      };
      const merge = deepMerge(firstObject, secondObject);
      expect(merge).toEqual({
        firstKey: {
          a: 'test new',
          b: 'ok',
          c: { a: 'test' },
        },
        secondKey: 15,
        thirdKey: [{ a: 'new' }],
      });
    });

    test('should merge arrays if `mergeArrays` is set to `true`', () => {
      const firstObject = {
        key: [{ a: 'test' }],
      };
      const secondObject = {
        key: [{ a: 'new' }],
      };
      const merge = deepMerge(firstObject, secondObject, true);
      expect(merge).toEqual({
        key: [{ a: 'test' }, { a: 'new' }],
      });
    });
  });
});
