/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Box, Flex, Button, Text, Link } from "@rebass/emotion";
import React from "react";
import format from "date-fns/format";

export function getDate(date) {
  let dd = new Date(date);
  return format(dd, "MMMM D, YYYY");
}
export const ListGroup = ({ name }) => {
  return (
    <Flex width={1} justifyContent="center" bg="#f0f0f0" py={2}>
      {name}
    </Flex>
  );
};

export const ListItem = ({
  to,
  heading,
  subHeading,
  rightSection,
  ...rest
}) => {
  let WLink = rest.Link || Link;
  let child = (
    <Flex
      py={3}
      px={2}
      width={1}
      justifyContent="space-between"
      css={css`
        border-bottom: 1px solid black;
      `}
    >
      <Box>
        <Text fontSize={5}>{heading}</Text>
        <Text>{subHeading}</Text>
      </Box>
      <Flex
        css={css`
          align-self: center;
        `}
      >
        {rightSection}
      </Flex>
    </Flex>
  );
  return to ? (
    <WLink
      to={to}
      href={to}
      css={css`
        text-decoration: none;
        color: #000;
        :hover {
          cursor: pointer;
        }
      `}
    >
      {child}
    </WLink>
  ) : (
    child
  );
};
