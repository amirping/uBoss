import React, { Component } from "react";
import { Box, Text, Paragraph } from "grommet";
import {
  CircularProgress,
  Paper,
  InputBase,
  IconButton,
  Divider,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";
import "./Dashboard.css";
import img_Bosst from "./animat-rocket-color.gif";
import ListItem from "../list/ListItem";
import DashboardConfig from "../dashboardConfig/DashboardConfig";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dashboardsActions from "../../actions/dashboards";
import * as cardsActions from "../../actions/cards";
import ImportedDashboardApi from "../../api/importedDashboardApi";
import { DragDropContext } from "react-beautiful-dnd";
import { closeCardData, toogleStatsView } from "../../actions/view";
import CardData from "../cardData/CardData";
import ViewConfig from "../viewConfig/ViewConfig";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import BarChart from "@material-ui/icons/BarChart";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector
} from "recharts";
export interface DashboardProps {}

export interface DashboardState {
  cardsData: any;
}

class Dashboard extends Component<any, DashboardState> {
  _cardsData: any = []; // no need
  inputSearch: any;
  constructor(props: any) {
    super(props);
    this.inputSearch = React.createRef();
  }
  componentDidMount() {
    console.log("mounted dashboard");
  }
  handleClear = () => {
    this.inputSearch.current.value = "";
    this.props.actions_card.searchCard(this.inputSearch.current.value);
  };
  handleSearch = () => {
    this.props.actions_card.searchCard(this.inputSearch.current.value);
  };
  // handleSearchChange = (ev: any) => {
  //   this.searchString = ev.target.value;
  // };
  /**
   * cardsLoader off -> we use redux now to get cards
   */
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
  /**
   * used for search
   */
  cardsFilter = (intialData: any) => {
    Object.keys(intialData).map((remoteId: any) => {
      const remoteCards: Array<any> = intialData[remoteId];
      let retData = remoteCards.filter((card: any) =>
        card.name.includes(this.inputSearch.current.value)
      );
      console.log(retData);
      intialData[remoteId] = retData;
    });
    // console.log(intialData);
    return intialData;
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
  toogleCharts = () => {
    this.props.toogleStatsView();
  };
  renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333">{`PV ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  DashRender = () => {
    const data01 = [
      {
        name: "Group A",
        value: 400
      },
      {
        name: "Group B",
        value: 300
      },
      {
        name: "Group C",
        value: 300
      },
      {
        name: "Group D",
        value: 200
      },
      {
        name: "Group E",
        value: 278
      },
      {
        name: "Group F",
        value: 189
      }
    ];
    return (
      <Box direction="column" fill>
        <Box
          direction="row"
          pad="medium"
          id="dash-header"
          border="bottom"
          gap="10px"
          justify="between">
          <Box direction="row">
            <Text size="xxlarge" truncate={true} className="dash-name">
              {this.props.dashboard_data.title}
            </Text>
            <DashboardConfig />
          </Box>
          <Box direction="row">
            <Box
              direction="row"
              background="dark-3"
              round="xsmall"
              pad={{ left: "3px" }}>
              <Box direction="column" align="center" justify="center">
                <InputBase
                  className="searchInput"
                  placeholder="Search for cards"
                  inputRef={this.inputSearch}
                />
              </Box>
              <Box direction="column" align="center" justify="center">
                <IconButton aria-label="Search" onClick={this.handleSearch}>
                  <SearchIcon />
                </IconButton>
              </Box>
              <Box direction="column" align="center" justify="center">
                <IconButton
                  color="primary"
                  aria-label="Directions"
                  onClick={this.handleClear}>
                  <ClearIcon />
                </IconButton>
              </Box>
            </Box>
            <Box direction="column" align="center" justify="center">
              <ViewConfig />
            </Box>
            <Box direction="column" align="center" justify="center">
              <IconButton aria-label="Directions" onClick={this.toogleCharts}>
                <BarChart />
              </IconButton>
            </Box>
          </Box>
        </Box>
        {this.props.statsView ? (
          <Box direction="column" fill animation="fadeIn">
            <Box>
              <Typography variant="h5">Dashboard Stats</Typography>
            </Box>
            <Box direction="column">
              <Typography variant="h5">Card's Stats</Typography>
              <Box direction="row">
                <PieChart width={730} height={250}>
                  <Pie
                    data={data01}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                    fill="#8884d8"
                  />
                  <Pie
                    data={data02}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#82ca9d"
                    label
                  />
                </PieChart>
                <PieChart width={400} height={400}>
                  <Pie
                    activeIndex={1}
                    activeShape={this.renderActiveShape}
                    data={data01}
                    cx={200}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  />
                </PieChart>
              </Box>
            </Box>
            <Box direction="column">
              <Typography variant="h5">Boards's Stats</Typography>
              <Box direction="row-responsive" />
            </Box>
            <Box direction="column">
              <Typography variant="h5">General Stats</Typography>
              <Box direction="row-responsive" />
            </Box>
          </Box>
        ) : (
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
              {Object.keys(this.props.dashboard_data.lists).map(
                (listID: any) => (
                  <ListItem
                    key={listID}
                    listData={this.props.dashboard_data.lists[listID]}
                    cards={this.cardsFilter(this.props.cards[listID])}
                    // cards={this.cardsFilter(this.props.cards[listID])} // old search method
                  />
                )
              )}
            </Box>
          </DragDropContext>
        )}
      </Box>
    );
  };
  handleClose = () => {
    this.props.closeCardData();
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
  getAttachmentCover = (idAttachment: string, attachments: Array<any>) => {
    let v = attachments.filter(x => x.id === idAttachment);
    return v[0];
  };
  CardDialog = () => {
    return this.props.selectedCard && <CardData />;
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
        <this.CardDialog />
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
    user: state.auth.user,
    cardDataDialog: state.view.cardData,
    statsView: state.view.statsView,
    selectedCard: state.dashboards.selectedCard
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(dashboardsActions, dispatch),
    actions_card: bindActionCreators(cardsActions, dispatch),
    toogleStatsView: () => dispatch(toogleStatsView()),
    closeCardData: () => dispatch(closeCardData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
