import React, { Component } from "react";
import { Grommet, Box, Heading } from "grommet";
import AuthComp from "./components/authComp/AuthComp";
import InApp from "./components/inApp/InApp";
const theme = {
  global: {
    colors: {
      brand: "#8e44ad"
    },
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px"
    }
  }
};
class App extends Component {
  render() {
    return (
      <Grommet theme={theme} full>
        <Box fill>
          {/* <AppBar />
          <AuthComp /> */}
          <InApp />
        </Box>
      </Grommet>
    );
  }
}

export default App;
