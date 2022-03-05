import React from 'react'
import PropTypes from 'prop-types'
import { AccountSection as Section, AccountLabel } from './style'

export const AccountSection = ({ title, children }) =>
    <Section>
        {title && <AccountLabel>{title}</AccountLabel>}
        { children }
    </Section>

AccountSection.propTypes = {
    title: PropTypes.string.isRequired
}
