import React, { Component } from "react";
import { Box, Text, Paragraph } from "grommet";
import "./Home.css";
import { Typography, Button } from "@material-ui/core";
export interface HomeProps {}

export interface HomeState {}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
  }
  render() {
    return (
      <Box fill align="center" justify="center">
        <Box direction="column" align="center" justify="center">
          <Box direction="row" align="center">
            <Box
              direction="row"
              className="main-small"
              align="start"
              pad="small"
              background="light-1"
              round="xsmall"
              elevation="small">
              <Box fill="vertical" align="center" justify="center" pad="large">
                <Typography variant="h1" gutterBottom>
                  uBoss
                </Typography>
              </Box>
              <Box fill="vertical">
                <Typography variant="h4" gutterBottom>
                  The Ultimate Boards Management Application
                </Typography>
                <Typography variant="h6" gutterBottom>
                  - Manage exesting Boards on differnt tools
                </Typography>
                <Typography variant="h6" gutterBottom>
                  - Benifit from Boards Merge feautres
                </Typography>
                <Typography variant="h6" gutterBottom>
                  - Stats feautres to better Bossing
                </Typography>
                <Box
                  direction="row"
                  fill="horizontal"
                  align="center"
                  justify="center">
                  <Button variant="raised" href="in">
                    Get Start
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <div className="coverbg1" />
        <div className="coverbg2" />
      </Box>
    );
  }
}

export default Home;
