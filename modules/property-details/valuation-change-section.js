import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { AccountSection } from './account-section'
import { formatCurrency, CURRENCIES } from '../../utils/formatCurrency'
import {
    AccountHeadline, AccountList, AccountListItem, InfoText, Bold, HighlighItem, Highlight 
  } from './style'

export const ValuationChangeSection = ({
    originalPurchasePrice,
    purchaseDate,
    sincePurchase,
    sincePurchasePercentage,
    annualAppreciation
}) =>
    <AccountSection title='Valuation Changes'>
        <AccountList>
            <HighlighItem>
                <InfoText>
                    {`Purchased for `}
                    <Bold>${formatCurrency(CURRENCIES.GBP, originalPurchasePrice)}</Bold>
                    {` in ${format(purchaseDate, "MMM yyyy")}`}
                </InfoText>
            </HighlighItem>
            <HighlighItem>
                <InfoText>Since purchase</InfoText>
                <Highlight>{sincePurchase} ({sincePurchasePercentage}%)</Highlight>
            </HighlighItem>
            <HighlighItem>
                <InfoText>Annual appreciation</InfoText>
                <Highlight>{annualAppreciation}</Highlight>
            </HighlighItem>
        </AccountList>
    </AccountSection>

ValuationChangeSection.propTypes = {
    annualAppreciation: PropTypes.string.isRequired,
    originalPurchasePrice: PropTypes.number.isRequired,
    purchaseDate: PropTypes.instanceOf(Date).isRequired,
    sincePurchase: PropTypes.string.isRequired,
    sincePurchasePercentage: PropTypes.number.isRequired
}