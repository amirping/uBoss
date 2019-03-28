import React, { Component } from "react";
import { Box, Text, ResponsiveContext } from "grommet";
import { IconButton, MenuItem, Menu } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import UserProfile from "../userProfile/UserProfile";
import { connect } from "react-redux";
import { toggleSide } from "../../actions";
export interface AppBarProps {}

export interface AppBarState {}

class AppBar extends Component<any, AppBarState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Box
            tag="header"
            direction="row"
            align="center"
            justify="between"
            background="brand"
            pad={{ left: "medium", right: "small", vertical: "small" }}
            elevation="medium"
            style={{ zIndex: 1 }}
            {...this.props}>
            <Box direction="row">
              {size == "small" && (
                <IconButton
                  disableRipple={true}
                  onClick={() => {
                    this.props.toogleSide();
                  }}>
                  <MenuIcon />
                </IconButton>
              )}
              <Text size="large" weight={500} alignSelf="center">
                uBoos
              </Text>
            </Box>
            <Box>
              <UserProfile />
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    toogleSide: () => dispatch(toggleSide())
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AppBar);
