import React from 'react'
import PropTypes from 'prop-types'
import { AccountSection } from './account-section'
import RowContainer from '../../components/row-container'
import { formatCurrency, CURRENCIES } from "../../utils/formatCurrency"
import {
    AccountList, AccountListItem, InfoText
} from './style'

export const PropertyDetailsSection = ({ name, bankName, postcode }) =>
    <AccountSection title='Property details'>
        <RowContainer>
            <AccountList>
                <AccountListItem><InfoText>{name}</InfoText></AccountListItem>
                <AccountListItem><InfoText>{bankName}</InfoText></AccountListItem>
                <AccountListItem><InfoText>{postcode}</InfoText></AccountListItem>
            </AccountList>
        </RowContainer>
    </AccountSection>

PropertyDetailsSection.propTypes = {
    bankName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    postcode: PropTypes.string.isRequired
}