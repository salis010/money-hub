/* eslint-disable max-statements */
import React, { useState, useEffect } from "react"
import { add, format } from "date-fns"
import { EstimatedValueSection } from "./estimated-value-section"
import { PropertyDetailsSection } from "./property-details-section"
import { ValuationChangeSection } from "./valuation-change-section"
import { MortgageSection } from "./mortgage-section"
import { Button } from "../../components/button"
import RowContainer from "../../components/row-container"
import { constructAccountDetails } from "../../utils/constructAccountDetails"
import { formatCurrency, CURRENCIES } from "../../utils/formatCurrency"
import {
  Inset, AccountHeadline, AccountList, AccountListItem, InfoText, Bold, HighlighItem, Highlight 
} from "./style"

const Detail = ({}) => {
  const [ account, setAccount ] = useState()

  useEffect(() => {
    window.fetch("/api/account")
      .then((res) => res.json())
      .then(data => {
        setAccount(constructAccountDetails(data))
      })
  }, [])

  return (
    <>
      {!account && <p>Loading...</p>}
      {account &&
        <Inset>
          <EstimatedValueSection
            amount={account.recentValuation.amount}
            lastUpdate={account.lastUpdate}
            updateAfterDays={account.updateAfterDays}
          />
          <PropertyDetailsSection
            name={account.name}
            bankName={account.bankName}
            postcode={account.postcode}
          />
          <ValuationChangeSection
            originalPurchasePrice={account.originalPurchasePrice}
            purchaseDate={account.purchaseDate}
            sincePurchase={account.sincePurchase}
            sincePurchasePercentage={account.sincePurchasePercentage}
            annualAppreciation={account.annualAppreciation}
          />
          {account.mortgageDetails && (
            <MortgageSection
              currentBalance={account.associatedMortgages[0].currentBalance}
              name={account.associatedMortgages[0].name}
            />
          )}
          <Button
            // This is a dummy action
            onClick={() => alert("You have navigated to the edit account page")}
          >
            Edit account
          </Button>
        </Inset>}
    </>
  )
}

export default Detail
