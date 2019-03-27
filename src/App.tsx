import React, { Component } from "react";
import { Grommet, Box, Heading } from "grommet";
import AuthComp from "./components/authComp/AuthComp";
import InApp from "./components/inApp/InApp";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import NoMatch from "./components/noMatch/NoMatch";
import Home from "./components/home/Home";
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
class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { connected: false };
  }
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      this.setState({ connected: true });
    } else {
      this.setState({ connected: false });
    }
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
                  this.state.connected ? <InApp /> : <Redirect to="/auth" />
                }
              />
              <Route
                exact
                path="/auth"
                render={() =>
                  !this.state.connected ? <AuthComp /> : <Redirect to="/in" />
                }
              />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </Box>
      </Grommet>
    );
  }
}
export default App;
