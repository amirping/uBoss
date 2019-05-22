import React, { Component } from "react";
import { Box, Text } from "grommet";
import { Typography } from "@material-ui/core";
import "./NoMatch.css";
export interface NoMatchProps {}

export interface NoMatchState {}

class NoMatch extends Component<NoMatchProps, NoMatchState> {
  constructor(props: NoMatchProps) {
    super(props);
  }
  render() {
    return (
      <Box
        className="coverIt"
        fill
        direction="column"
        alignContent="center"
        justify="center"
        alignSelf="center">
        <Box
          fill="horizontal"
          direction="row"
          alignContent="center"
          justify="center"
          alignSelf="center"
          pad="small">
          <Box direction="row-responsive">
            <Box direction="column" justify="center" flex>
              <Typography variant="display3">404 AY AY!</Typography>
              <Typography variant="display1">
                It look that you get lost dude! Anyway we get your back click{" "}
                <a href="/in">Here</a> and you will get to safe again.
              </Typography>
            </Box>
            <Box width="490px">
              <img
                width="490"
                src="https://i.gifer.com/yH.gif"
                alt="where are you"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default NoMatch;
