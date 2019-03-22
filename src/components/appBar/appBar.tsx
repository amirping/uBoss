import React, { Component } from "react";
import { Box, Text, ResponsiveContext } from "grommet";
import { IconButton, MenuItem, Menu } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import UserProfile from "../userProfile/UserProfile";
export interface AppBarProps {}

export interface AppBarState {
  connected: Boolean;
}

class AppBar extends Component<AppBarProps, AppBarState> {
  constructor(props: AppBarProps) {
    super(props);
    this.state = { connected: true };
  }

  toggleMenu = () => {
    return null;
  };

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
                    this.toggleMenu;
                  }}>
                  <MenuIcon />
                </IconButton>
              )}
              <Text size="large" weight={500} alignSelf="center">
                uBoos
              </Text>
            </Box>
            {this.state.connected && (
              <Box>
                <UserProfile />
              </Box>
            )}
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

export default AppBar;
