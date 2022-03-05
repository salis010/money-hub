export const CURRENCIES = {
    GBP: 'GBP'
}

export const formatCurrency = (currency, amount) => {
    const options = {
        style: "currency",
        currency: CURRENCIES[currency],
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }

    switch(currency) {
        case CURRENCIES.GBP:
            return new Intl.NumberFormat("en-GB", options).format(amount) 
        default:
            return amount
    }
}
