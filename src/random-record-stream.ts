/**
 * random-record-stream
 * Create a Readable stream of random records
 */

import { Readable } from 'readable-stream'
import randomRecordsBetween from 'random-records-between'
import is from '@sindresorhus/is'
import ow from 'ow'

/**
 * Create a Readable stream of random records between `start` and
 * `end` dates, inclusive.
 *
 * @param start - Date of first record in stream
 * @param end - Date of last record in stream
 * @returns Stream of random records
 */
export default function randomRecordStream(start: Date | number, end: Date | number): Readable {

    const startDate = is.number(start) ? new Date(start) : start
    const endDate = is.number(end) ? new Date(end) : end

    ow(startDate, ow.date.is(startDate => startDate.getTime() <= endDate.getTime() || `Expected ${start} to be before ${end}`))

    let records = randomRecordsBetween(startDate, endDate)

    return new Readable({
        objectMode: true,
        read() {
            // console.log('Somebody called `read`')
            const record = records.shift()
            if (is.undefined(record)) {
                this.push(null)
            } else {
                // console.log(new Date(record.Time))
                this.push(record)
            }
        }
    })
}
