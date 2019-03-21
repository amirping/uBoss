import React, { Component } from "react";
import { Box, Text, ResponsiveContext } from "grommet";
import { IconButton, MenuItem, Menu } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
export interface AppBarProps {}

export interface AppBarState {
  connected: Boolean;
  anchorEl: null;
}

class AppBar extends Component<AppBarProps, AppBarState> {
  constructor(props: AppBarProps) {
    super(props);
    this.state = { connected: true, anchorEl: null };
  }

  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  toggleMenu = () => {
    return null;
  };

  render() {
    const { anchorEl } = this.state;
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
                <IconButton
                  aria-owns={anchorEl ? "profile-menu" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>
              </Box>
            )}
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

export default AppBar;
