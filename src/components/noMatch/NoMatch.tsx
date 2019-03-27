import React, { Component } from "react";
import { Box, Text } from "grommet";
export interface NoMatchProps {}

export interface NoMatchState {}

class NoMatch extends Component<NoMatchProps, NoMatchState> {
  constructor(props: NoMatchProps) {
    super(props);
  }
  render() {
    return (
      <Box alignContent="center" alignSelf="center">
        <Text size="xlarge">404 Will never Found it</Text>
      </Box>
    );
  }
}

export default NoMatch;
