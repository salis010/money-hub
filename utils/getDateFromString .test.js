import { getDateFromString } from './getDateFromString'

describe('getDateFromString', () => {
    const testStrings = [
        ['2017-03-04', new Date(2017, 2, 4)],
        ['2019-02-14', new Date(2019, 1, 14)],
        ['2022-12-27', new Date(2022, 11, 27)],
    ]

    it.each(testStrings)('given %s it returns a date equivalent to %o', (str, date) => {
        expect(getDateFromString(str)).toEqual(date)
    })
})
