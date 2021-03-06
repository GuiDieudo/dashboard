import React from "react";
import styled from "styled-components";
import { AiOutlineHome } from "@react-icons/all-files/ai/AiOutlineHome";
import Link from "next/link";
import { media, iconCss } from "../utils/styledComponents";

const StyledLink = styled("a")`
  font-weight: inherit;
  transition: color 200ms ease;
  color: rgba(0, 0, 0, 0.45);

  :hover {
    color: ${(props) => props.theme.materialColor};
  }
`;

const Container = styled.div`
  overflow: auto;
  white-space: nowrap;
  font-size: 0.9rem;
  padding: 1rem;
  color: rgba(0, 0, 0, 0.45);
  padding-bottom: 0.75rem;

  ${media.lg} {
    padding: 2rem;
    padding-bottom: 1.5rem;
  }
`;
const LastBreadcrumb = styled.span`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
  padding-right: 1rem;
`;
const Seperator = styled.span`
  margin: 0 8px;
  color: rgba(0, 0, 0, 0.45);
`;
const StyledIcon = styled(AiOutlineHome)`
  margin-top: 0.1rem;
  ${iconCss}
`;

const Breadcrumbs = ({ links, currentBreadcrumbText }) => {
  return (
    <Container className="cp-c-row cp-c-align-start-center">
      <Link href="/" passHref>
        <StyledLink aria-label="home" href="/">
          <StyledIcon />
        </StyledLink>
      </Link>
      {links.length > 0 &&
        links.map(({ to, text }) => (
          <div key={text}>
            <Seperator>/</Seperator>
            <Link href={to} passHref>
              <StyledLink aria-label={to} href={to}>
                {text}
              </StyledLink>
            </Link>
          </div>
        ))}
      <div>
        <Seperator>/</Seperator>
        <LastBreadcrumb>{currentBreadcrumbText}</LastBreadcrumb>
      </div>
    </Container>
  );
};

export default Breadcrumbs;
