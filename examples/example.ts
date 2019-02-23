import randomRecordStream from '../src/random-record-stream'
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
