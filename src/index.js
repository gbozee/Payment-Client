/** @jsx jsx */
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { css, jsx } from "@emotion/core";
import { Flex } from "@rebass/emotion";
import { Redirect, Link, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "tuteria-shared/lib/shared/ProtectedRoute";
import devAdapter from "./adapters/devProd";
import WithRouter from "tuteria-shared/lib/shared/PageSetup";
import appContext from "./paymentContext";
// import appFirebase from "./adapters/backupFirebase";
// import WithRouter from "./shared/PageSetup";

const WDetailPage = React.lazy(() =>
  import("tuteria-shared/lib/pages/WDetailPage")
);
const WListPage = React.lazy(() => import("tuteria-shared/lib/pages/WListPage"));
// const PVerificationDetailPage = React.lazy(() =>
//   import(`./pages/PVerificationDetailPage`)
// );
// const VTransactionPage = React.lazy(() => import(`./pages/VTransactionPage`));
// const PVerificationListPage = React.lazy(() =>
//   import(`./pages/PVerificationListPage`)
// );

function App() {
  return (
    <WithRouter
      adapter={devAdapter}
      context={appContext}
      RouterComponent={BrowserRouter}
      // firebase={appFirebase}
      toNextPage={props => props.history.push("/withdrawals")}
      heading={
        <Flex
          pb={3}
          justifyContent="space-between"
          css={css`
            flex-wrap: wrap;
            > a {
              padding-right: 10px;
              padding-bottom: 10px;
            }
          `}
        >
          <Link to="/withdrawals">Withdrawal List Page</Link>
          <Link to="/payment-verifications">Verification List Page</Link>
          <Link to="/verified-transactions">Verified Transactions Page</Link>
        </Flex>
      }
    >
      {/* <ProtectedRoute
        path="/payment-verifications"
        exact
        render={props => {
          return (
            <PVerificationListPage
              detailPageUrl={order => `/payment-verifications/${order}`}
              {...props}
            />
          );
        }}
      /> */}
      {/* <ProtectedRoute
        path="/verified-transactions"
        exact
        render={props => {
          return (
            <VTransactionPage
              detailPageUrl={order => `/payment-verifications/${order}`}
              {...props}
            />
          );
        }}
      />
      <ProtectedRoute
        path="/payment-verifications/:order"
        render={props => {
          return <PVerificationDetailPage {...props} />;
        }}
      /> */}
      <ProtectedRoute
        path="/withdrawals"
        exact
        render={props => {
          return (
            <WListPage
              {...props}
              detailPageUrl={order => `/withdrawals/${order}/transactions`}
            />
          );
        }}
      />
      <ProtectedRoute path="/withdrawals/:order" component={WDetailPage} />

      <Redirect to="/withdrawals" />
    </WithRouter>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
