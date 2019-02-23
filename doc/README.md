
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
import Record from 'timeseries-record'
import moment from 'moment'

let records: Record[] = []
const sink = new Writable({
    objectMode: true,
    write(record: Record, _: any, callback: any) {
        records.push(record)
        callback()
    }
})

const start = moment.utc().startOf('year')
const end = moment.utc().startOf('day')
randomRecordStream(start.toDate(), end.toDate()).pipe(sink)

sink.on('finish', () => {
    console.log('Records streamed:')
    console.log(records)
})
```

Related
-------

*   [random-records-between](https://github.com/strong-roots-capital/random-records-between)
*   [stream-dates](https://github.com/strong-roots-capital/stream-dates)

## Index

### Functions

* [randomRecordStream](#randomrecordstream)

---

## Functions

<a id="randomrecordstream"></a>

###  randomRecordStream

▸ **randomRecordStream**(start: *`Date` \| `number`*, end: *`Date` \| `number`*): `Readable`

*Defined in [random-record-stream.ts:19](https://github.com/strong-roots-capital/random-record-stream/blob/033973b/src/random-record-stream.ts#L19)*

Create a Readable stream of random records between `start` and `end` dates, inclusive.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| start | `Date` \| `number` |  Date of first record in stream |
| end | `Date` \| `number` |  Date of last record in stream |

**Returns:** `Readable`
Stream of random records

___

