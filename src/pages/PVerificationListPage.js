/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Box, Flex, Button, Text } from "@rebass/emotion";
import React from "react";
import { Input } from "../shared/LoginPage";
import { AsLink } from "./reusables";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider";
class FromTo extends React.Component {
  state = {
    from: "",
    to: ""
  };
  onChange = key => {
    return e => {
      this.setState({ [key]: e.target.value }, () => {
        this.props.onChange(this.state);
      });
    };
  };
  render() {
    return (
      <Flex>
        <Input
          label="From"
          type="date"
          isValid
          value={this.state.from}
          onChange={this.onChange("from")}
        />
        <Input
          value={this.state.to}
          label="To"
          type="date"
          isValid
          onChange={this.onChange("to")}
        />
      </Flex>
    );
  }
}

const DateFilter = ({ onChange, onSearchChange }) => {
  return (
    <Flex justifyContent="space-between">
      <Box
        w={1}
        pr={4}
        css={css`
          flex: 1;
          align-self: flex-end;
        `}
      >
        <Input
          onBlur={onSearchChange}
          isValid
          placeholder="Search either email or order "
        />
      </Box>
      <Flex flexDirection="column">
        <FromTo onChange={onChange} />
      </Flex>
    </Flex>
  );
};
export const PVerificationListItem = ({
  heading,
  subHeading,
  date,
  rightSection,
  verified = true,
  to,
  ...rest
}) => {
  return (
    <AsLink to={to} {...rest}>
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
          <Text>{date}</Text>
          <Text fontSize={5}>{heading}</Text>
          <Text>{subHeading}</Text>
        </Box>
        <Flex
          flexDirection="column"
          css={css`
            align-self: center;
            align-items: center;
          `}
        >
          <Box>{rightSection}</Box>
          {verified && <Text>✔</Text>}
        </Flex>
      </Flex>
    </AsLink>
  );
};

export class PVerificationListPage extends React.Component {
  static contextType = DataContext;
  state = {
    dateFilter: {},
    client_search: false,
    data: []
  };
  componentDidMount() {
    this.fetchList();
  }
  fetchList = (refresh = false) => {
    let { dispatch, actions } = this.context;
    dispatch({ type: actions.GET_HIRED_TRANSACTIONS, value: { refresh } }).then(
      data => {
        this.setState({ data });
      }
    );
  };
  onDateFilter = ({ from, to }) => {
    this.setState({ dateFilter: { from, to } });
  };
  render() {
    return (
      <Flex flexDirection="column">
        <Flex flexDirection="column">
          <DateFilter onChange={this.onDateFilter} />
          <label>
            <input
              checked={this.state.client_search}
              onChange={e => this.setState({ client_search: e.target.checked })}
              type="checkbox"
            />
            Client Search
          </label>
        </Flex>
        <Flex flexDirection="column">
          {this.state.data.map(transaction => (
            <PVerificationListItem
              key={transaction.order}
              date={transaction.date}
              heading={transaction.name}
              subHeading={transaction.email}
              rightSection={transaction.amount}
              to={this.props.detailPageUrl(transaction.order)}
              Link={Link}
            />
          ))}
        </Flex>
      </Flex>
    );
  }
}

export default PVerificationListPage;
