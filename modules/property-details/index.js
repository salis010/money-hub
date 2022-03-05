/* eslint-disable max-statements */
import React, { useState, useEffect } from "react";
import { add, format } from "date-fns";
import { Button } from "../../components/button";
import RowContainer from "../../components/row-container";
import { AccountSection } from "./AccountSection"
import { getDateFromString } from "../../utils/getDateFromString"
import { formatCurrency, CURRENCIES } from "../../utils/formatCurrency"
import {
  Inset, AccountHeadline, AccountList, AccountListItem, InfoText, Bold 
} from "./style";

const Detail = ({}) => {
  const [ account, setAccount ] = useState()

  useEffect(() => {
    window.fetch("/api/account")
      .then((res) => res.json())
      .then(data => {
        const accountDetails = data.account

        accountDetails.lastUpdateDate = format(new Date(accountDetails.lastUpdate), "do MMM yyyy")
        accountDetails.mortgageDetails = accountDetails.associatedMortgages.length ? accountDetails.associatedMortgages[0] : undefined
        accountDetails.purchaseDate = getDateFromString(accountDetails.originalPurchasePriceDate)

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
            <AccountListItem>
              <InfoText>
                {`Purchased for `}
                <Bold>${formatCurrency(CURRENCIES.GBP, account.originalPurchasePrice)}</Bold>
                {` in ${format(account.purchaseDate, "MMM yyyy")}`}
              </InfoText>
            </AccountListItem>
            <AccountListItem>
              <InfoText>Since purchase</InfoText>
            </AccountListItem>
            <AccountListItem>
              <InfoText>Annual appreciation</InfoText>
            </AccountListItem>
          </AccountSection>
          {account.mortgage && (
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
