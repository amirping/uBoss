import React, { Component } from "react";
import { Grommet, Box, Heading } from "grommet";
import AuthComp from "./components/authComp/AuthComp";
import InApp from "./components/inApp/InApp";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
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
class App extends Component {
  render() {
    return (
      <Grommet theme={theme} full>
        <Box fill>
          <Router>
            {/*
          <AuthComp /> */}
            {/* <InApp /> */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/in" component={InApp} />
              <Route path="/auth" component={AuthComp} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </Box>
      </Grommet>
    );
  }
}

export default App;
