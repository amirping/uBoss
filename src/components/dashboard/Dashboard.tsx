import React, { Component } from "react";
import { Box, Text, Heading } from "grommet";
import { IconButton, Icon } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import "./Dashboard.css";
export interface DashboardProps {}

export interface DashboardState {
  data: any;
}

class Dashboard extends Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);
    this.state = {
      data: {
        name: "Alpha Main Dashboard",
        descrip:
          "lorem ispiskjd nfksdkf nkjsdn fsdhjf gjqdsjfbjdsqfjbsqdjfb jhsqdf jbsd jfbsqjdfbjqsdfj bsqdjfbjds fjsdfjbsqdjf bjqdsbf jqsdf jbsdqjf bjsqdbf jsqdf jbsqdjfbjqsdbf jqdsf jbqsdjfbsd ",
        lists: [
          { key: "done", title: "done" },
          { key: "progress", title: "progress" },
          { key: "progressss", title: "progressss" }
          // { key: "donesd", title: "donesd" },
          // { key: "done", title: "done" },
          // { key: "done", title: "done" },
          // { key: "done", title: "done" }
        ]
      }
    };
  }
  listRender = () => {
    return (
      <Box
        className="list-main"
        direction="column"
        border="all"
        width="medium"
        height="medium"
        margin={{ top: "xsmall" }}
        animation="fadeIn"
        background="dark-3">
        list here{" "}
      </Box>
    );
  };
  dashRender = () => {
    const lists = this.state.data.lists.map(this.listRender);
    return (
      <Box direction="column" fill>
        <Box
          direction="row"
          pad="medium"
          id="dash-header"
          border="bottom"
          gap="10px">
          <Text size="xxlarge" truncate={true} className="dash-name">
            {this.state.data.name}
          </Text>
          <IconButton>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box
          className="dash-lists"
          direction="row-responsive"
          justify="center"
          align="center"
          id="dash-lists"
          pad="small"
          gap="20px"
          fill>
          {lists}
        </Box>
      </Box>
    );
  };

  render() {
    return (
      <Box direction="row" fill background="dark-2">
        {this.state.data && this.state.data != null ? (
          <this.dashRender />
        ) : (
          <Box>
            <Text>
              Select a dashbord from the list at the left or create a new one
            </Text>
          </Box>
        )}
      </Box>
    );
  }
}

export default Dashboard;
