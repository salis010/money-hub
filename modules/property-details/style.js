import styled, { css } from "styled-components";

export const Inset = styled.main`
  padding: 0 ${(props) => props.theme.space.m};
`;

export const AccountSection = styled.section`
  padding: ${(props) => props.theme.space.m} 0;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${(props) => props.theme.colors.neutral[200]};
  }
}
`;

export const AccountLabel = styled.div`
  font-size: ${(props) => props.theme.typography.xl.fontSize};
  line-height: ${(props) => props.theme.typography.xl.lineHeight};
  color: ${(props) => props.theme.colors.neutral[900]};
  margin-bottom: ${(props) => props.theme.space.s};
`;

export const AccountHeadline = styled.h2`
  font-size: ${(props) => props.theme.typography["3xl"].fontSize};
  line-height: ${(props) => props.theme.typography["3xl"].lineHeight};
  font-weight: normal;
  color: ${(props) => props.theme.colors.neutral[900]};
  margin-bottom: ${(props) => props.theme.space.m};
`;

export const AccountList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

export const AccountListItem = styled.li`
  display: flex;

  &:not(:last-of-type) {
    margin-bottom: ${(props) => props.theme.space.m};
  }
`;

export const InfoText = styled.p`
  line-height: 1.6;
  font-size: ${(props) => props.theme.typography.m.fontSize};
  color: ${(props) => props.theme.colors.neutral[600]};
`;

export const Bold = styled.span`
  font-weight: 600
`

export const HighlighItem = styled(AccountListItem)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const Highlight = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  width: 12rem;
  padding: ${(props) => props.theme.space.xs};
  color: ${(props) => props.theme.colors.highlight.text};
  background-color: ${(props) => props.theme.colors.highlight.background};
  border-radius: 100rem;
`







