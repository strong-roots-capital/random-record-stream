import test from 'ava'

import { Writable } from 'readable-stream'
import * as moment from 'moment'
import Record from 'timeseries-record'

/**
 * Library under test
 */

import randomRecordStream from '../src/random-record-stream'

test.beforeEach((t: any) => {
    t.context.records = []
    t.context.sink = new Writable({
        objectMode: true,
        write(record: Record, _: any, callback: any) {
            // console.log('ws: got record:\n', record)
            // console.log('calling `callback`')
            t.context.records.push(record)
            callback()
        }
    })
})

/**********************************************************
 * Test cases
 **********************************************************/

test.cb('should return a readable stream', (t: any) => {

    const start = moment.utc().startOf('day').toDate()
    const end = moment.utc().startOf('day').add(1, 'day').toDate()

    randomRecordStream(start, end)
        .pipe(t.context.sink)

    t.context.sink.on('finish', () => {
        t.end()
    })
})

test('should throw ArgumentError error when end is before start', (t: any) => {

    const end = moment.utc().startOf('day').toDate()
    const start = moment.utc().startOf('day').add(1, 'day').toDate()

    const error = t.throws(() => {
        randomRecordStream(start, end)
            .pipe(t.context.sink)
    }, Error)
    t.is(error.name, 'ArgumentError')
})

test.cb('test passes when end is equal to start', (t: any) => {
    const end = moment.utc().startOf('day').toDate()
    const start = moment.utc().startOf('day').toDate()
    randomRecordStream(start, end)
        .pipe(t.context.sink)

    t.context.sink.on('finish', () => {
        t.is(t.context.records.length, 1)
        t.end()
    })
})

test.cb('should return a readable stream when start is before end', (t: any) => {

    const end = moment.utc().startOf('day').add(3, 'day').toDate()
    const start = moment.utc().startOf('day').toDate()
    randomRecordStream(start, end)
        .pipe(t.context.sink)

    t.context.sink.on('finish', () => t.end())
})

test.cb('test passes when start is a Date and end is a number', (t: any) => {

    const end = moment.utc().startOf('day').add(3, 'day').toDate().getTime()
    const start = moment.utc().startOf('day').toDate()
    randomRecordStream(start, end)
        .pipe(t.context.sink)

    t.context.sink.on('finish', () => t.end())

})

test.cb('test passes when start and end are numbers', (t: any) => {

    const end = moment.utc().startOf('day').add(3, 'day').toDate().getTime()
    const start = moment.utc().startOf('day').toDate().getTime()
    randomRecordStream(start, end)
        .pipe(t.context.sink)

    t.context.sink.on('finish', () => t.end())
})

test.cb('test passes when start and end are Dates', (t: any) => {

    const end = moment.utc().startOf('day').add(2, 'day').toDate()
    const start = moment.utc().startOf('day').toDate()
    randomRecordStream(start, end)
        .pipe(t.context.sink)

    t.context.sink.on('finish', () => t.end())
})

test.cb('test passes when start is a number and end is a Date', (t: any) => {

    const end = moment.utc().startOf('day').add(3, 'day').toDate()
    const start = moment.utc().startOf('day').toDate().getTime()
    randomRecordStream(start, end)
        .pipe(t.context.sink)

    t.context.sink.on('finish', () => t.end())
})

test.cb('should return a record corresponding to every date between start and end, inclusive', (t: any) => {

    const start = moment.utc().startOf('day').toDate()
    const end = moment.utc(start).clone().add(400, 'day').toDate()

    randomRecordStream(start, end).pipe(t.context.sink)

    t.context.sink.on('finish', () => {
        const expectedDate = moment.utc(start).clone()
        t.context.records.forEach((record: Record) => {
            t.is(record.Time, expectedDate.valueOf())
            expectedDate.add(1, 'day')
        })
        t.end()
    })
})
