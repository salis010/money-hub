/* eslint-disable max-statements */
import React, { useState, useEffect } from "react";
import { add, format, differenceInYears } from "date-fns";
import { Button } from "../../components/button";
import RowContainer from "../../components/row-container";
import { AccountSection } from "./AccountSection"
import { getDateFromString } from "../../utils/getDateFromString"
import { formatCurrency, CURRENCIES } from "../../utils/formatCurrency"
import {
  Inset, AccountHeadline, AccountList, AccountListItem, InfoText, Bold, HighlighItem, Highlight 
} from "./style";

const Detail = ({}) => {
  const [ account, setAccount ] = useState()

  useEffect(() => {
    window.fetch("/api/account")
      .then((res) => res.json())
      .then(data => {
        const accountDetails = data.account
        const { lastUpdate, associatedMortgages, originalPurchasePrice, originalPurchasePriceDate } = accountDetails

        accountDetails.lastUpdateDate = format(new Date(lastUpdate), "do MMM yyyy")
        accountDetails.mortgageDetails = associatedMortgages.length ? associatedMortgages[0] : undefined
        accountDetails.purchaseDate = getDateFromString(originalPurchasePriceDate)
        
        const sincePurchase = accountDetails.recentValuation.amount - originalPurchasePrice
        accountDetails.sincePurchase = formatCurrency(CURRENCIES.GBP, sincePurchase)

        const sincePurchasePercentage = sincePurchase / originalPurchasePrice * 100
        const numberOfYearsSincePurchase = differenceInYears(new Date(), new Date(originalPurchasePriceDate))

        accountDetails.sincePurchasePercentage = sincePurchasePercentage
        accountDetails.numberOfYearsSincePurchase = numberOfYearsSincePurchase
        accountDetails.annualAppreciation = `${sincePurchasePercentage / numberOfYearsSincePurchase}%`

        setAccount(accountDetails)
      })
  }, []);

  return (
    <>
      {!account && <p>Loading...</p>}
      {account &&
        <Inset>
          <AccountSection title='Estimated Value'>
            <AccountHeadline>
            {formatCurrency(CURRENCIES.GBP, account.recentValuation.amount)}
            </AccountHeadline>
            <AccountList>
              <AccountListItem><InfoText>
                {`Last updated ${account.lastUpdate}`}
              </InfoText></AccountListItem>
              <AccountListItem><InfoText>
                {`Next update ${format(
                  add(new Date(account.lastUpdate), { days: account.updateAfterDays }),
                  "do MMM yyyy"
                )}`}
              </InfoText></AccountListItem>
            </AccountList>
          </AccountSection>
          <AccountSection title='Property details'>
            <RowContainer>
              <AccountList>
                <AccountListItem><InfoText>{account.name}</InfoText></AccountListItem>
                <AccountListItem><InfoText>{account.bankName}</InfoText></AccountListItem>
                <AccountListItem><InfoText>{account.postcode}</InfoText></AccountListItem>
              </AccountList>
            </RowContainer>
          </AccountSection>
          <AccountSection title='Valuation Change'>
            <HighlighItem>
              <InfoText>
                {`Purchased for `}
                <Bold>${formatCurrency(CURRENCIES.GBP, account.originalPurchasePrice)}</Bold>
                {` in ${format(account.purchaseDate, "MMM yyyy")}`}
              </InfoText>
            </HighlighItem>
            <HighlighItem>
              <InfoText>Since purchase</InfoText>
              <Highlight>{account.sincePurchase} ({account.sincePurchasePercentage}%)</Highlight>
            </HighlighItem>
            <HighlighItem>
              <InfoText>Annual appreciation</InfoText>
              <Highlight>{account.annualAppreciation}</Highlight>
            </HighlighItem>
          </AccountSection>
          {account.mortgageDetails && (
            <AccountSection title='Mortgage'>
            <RowContainer
              // This is a dummy action
              onClick={() => alert("You have navigated to the mortgage page")}
            >
              <AccountList>
                <AccountListItem>
                  <InfoText>
                    {new Intl.NumberFormat("en-GB", {
                      style: "currency",
                      currency: "GBP",
                    }).format(
                      Math.abs(account.associatedMortgages[0].currentBalance)
                    )}
                  </InfoText>
                </AccountListItem>
                <AccountListItem>
                  <InfoText>{account.associatedMortgages[0].name}</InfoText>
                </AccountListItem>
              </AccountList>
            </RowContainer>
          </AccountSection>
          )}
          <Button
            // This is a dummy action
            onClick={() => alert("You have navigated to the edit account page")}
          >
            Edit account
          </Button>
        </Inset>}
    </>
  );
};

export default Detail;
