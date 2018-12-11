/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Box, Flex, Text, Heading } from "@rebass/emotion";
import React from "react";
import { DataContext } from "../DataProvider";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "./primitives";

import { ListGroup, ListItem, getDate } from "./reusables";
const DetailItem = ({ label, children }) => {
  return (
    <Flex py={2} justifyContent="space-between">
      <Text fontSize={3}>{label}</Text>
      <Text fontSize={3}>{children}</Text>
    </Flex>
  );
};
class TransactionDetail extends React.Component {
  render() {
    return <Flex>TransactionDetail</Flex>;
  }
}
class TransactionList extends React.Component {
  toDetailPage = order => {
    return `/withdrawals/1004/transactions/22`;
  };
  render() {
    return (
      <>
        <ListGroup name="Transactions" />
        <ListItem
          Link={Link}
          to={this.toDetailPage()}
          heading="N2000"
          subHeading="WITHDRAWAL"
          rightSection={"Dec 12, 2018"}
        />
        <ListItem
          heading="N2000"
          subHeading="WITHDRAWAL"
          rightSection={"Dec 12, 2018"}
        />
        <ListItem
          heading="N2000"
          subHeading="WITHDRAWAL"
          rightSection={"Dec 12, 2018"}
        />
        <ListItem
          Link={Link}
          to={this.toDetailPage()}
          heading="N2000"
          subHeading="EARNING"
          rightSection={"Dec 12, 2018"}
        />
        <ListItem
          heading="N2000"
          subHeading="BANK_CHARGE"
          rightSection={"Dec 12, 2018"}
        />
      </>
    );
  }
}
export class WDetailPage extends React.Component {
  render() {
    return (
      <Flex flexDirection="column">
        <Flex
          mb={4}
          flexDirection="column"
          css={css`
            align-items: center;
          `}
        >
          <Heading fontSize={5}>N10,000</Heading>
          <Text>to james@example.com</Text>
          <Button my={2} width={400}>
            Pay tutor
          </Button>
        </Flex>
        <Flex mb={4} flexDirection="column">
          <ListGroup name="Details" />
          <DetailItem label="Account Number">0003242333</DetailItem>
          <DetailItem label="Bank Name">GT Bank</DetailItem>
          <DetailItem label="Account Name">Shola Ameobi</DetailItem>
          <DetailItem label="Phone Number">07033223323</DetailItem>
          <DetailItem label="Amount in Wallet">N0</DetailItem>
        </Flex>
        <Flex mb={4} flexDirection="column">
          <Switch>
            <Route
              path="/withdrawals/1004/transactions"
              exact
              component={TransactionList}
            />
            <Route
              path="/withdrawals/1004/transactions/22"
              exact
              component={TransactionDetail}
            />
          </Switch>
        </Flex>
        <Button>Delete Withdrawal</Button>
      </Flex>
    );
  }
}

export default WDetailPage;
