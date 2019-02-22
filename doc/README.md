
random-record-stream [![Build status](https://travis-ci.org/strong-roots-capital/random-record-stream.svg?branch=master)](https://travis-ci.org/strong-roots-capital/random-record-stream) [![npm version](https://img.shields.io/npm/v/@strong-roots-capital/random-record-stream.svg)](https://npmjs.org/package/@strong-roots-capital/random-record-stream) [![codecov](https://codecov.io/gh/strong-roots-capital/random-record-stream/branch/master/graph/badge.svg)](https://codecov.io/gh/strong-roots-capital/random-record-stream)
===========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

> Create a Readable stream of random records

Install
-------

```shell
npm install @strong-roots-capital/random-record-stream
```

Use
---

```typescript
import randomRecordStream from '@strong-roots-capital/random-record-stream'
// TODO: describe usage
```

Related
-------

TODO

Acknowledgments
---------------

TODO

## Index

### Functions

* [randomRecordStream](#randomrecordstream)

---

## Functions

<a id="randomrecordstream"></a>

###  randomRecordStream

▸ **randomRecordStream**(start: *`Date` \| `number`*, end: *`Date` \| `number`*): `Readable`

*Defined in [random-record-stream.ts:20](https://github.com/strong-roots-capital/random-record-stream/blob/f0c70e4/src/random-record-stream.ts#L20)*

Create a Readable stream of random records between `start` and `end` dates, inclusive.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| start | `Date` \| `number` |  Date of first record in stream |
| end | `Date` \| `number` |  Date of last record in stream |

**Returns:** `Readable`
Stream of random records

___

