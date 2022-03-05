/* eslint-disable max-statements */
import React, { useState, useEffect } from "react";
import { add, format } from "date-fns";
import { Button } from "../../components/button";
import RowContainer from "../../components/row-container";
import {
  AccountHeadline, AccountLabel, AccountList, AccountListItem, AccountSection, InfoText, Inset
} from "./style";

const Detail = ({}) => {
  const [ account, setAccount ] = useState()
  const [ lastUpdate, setLastUpdate ] = useState()
  const [ mortgage, setMortgage ] = useState()
  
  useEffect(() => {
    window.fetch("/api/account")
      .then((res) => res.json())
      .then(data => {
        const accountDetails = data.account

        setLastUpdate(new Date(accountDetails.lastUpdate))

        const mortgageDetails = accountDetails.associatedMortgages.length ? accountDetails.associatedMortgages[0] : undefined
        setMortgage(mortgageDetails)
        
        setAccount(accountDetails)
      })
  }, []);

  return (
    <>
      {!account && <p>Loading...</p>}
      {account &&
        <Inset>
          <AccountSection>
            <AccountLabel>Estimated Value</AccountLabel>
            <AccountHeadline>
              {new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
              }).format(account.recentValuation.amount)}
            </AccountHeadline>
            <AccountList>
              <AccountListItem><InfoText>
                {`Last updated ${format(lastUpdate, "do MMM yyyy")}`}
              </InfoText></AccountListItem>
              <AccountListItem><InfoText>
                {`Next update ${format(
                  add(lastUpdate, { days: account.updateAfterDays }),
                  "do MMM yyyy"
                )}`}
              </InfoText></AccountListItem>
            </AccountList>
          </AccountSection>
          <AccountSection>
            <AccountLabel>Property details</AccountLabel>
            <RowContainer>
              <AccountList>
                <AccountListItem><InfoText>{account.name}</InfoText></AccountListItem>
                <AccountListItem><InfoText>{account.bankName}</InfoText></AccountListItem>
                <AccountListItem><InfoText>{account.postcode}</InfoText></AccountListItem>
              </AccountList>
            </RowContainer>
          </AccountSection>
          {mortgage && (
            <AccountSection>
            <AccountLabel>Mortgage</AccountLabel>
            <RowContainer
              // This is a dummy action
              onClick={() => alert("You have navigated to the mortgage page")}
            >
              <AccountList>
                <AccountListItem><InfoText>
                  {new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  }).format(
                    Math.abs(account.associatedMortgages[0].currentBalance)
                  )}
                </InfoText></AccountListItem>
                <AccountListItem><InfoText>{account.associatedMortgages[0].name}</InfoText></AccountListItem>
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
