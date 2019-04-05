import React, { Component } from "react";
import { Box, Text, Heading, Paragraph } from "grommet";
import { IconButton, Icon, CircularProgress } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import "./Dashboard.css";
import img_Pick from "./pick.png";
import img_Boost from "./animat-rocket-color.gif";
import ListItem from "../list/ListItem";
import DashboardConfig from "../dashboardConfig/DashboardConfig";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dashboardsActions from "../../actions/dashboards";
export interface DashboardProps {}

export interface DashboardState {
  data: any;
}

class Dashboard extends Component<any, DashboardState> {
  constructor(props: any) {
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
  DashRender = () => {
    return (
      <Box direction="column" fill>
        <Box
          direction="row"
          pad="medium"
          id="dash-header"
          border="bottom"
          gap="10px">
          <Text size="xxlarge" truncate={true} className="dash-name">
            {this.props.dashboard_data.title}
          </Text>
          <DashboardConfig />
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
          {/* {this.state.data.lists.map((list: any) => (
            <ListItem key={list.key} />
          ))} */}
          {Object.keys(this.props.dashboard_data.lists).map((listID: any) => (
            <ListItem key={listID} />
          ))}
        </Box>
      </Box>
    );
  };
  DataLoader = () => {
    return this.props.dashboard_data &&
      this.props.dashboard_data.length !== 0 ? (
      <this.DashRender />
    ) : (
      <Box fill flex direction="column" justify="around">
        <Box direction="row" justify="around">
          <CircularProgress color="secondary" style={{ margin: "auto" }} />
        </Box>
      </Box>
    );
  };
  render() {
    return (
      <Box direction="row" fill background="dark-2">
        {/* {this.state.data && this.state.data != null ? (
          <this.DashRender />
        ) : (
          <Box>
            <Text>
              Select a dashbord from the list at the left or create a new one
            </Text>
          </Box>
        )} */}
        {this.props.selected_dashboard &&
        this.props.selected_dashboard.length !== 0 ? (
          <this.DataLoader />
        ) : (
          <Box fill flex direction="column" justify="around">
            <Box direction="row" justify="around">
              <img
                src={img_Boost}
                alt="where are you"
                height="400px"
                style={{ opacity: 0.5 }}
              />
            </Box>
            <Box fill="horizontal" direction="row" justify="around">
              <Paragraph margin="small" size="large">
                Hi There, happy to see you here 😀. you can start by creating
                adashbaord if you haven't . else select on from your dashboards
                to start the show
              </Paragraph>
            </Box>
            {/* <img src="https://i.gifer.com/yH.gif" alt="where are you" /> */}
          </Box>
        )}
      </Box>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    success: state.dashboards.success,
    error: state.dashboards.error,
    selected_dashboard: state.dashboards.selectedDashboardID,
    dashboard_data: state.dashboards.selectedDashboardData
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // openCreator: () => dispatch(openDashboardCreator()),
    // closeCreator: () => dispatch(closeDashboardCreator()), --> will changed by dashconfig
    actions: bindActionCreators(dashboardsActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
