# basx

A set of useful helpers for JS projects.

[![Build Status](https://travis-ci.org/openizr/basx.svg?branch=master)](https://travis-ci.org/openizr/basx)
[![Coverage Status](https://coveralls.io/repos/github/openizr/basx/badge.svg)](https://coveralls.io/github/openizr/basx)
[![npm version](https://badge.fury.io/js/basx.svg)](https://badge.fury.io/js/basx)
[![Downloads](https://img.shields.io/npm/dm/basx.svg)](https://www.npmjs.com/package/basx)


## Installation

```bash
yarn add basx
```


## Usage

```typescript
// main.js
// --------------------------

import { deepMerge, deepCopy, i18n } from 'basx';

const objectA = {
  propA: {
    propAA: 'test',
  },
  propB: ['test'],
  propC: 'test',
};

const objectB = {
  propA: {
    propAB: 'test',
  },
  propB: ['testB'],
  propC: 'testB',
};

const objectACopy = deepCopy(objectA);
console.log(objectA === objectACopy, objectA.propA === objectACopy.propA); // false, false

const mergedObject = deepMerge(objectA, objectB);
console.log(mergedObject); // { propA: { propAA: 'test', propAB: 'test' }, propB: ['test, 'testB'], propC: 'testB' }

const translate = i18n({ LABEL_HOME: "Welcome {{user}}!" });
console.log(translate('LABEL_HOME', { user: 'Charles' })); // "Welcome Charles!"
```


## API documentation

You can find the full API documentation [here](https://openizr.github.io/basx)


## Contributing

See the [Contribution guide](https://github.com/openizr/basx/blob/master/CONTRIBUTING.md)


## License

[MIT](https://github.com/openizr/basx/blob/master/LICENSE)

Copyright (c) Matthieu Jabbour.
