import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import LoginPage from "../pages/LoginPage";
import WListPage, { ListItem, ListGroup } from "../pages/WListPage";
import WDetailPage from "../pages/WDetailPage";
import DataProvider from "../DataProvider";
import { MemoryRouter as Router, Route, Switch } from "react-router";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

const WithRouter = ({ children, initialIndex = 0, test = true }) => {
  return (
    <DataProvider test={test}>
      <Router
        initialEntries={["/withdrawals", "/withdrawals/1004/transactions"]}
        initialIndex={initialIndex}
      >
        <Switch>{children}</Switch>
      </Router>
    </DataProvider>
  );
};
storiesOf("Pages", module)
  .add("Login Page", () => (
    <LoginPage
      login={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // resolve();
            reject({ data: "The credentials is invalid" });
          }, 2000);
        });
      }}
      toNextPage={() => {}}
    />
  ))
  .add("Withdrawal List Page", () => (
    <WithRouter test={false}>
      <Route
        path="/withdrawals"
        exact
        render={() => {
          return <WListPage detailPageUrl={order => `/withdrawals/${order}`} />;
        }}
      />
      <Route path="/withdrawals/:order" component={WDetailPage} />
    </WithRouter>
  ))
  .add("Withdrawal Detail Page", () => (
    <WithRouter initialIndex={1}>
      <Route path="/withdrawals/:order" component={WDetailPage} />
    </WithRouter>
  ));

storiesOf("Components", module)
  .add("ListItem", () => (
    <ListItem
      to="http:/www.google.com"
      heading="N10,000"
      subHeading="james@example.com"
      rightSection="10:00 am"
    />
  ))
  .add("List Group", () => <ListGroup name="December, 12 2018" />);
