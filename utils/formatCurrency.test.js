import { formatCurrency, CURRENCIES } from "./formatCurrency"

describe('formatCurrency', () => {
    const currency = CURRENCIES.GBP

    const testCases = [
        [currency, 1234.467, '£1,234'],
        [currency, 1234.567, '£1,235'],
        [currency, 1234.56, '£1,235'],
        [currency, 1234.5, '£1,235'],
        [currency, 1234, '£1,234']
    ]

    it.each(testCases)('Given %s as currency, and %i as amount, it returns %s', (currency, amount, formattedCurrency) => {
        expect(formatCurrency(currency, amount)).toBe(formattedCurrency)
    })
})
