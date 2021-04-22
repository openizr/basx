# basx

A set of useful helpers for JS projects.

[![Build Status](https://travis-ci.org/openizr/basx.svg?branch=master)](https://travis-ci.org/openizr/basx)
[![Coverage Status](https://coveralls.io/repos/github/openizr/basx/badge.svg)](https://coveralls.io/github/openizr/basx)
[![npm](https://img.shields.io/npm/v/basx.svg)](https://www.npmjs.com/package/basx)
[![node](https://img.shields.io/node/v/basx.svg)](https://nodejs.org)
[![Downloads](https://img.shields.io/npm/dm/basx.svg)](https://www.npmjs.com/package/basx)


## Table of Contents

1. [Installation](#Installation)
2. [Usage](#Usage)
3. [API documentation](#APIdocumentation)
4. [Contributing](#Contributing)
5. [Sponsor](#Sponsor)
6. [Maintainers](#Maintainers)
7. [License](#License)


## Installation

```bash
yarn add basx
```


## Usage

```typescript
// main.js
// --------------------------

import { deepMerge, deepCopy, i18n, requester, generateId } from 'basx';

/*
 * deepCopy, deepMerge
 */
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


/*
 * i18n
 */
const translate = i18n({ LABEL_HOME: "Welcome {{user}}!" });
console.log(translate('LABEL_HOME', { user: 'Charles' })); // "Welcome Charles!"


/*
 * requester
 */
const request = requester({
  baseUri: 'https://test.com',
  shouldMock: (process.env.NODE_ENV !== 'production'),
  mockedResponses: {
    'GET /test': {
      codes: [201, 401],
      durations: [250, 300],
      responses: [{ test: 'ok' }],
    },
  },
});

request({ endpoint: '/test', method: 'GET' }).then((response) => {
  console.log(response); // Will be the real HTTP response in production mode, '{ data: { "test": "ok" } }' in any other mode
});
request({ endpoint: '/test', method: 'GET' }).catch((error) => {
  console.log(error); // Will be the real HTTP error in production mode, '' in any other mode
});


/*
 * generateId
 */
console.log(generateId()); // Something like '176d729689f90f9a132998217f7727d628f0f9a4'
```


## API documentation

You can find the complete API documentation [here](https://openizr.github.io/basx)


## Contributing

You're free to contribute to this project by submitting [issues](https://github.com/openizr/basx/issues) and/or [pull requests](https://github.com/openizr/basx/pulls). For more information, please read the [Contribution guide](https://github.com/openizr/basx/blob/master/CONTRIBUTING.md).


## Sponsor

Love this project and want to support it? You can [buy me a coffee](https://www.buymeacoffee.com/matthieujabbour) :)

Or just sending me a quick message saying "Thanks" is also very gratifying, and keeps me motivated to maintain open-source projects I work on!


## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150" src="https://avatars.githubusercontent.com/u/29428247?v=4&s=150">
        </br>
        <a href="https://github.com/matthieujabbour">Matthieu Jabbour</a>
      </td>
    </tr>
  <tbody>
</table>


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) Matthieu Jabbour. All Rights Reserved.
