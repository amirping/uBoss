import React, { Component } from "react";
import { Box } from "grommet";
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
      <Box direction="column" fill>
        <AppBar />
        <Box direction="row-responsive" fill background="dark-3">
          <Dashboards />
          <Dashboard />
        </Box>
      </Box>
    );
  }
}

export default InApp;
