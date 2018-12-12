import React from "react";
import { Route, Redirect } from "react-router";
import { HomePageSpinner } from "./pages/primitives/Spinner";
import { loadState, saveState } from "./localStorage";
export const DataContext = React.createContext({
  state: {},
  dispatch: () => {},
  actions: {}
});

export class ProtectedRoute extends React.Component {
  static contextType = DataContext;
  state = {
    authenticated: null
  };
  componentDidMount() {
    this.isAuthenticated();
  }
  isAuthenticated() {
    let { dispatch, actions } = this.context;
    let exists = dispatch({ type: actions.TOKEN_EXIST });
    this.setState({ authenticated: exists });
    return dispatch({ type: actions.AUTHENTICATE })
      .then(data => {
        this.setState({ authenticated: data });
      })
      .catch(error => {
        this.setState({ autthenticated: false });
      });
  }
  render() {
    let { authenticated } = this.state;
    if (authenticated === null) {
      return <HomePageSpinner />;
    }
    if (authenticated === false) {
      return <Redirect to="/login" />;
    }
    return <Route {...this.props} />;
  }
}

const actions = {
  GET_WITHDRAWALS: "GET_WITHDRAWALS",
  GET_WITHDRAWAL: "GET_WITHDRAWAL",
  MAKE_PAYMENT: "MAKE_PAYMENT",
  GET_BOOKING_TRANSACTION: "GET_BOOKING_TRANSACTION",
  DELETE_TRANSACTION: "DELETE_TRANSACTIONS",
  GET_WITHDRAWAL_TRANSACTIONS: "GET_WITHDRAWAL_TRANSACTIONS",
  AUTHENTICATE: "AUTHENTICATE",
  TOKEN_EXIST: "TOKEN_EXIST",
  LOGIN_USER: "LOGIN_USER"
};
export class DataProvider extends React.Component {
  dispatch = action => {
    let options = {
      [actions.GET_WITHDRAWALS]: this.fetchWithdrawals,
      [actions.GET_WITHDRAWAL]: this.getWithdrawalDetail,
      [actions.MAKE_PAYMENT]: this.makePayment,
      [actions.DELETE_WITHDRAWAL]: this.deleteWithdrawal,
      [actions.GET_BOOKING_TRANSACTION]: this.fetchBookingTransaction,
      [actions.DELETE_TRANSACTION]: this.deleteTransaction,
      [actions.GET_WITHDRAWAL_TRANSACTIONS]: this.getWithdrawalTransactions,
      [actions.TOKEN_EXIST]: this.tokenExist,
      [actions.AUTHENTICATE]: this.authenticateUser,
      [actions.LOGIN_USER]: this.loginUser
    };
    if (this.props.test) {
      console.log(action);
    }
    return options[action.type](action.value);
  };
  state = {
    context: {
      state: {
        auth: false,
        withdrawals: this.props.test ? this.props.testData.withdrawals : []
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
  fetchWithdrawals = refresh => {
    let { withdrawals } = this.state.context.state;
    if (!Boolean(refresh) && withdrawals.length > 0) {
      return new Promise(resolve => resolve(withdrawals));
    }
    let { testData } = this.props;
    return new Promise(resolve => resolve(testData.withdrawals));
  };
  getToken() {
    let { test } = this.props;
    let data = test ? { token: "TESTDATATOKEN" } : loadState();
    if (Boolean(data)) {
      return data.token;
    }
    return undefined;
  }
  tokenExist = () => {
    return Boolean(this.getToken());
  };
  authenticateUser = () => {
    let { auth } = this.state.context.state;
    if (auth) {
      return new Promise(resolve => resolve(true));
    }
    return this.props.authenticateUser(this.getToken()).then(data => {
      this.updateState({ auth: data });
      return true;
    });
  };
  makePayment = order => {
    let { withdrawals } = this.state.context.state;
    return new Promise((resolve, reject) => {
      this.updateState({
        withdrawals: withdrawals.filter(x => x.order !== order)
      });
      resolve();
    });
  };
  deleteWithdrawal = order => {
    let { withdrawals } = this.state.context.state;
    return new Promise((resolve, reject) => {
      this.updateState({
        withdrawals: withdrawals.filter(x => x.order !== order)
      });
      resolve();
    });
  };
  getWithdrawalDetail = order => {
    return this.state.context.state.withdrawals.find(x => x.order === order);
  };
  fetchBookingTransaction = booking_order => {
    let { testData } = this.props;
    return new Promise(resolve => resolve(testData.bookingTransaction));
  };
  loginUser = ({ email, password }) => {
    let { test } = this.props;
    saveState({ token: "" });
    this.updateState({ auth: true });
    return new Promise(resolve => {
      resolve();
    });
  };
  getWithdrawalTransactions = withdrawal_order => {
    let { testData } = this.props;
    return new Promise(resolve => resolve(testData.transactions));
  };
  deleteTransaction = order => {
    return new Promise(resolve => resolve({}));
  };
  render() {
    return (
      <DataContext.Provider value={this.state.context}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default DataProvider;
