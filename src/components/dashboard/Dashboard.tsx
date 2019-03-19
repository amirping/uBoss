import React, { Component } from "react";
import { Box, Text } from "grommet";

export interface DashboardProps {}

export interface DashboardState {
  data: any;
}

class Dashboard extends Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);
    this.state = { data: null };
  }
  render() {
    return (
      <Box direction="row" fill background="dark-2">
        {this.state.data && this.state.data != null ? (
          <span>Content going here</span>
        ) : (
          <Box>
            <Text>
              Select a dashbord from the list at the left or create a new one{" "}
            </Text>
          </Box>
        )}
      </Box>
    );
  }
}

export default Dashboard;
