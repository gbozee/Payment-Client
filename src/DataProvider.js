import React from "react";

export const DataContext = React.createContext({
  state: {},
  dispatch: () => {},
  actions: {}
});
const actions = {
  GET_WITHDRAWALS: "GET_WITHDRAWALS"
};
export class DataProvider extends React.Component {
  dispatch = (action, callback) => {
    if (action.type === actions.GET_WITHDRAWALS) {
      return this.fetchWithdrawals(action.value, callback);
    }
  };
  state = {
    context: {
      state: {
        withdrawals: this.props.test ? testData() : []
      },
      dispatch: this.dispatch,
      actions
    }
  };
  updateState = obj => {
    let { context } = this.state;
    this.setState({
      context: { ...context, state: { ...context.state, ...obj } }
    });
  };
  fetchWithdrawals = (refresh, callback) => {
    let { withdrawals } = this.state.context.state;
    if (!Boolean(refresh) && withdrawals.length > 0) {
      return new Promise(resolve => resolve(withdrawals));
    }
    return fetchWithdrawals().then(data => {
      this.updateState({ withdrawals: data });
      callback(data);
      return data;
    });
  };
  render() {
    return (
      <DataContext.Provider value={this.state.context}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
function testData() {
  return [
    {
      amount: "N20,000",
      email: "james@example.com",
      date: "2018-10-12 14:10:33",
      order: "1002"
    },
    {
      amount: "N10,000",
      email: "gbozee@example.com",
      date: "2018-10-11 12:30:33",
      order: "1003"
    },
    {
      amount: "N10,000",
      email: "gbozee@example.com",
      date: "2018-10-12 9:20:33",
      order: "1001"
    },
    {
      amount: "N10,000",
      email: "gbozee@example.com",
      date: "2018-10-10 9:20:33",
      order: "1004"
    },
    {
      amount: "N10,500",
      email: "shola@example.com",
      date: "2018-10-10 9:20:33",
      order: "1005"
    }
  ];
}
function fetchWithdrawals() {
  return new Promise(resolve => resolve(testData()));
}

export default DataProvider;
