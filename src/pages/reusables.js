/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Flex, Text, Heading } from "@rebass/emotion";
import {ListItem,ListGroup,getDate} from 'tuteria-shared/lib/shared/reusables'
import Link from "react-router-dom/Link";
export {
  AsLink,
  DetailItem,
  getTime,
  SectionListPage
} from "tuteria-shared/lib/shared/reusables";
export {ListItem,ListGroup,getDate,Link}

export const DetailHeader = ({ heading, subHeading, children }) => {
  return (
    <Flex
      mb={4}
      flexDirection="column"
      css={css`
        align-items: center;
      `}
    >
      <Heading fontSize={5}>{heading}</Heading>
      <Text>{subHeading}</Text>
      {children}
    </Flex>
  );
};


