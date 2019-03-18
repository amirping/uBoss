import React, { Component } from "react";
import { Box, Text } from "grommet";

export interface AppBarProps {}

export interface AppBarState {}

class AppBar extends Component<AppBarProps, AppBarState> {
  constructor(props: AppBarProps) {
    super(props);
    this.state = { connected: false };
  }
  render() {
    return (
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
        <Text size="large" weight={500}>
          uBoos
        </Text>
      </Box>
    );
  }
}

export default AppBar;
