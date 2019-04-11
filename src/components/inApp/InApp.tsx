import React, { Component } from "react";
import { Box, ResponsiveContext, Collapsible } from "grommet";
import Dashboard from "../dashboard/Dashboard";
import Dashboards from "../dashboards/Dashboards";
import AppBar from "../appBar/appBar";
import { connect } from "react-redux";
import { loadUser } from "../../actions/user";

export interface InAppProps {}

export interface InAppState {}

class InApp extends Component<any, InAppState> {
  constructor(props: InAppProps) {
    super(props);
    this.state = { connected: false, user: {} }; // to be removed
  }
  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("user") || "null");
    const _token = localStorage.getItem("token");
    user.token = _token;
    this.props.loadUser(user);
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
    sideMenu: state.view.sideMenu
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadUser: (user: any) => dispatch(loadUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InApp);
