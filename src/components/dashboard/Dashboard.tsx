import React, { Component } from "react";
import { Box, Text, Heading, Paragraph } from "grommet";
import { IconButton, Icon, CircularProgress } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import "./Dashboard.css";
import img_Pick from "./pick.png";
import img_Bosst from "./animat-rocket-color.gif";
import ListItem from "../list/ListItem";
import DashboardConfig from "../dashboardConfig/DashboardConfig";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dashboardsActions from "../../actions/dashboards";
import ImportedDashboardApi from "../../api/importedDashboardApi";
export interface DashboardProps {}

export interface DashboardState {
  data: any;
}

class Dashboard extends Component<any, DashboardState> {
  _cardsData: any = [];
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    console.log("mounted");
  }
  cardsLoader = () => {
    if (this.props.dashboard_data != undefined && this.props.dashboard_data) {
      Object.keys(this.props.dashboard_data.lists).map(key => {
        this._cardsData[key] = {};
      });
      this.props.dashboard_data.importedDashboards.map((ImportedDash: any) => {
        // goes here
        const client_token = this.props.user.accounts[
          ImportedDash.dashboard_from
        ].token;
        // console.log(ImportedDash);
        // on item in mappedLists call request an push result to  _cardsData
        const mappedListsKeys = Object.keys(ImportedDash.mappedLists);
        mappedListsKeys.map(key => {
          const remoteList = ImportedDash.mappedLists[key];
          ImportedDashboardApi.getCards(
            remoteList.idlistRemote,
            ImportedDash.dashboard_from,
            client_token
          )
            .then(result => {
              if (result && result.length > 0) {
                if (
                  !this._cardsData[remoteList.idlistLocal][
                    ImportedDash.remote_board_id
                  ]
                ) {
                  this._cardsData[remoteList.idlistLocal][
                    ImportedDash.remote_board_id
                  ] = [];
                }
                this._cardsData[remoteList.idlistLocal][
                  ImportedDash.remote_board_id
                ] = this._cardsData[remoteList.idlistLocal][
                  ImportedDash.remote_board_id
                ].concat(result);
                console.log(this._cardsData);
              }
            })
            .catch(err => {
              console.log(err);
            });
        });
      });
    }
  };
  componentDidUpdate() {
    // get cards from remote boards and send each card for her list display
    // add socket here to notify whene we need to retrive data again
    this.cardsLoader();
  }
  // listRender = () => {
  //   return (
  //     <Box
  //       className="list-main"
  //       direction="column"
  //       border="all"
  //       width="medium"
  //       height="medium"
  //       margin={{ top: "xsmall" }}
  //       animation="fadeIn"
  //       background="dark-3">
  //       list here{" "}
  //     </Box>
  //   );
  // };
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
          {Object.keys(this.props.dashboard_data.lists).map((listID: any) => (
            <ListItem
              key={listID}
              listData={this.props.dashboard_data.lists[listID]}
              cards={this._cardsData[listID]}
            />
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
                src={img_Bosst}
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
    dashboard_data: state.dashboards.selectedDashboardData,
    user: state.auth.user
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
