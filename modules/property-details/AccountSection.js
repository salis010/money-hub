import React from 'react'
import { AccountSection as Section, AccountLabel } from './style'

export const AccountSection = ({ title, children }) =>
    <Section>
        {title && <AccountLabel>{title}</AccountLabel>}
        { children }
    </Section>
