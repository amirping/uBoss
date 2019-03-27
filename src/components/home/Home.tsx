import React, { Component } from "react";
import { Box, Text } from "grommet";

export interface HomeProps {}

export interface HomeState {}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
  }
  render() {
    return (
      <Box>
        <Text>This is Home</Text>
      </Box>
    );
  }
}

export default Home;
