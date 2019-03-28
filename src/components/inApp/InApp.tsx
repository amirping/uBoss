import React, { Component } from "react";
import { Box, ResponsiveContext, Collapsible } from "grommet";
import Dashboard from "../dashboard/Dashboard";
import Dashboards from "../dashboards/Dashboards";
import AppBar from "../appBar/appBar";
import { connect } from "react-redux";

export interface InAppProps {}

export interface InAppState {}

class InApp extends Component<any, InAppState> {
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
              <Collapsible
                open={size != "small" || this.props.sideMenu}
                direction="horizontal">
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
const mapStateToProps = (state: any) => {
  return {
    sideMenu: state.sideMenu
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InApp);
