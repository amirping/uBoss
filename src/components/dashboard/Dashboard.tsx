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
import * as cardsActions from "../../actions/cards";
import ImportedDashboardApi from "../../api/importedDashboardApi";
import { DragDropContext } from "react-beautiful-dnd";
export interface DashboardProps {}

export interface DashboardState {
  cardsData: any;
}

class Dashboard extends Component<any, DashboardState> {
  _cardsData: any = [];
  constructor(props: any) {
    super(props);
    console.log("start");

    this.state = {
      cardsData: []
    };
  }
  componentDidMount() {
    console.log("mounted");
  }
  cardsLoader = () => {
    if (this.props.dashboard_data != undefined && this.props.dashboard_data) {
      Object.keys(this.props.dashboard_data.lists).map(key => {
        this._cardsData[key] = {};

        // update state
        let cardsDataState = this.state.cardsData;
        cardsDataState[key] = {};
        this.setState({
          cardsData: cardsDataState
        });
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
                  !this.state.cardsData[remoteList.idlistLocal][
                    ImportedDash.remote_board_id
                  ]
                ) {
                  let cardsDataState = this.state.cardsData;
                  cardsDataState[remoteList.idlistLocal][
                    ImportedDash.remote_board_id
                  ] = [];
                  // this._cardsData[remoteList.idlistLocal][
                  //   ImportedDash.remote_board_id
                  // ] = [];

                  // update state
                  this.setState({
                    cardsData: cardsDataState
                  });
                }
                // this._cardsData[remoteList.idlistLocal][
                //   ImportedDash.remote_board_id
                // ] = this._cardsData[remoteList.idlistLocal][
                //   ImportedDash.remote_board_id
                // ].concat(result);
                let cardsDataState = this.state.cardsData;
                cardsDataState[remoteList.idlistLocal][
                  ImportedDash.remote_board_id
                ] = cardsDataState[remoteList.idlistLocal][
                  ImportedDash.remote_board_id
                ].concat(result);
                this.setState({
                  cardsData: cardsDataState
                });
                console.log(this.state.cardsData);
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
    console.log("UPDATE DASHBOARD - COMP");
    // get cards from remote boards and send each card for her list display
    // add socket here to notify whene we need to retrive data again
    //this.cardsLoader();
  }
  getRemoteListDistination = (
    idCard: string,
    DestinationLocalListID: string,
    sourceLocalListID: string
  ) => {
    let remoteListID = "";
    let remoteBoardID = "";
    const main_search_section = this.props.cards[sourceLocalListID];

    for (const key in main_search_section) {
      if (main_search_section.hasOwnProperty(key)) {
        const search_array: Array<any> = main_search_section[key];
        let ishere = search_array.filter(card => card.id === idCard);
        if (ishere.length > 0) {
          remoteBoardID = key;
          break;
        }
      }
    }
    if (remoteBoardID.length > 0) {
      const ImpDash = this.props.dashboard_data.importedDashboards.filter(
        (dash: any) => dash.remote_board_id === remoteBoardID
      );
      if (ImpDash[0]) {
        for (const key in ImpDash[0].mappedLists) {
          if (ImpDash[0].mappedLists.hasOwnProperty(key)) {
            const elem = ImpDash[0].mappedLists[key];
            if (elem.idlistLocal === DestinationLocalListID) {
              remoteListID = elem.idlistRemote;
            }
          }
        }
      }
    }
    return remoteListID;
  };
  onDragStart = () => {
    // TODO: render again
  };
  onDragEnd = (result: any) => {
    // TODO: render again
    console.log(result);
    if (result.destination != null) {
      if (result.destination.droppableId != result.source.droppableId) {
        const desti = this.getRemoteListDistination(
          result.draggableId,
          result.destination.droppableId,
          result.source.droppableId
        );
        if (desti.length > 0) {
          this.props.actions_card.updateCard(
            result.draggableId,
            "trello",
            { idList: desti },
            result.source.droppableId,
            result.destination.droppableId
          );
        } else {
          alert(
            "th board from wich the card belong , havn't any list mapped into this list"
          );
        }
      }
    } else {
      alert("drag it inside a list not out");
    }
  };
  onBeforeDragStart = () => {
    // TODO: render again
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
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}>
          <Box
            className="dash-lists"
            direction="row"
            justify="start"
            align="start"
            id="dash-lists"
            pad="small"
            gap="20px"
            fill>
            {Object.keys(this.props.dashboard_data.lists).map((listID: any) => (
              <ListItem
                key={listID}
                listData={this.props.dashboard_data.lists[listID]}
                cards={this.props.cards[listID]}
              />
            ))}
          </Box>
        </DragDropContext>
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
    cards: state.dashboards.cards,
    user: state.auth.user
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(dashboardsActions, dispatch),
    actions_card: bindActionCreators(cardsActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
