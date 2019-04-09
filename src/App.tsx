import React, { Component } from "react";
import { Grommet, Box, Heading } from "grommet";
import AuthComp from "./components/authComp/AuthComp";
import InApp from "./components/inApp/InApp";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import NoMatch from "./components/noMatch/NoMatch";
import Home from "./components/home/Home";
import { connect } from "react-redux";
import AccountsApprove from "./components/accountsApprove/AccountsApprove";
const theme = {
  global: {
    colors: {
      brand: "#8e44ad"
    },
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px"
    }
  }
};

export interface AppProps {}

export interface AppState {
  connected: Boolean;
}
class App extends Component<any, AppState> {
  constructor(props: any) {
    super(props);
    console.log("connected :", this.props.connected);
  }
  render() {
    return (
      <Grommet theme={theme} full>
        <Box fill>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/in"
                render={() =>
                  this.props.connected ? <InApp /> : <Redirect to="/auth" />
                }
              />
              <Route
                exact
                path="/auth"
                render={() =>
                  !this.props.connected ? <AuthComp /> : <Redirect to="/in" />
                }
              />
              <Route
                exact
                // render={() =>
                //   this.props.approvingAction ? (
                //     <AccountsApprove />
                //   ) : (
                //     <Redirect to="/in" />
                //   )
                // }
                path="/approveAccounts/:accountType/"
                component={AccountsApprove}
              />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </Box>
      </Grommet>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    connected: state.auth.connected,
    approvingAction: state.auth.approvingAction
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
