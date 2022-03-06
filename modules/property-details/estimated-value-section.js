import React from 'react'
import PropTypes from 'prop-types'
import { add, format } from "date-fns"
import { AccountSection } from './account-section'
import { formatCurrency, CURRENCIES } from "../../utils/formatCurrency"
import {
    AccountHeadline, AccountList, AccountListItem, InfoText 
} from './style'

export const EstimatedValueSection = ({ amount, lastUpdate, updateAfterDays }) =>
    <AccountSection title='Estimated Value'>
        <AccountHeadline>
        {formatCurrency(CURRENCIES.GBP, amount)}
        </AccountHeadline>
        <AccountList>
            <AccountListItem>
                <InfoText>
                    {`Last updated ${format(new Date(lastUpdate), "do MMM yyyy")}`}
                </InfoText>
            </AccountListItem>
            <AccountListItem>
                <InfoText>
                    {`Next update ${format(
                        add(new Date(lastUpdate), { days: updateAfterDays }),
                        "do MMM yyyy"
                    )}`}
                </InfoText>
            </AccountListItem>
        </AccountList>
    </AccountSection>

EstimatedValueSection.propTypes = {
    amount: PropTypes.number.isRequired,
    lastUpdate: PropTypes.string.isRequired,
    updateAfterDays: PropTypes.number.isRequired
}