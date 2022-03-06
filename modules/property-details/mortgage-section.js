import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import RowContainer from '../../components/row-container'
import { AccountSection } from './account-section'
import {
    AccountList, AccountListItem, InfoText
  } from './style'

export const MortgageSection = ({ currentBalance, name }) =>
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
                        Math.abs(currentBalance)
                    )}
                    </InfoText>
                </AccountListItem>
                <AccountListItem>
                    <InfoText>{name}</InfoText>
                </AccountListItem>
            </AccountList>
        </RowContainer>
</AccountSection>

MortgageSection.propTypes = {
    currentBalance: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}