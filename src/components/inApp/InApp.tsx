import React, { Component } from "react";
import { Box, ResponsiveContext, Collapsible } from "grommet";
import Dashboard from "../dashboard/Dashboard";
import Dashboards from "../dashboards/Dashboards";
import AppBar from "../appBar/appBar";

export interface InAppProps {}

export interface InAppState {
  connected: Boolean;
  user: {};
}

class InApp extends Component<InAppProps, InAppState> {
  constructor(props: InAppProps) {
    super(props);
    this.state = { connected: false, user: {} };
  }
  render() {
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Box direction="column" fill>
            <AppBar />
            <Box direction="row" fill="vertical" background="dark-1">
              <Collapsible open={size != "small"} direction="horizontal">
                <Dashboards />
              </Collapsible>
              <Dashboard />
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

export default InApp;
