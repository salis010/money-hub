import { format, differenceInYears } from "date-fns"
import { getDateFromString } from "./getDateFromString"
import { formatCurrency, CURRENCIES } from "./formatCurrency"

export const constructAccountDetails = (data) => {
    const { account } = data
    const { lastUpdate, associatedMortgages, originalPurchasePrice, originalPurchasePriceDate } = account

    account.lastUpdateDate = format(new Date(lastUpdate), "do MMM yyyy")
    account.mortgageDetails = associatedMortgages.length ? associatedMortgages[0] : undefined
    account.purchaseDate = getDateFromString(originalPurchasePriceDate)
    
    const sincePurchase = account.recentValuation.amount - originalPurchasePrice
    account.sincePurchase = formatCurrency(CURRENCIES.GBP, sincePurchase)

    const sincePurchasePercentage = sincePurchase / originalPurchasePrice * 100
    const numberOfYearsSincePurchase = differenceInYears(new Date(), new Date(originalPurchasePriceDate))

    account.sincePurchasePercentage = sincePurchasePercentage
    account.numberOfYearsSincePurchase = numberOfYearsSincePurchase
    account.annualAppreciation = `${sincePurchasePercentage / numberOfYearsSincePurchase}%`

    return account
}
