import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogActions,
  Button,
  DialogContent,
  List,
  TextField,
  InputBase,
  ListItem,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  ExpansionPanelActions,
  Select,
  MenuItem,
  Divider,
  OutlinedInput,
  Switch,
  ListItemIcon
} from "@material-ui/core";
import { Connect, Connectivity, Unlink } from "grommet-icons";
import { shortName } from "../../utils";
import uuidv1 from "uuid";
import { Box, Tabs, Tab, Form, Text, Paragraph } from "grommet";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dashboardsActions from "../../actions/dashboards";
import * as userActions from "../../actions/user";
import * as importedDashboardsActions from "../../actions/importedDashboards";
import { openDashboardConfig, closeDashboardConfig } from "../../actions/view";
import userApi from "../../api/userApi";
import "./DashboardConfig.css";
import { startApproveAccount, endApproveAccount } from "../../actions/user";
import TrelloApi from "../../api/trelloApi";
import importedDashboardApi from "../../api/importedDashboardApi";
export interface DashboardConfigProps {}

export interface DashboardConfigState {
  show: boolean;
  listAdder: string;
  dashboardData: any;
}

class DashboardConfig extends Component<any, DashboardConfigState> {
  _name: any;
  _descrp: any;
  _listAdderField: any;
  _listsForUpdate: string[] = [];
  _token: any;
  _newListsForUpdate: any;
  _userAccountsBoards: any = {};
  _importeddashboardsRemoteData: any[] = [];
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    console.log("mounted");
    this._token = localStorage.getItem("token");
    this._listsForUpdate = Object.keys(this.props.dashboard_data.lists);
    this._newListsForUpdate = this.props.dashboard_data.lists;
    if (
      this.props.user.accounts &&
      Object.keys(this.props.user.accounts).length > 0
    ) {
      console.log("start fetching for accounts");
      const allAccounts = Object.keys(this.props.user.accounts);
      allAccounts.map((account: any) => {
        const accountD = this.props.user.accounts[account];
        this._userAccountsBoards[accountD.accountType] = {};
        this.getAllBoardRemoteData();
        switch (accountD.accountType) {
          case "trello": {
            console.log("trello start loading");
            TrelloApi.getUser(accountD.token)
              .then(response => {
                this._userAccountsBoards[accountD.accountType][
                  "user"
                ] = response;
              })
              .catch(error => {
                console.log(error);
              });
            TrelloApi.getBoards(accountD.token)
              .then(response => {
                this._userAccountsBoards[accountD.accountType][
                  "boards"
                ] = response;
                console.log(this._userAccountsBoards);
              })
              .catch(error => {
                console.log(error);
                // tell user about that
              });
            break;
          }
          default:
            console.log("some accounts are not supported right now");
            break;
        }
      });
    }
  }

  getAllBoardRemoteData() {
    this.props.dashboard_data.importedDashboards.map((dash: any) => {
      const client_token = this.props.user.accounts[dash.dashboard_from].token;
      importedDashboardApi
        .getRemoteBoardData(
          dash.remote_board_id,
          dash.dashboard_from,
          client_token
        )
        .then(response => {
          if (response && response.id) {
            this._importeddashboardsRemoteData.push(response);
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  handleCreateImportedDashboard = (
    id_remoteBoard: string,
    accountType: string
  ) => {
    console.log("Create an ImportedBoard with remote_id === ", id_remoteBoard);
    this.props.importedDashboardsActions.createImportedDashboard(
      this.props.selected_dashboard,
      this._token,
      { dashboard_from: accountType, remote_board_id: id_remoteBoard }
    );
  };
  handleDeleteImportedDashboard = (id_remoteBoard: string) => {
    console.log("Delete the ImportedBoard with remote_id === ", id_remoteBoard);
    const id_importedBoard = this.props.dashboard_data.importedDashboards.filter(
      (s: any) => s.remote_board_id === id_remoteBoard
    )[0]._id;
    this.props.importedDashboardsActions.deleteImportedDashboard(
      id_importedBoard,
      this._token,
      this.props.selected_dashboard
    );
  };
  handleImportedListSelection = (
    id_remoteBoard: string,
    accountType?: string
  ) => (event: any) => {
    if (event.target.checked) {
      if (accountType) {
        this.handleCreateImportedDashboard(id_remoteBoard, accountType);
      } else {
        throw Error("we need the account type dude");
      }
    } else {
      this.handleDeleteImportedDashboard(id_remoteBoard);
    }
  };

  handleClose = () => {
    this.props.closeConfig();
  };
  handleOpen = () => {
    this.props.openConfig();
  };
  // updateListAdder = (params: any) => {
  //   this.setState({ listAdder: params.target.value });
  // };
  handleAddList = () => {
    // if (this.state.listAdder.length === 0) {
    //   alert("you need to name it");
    //   return false;
    // }
    // var listIs = {
    //   id: this.state.listAdder,
    //   title: this.state.listAdder
    // };
    // var allk = this.state.dashboardData.listsIds.filter((obj: any) => {
    //   return obj === this.state.listAdder;
    // });
    // if (allk.length != 0) {
    //   console.log("already exist");
    // } else {
    //   var newValues = this.state.dashboardData;
    //   newValues.lists[listIs.id] = listIs;
    //   newValues.listsIds.push(listIs.id);
    //   console.log(newValues);
    //   this.setState({
    //     // add list to lists
    //     dashboardData: newValues,
    //     listAdder: ""
    //   });
    // }
    let listVal = this._listAdderField.value;
    if (listVal.length === 0) {
      alert("you need to name it");
      return false;
    }
    if (this._listsForUpdate.includes(listVal)) {
      alert("the list name must be unique");
    } else {
      this._listsForUpdate.push(listVal); // for next tests
      const code = uuidv1();
      this._newListsForUpdate[code] = {
        id: code,
        name: listVal
      };
      let obj = this.props.dashboard_data;
      obj.lists = this._newListsForUpdate;
      this.props.actions.updateDashboard(obj, this._token);
      this._listAdderField.value = "";
    }
  };
  handleRemoveList = (listID: string) => () => {
    console.log("remove this :", listID);
    let obj = this.props.dashboard_data;
    delete obj.lists[listID];
    this.props.actions.updateDashboard(obj, this._token);
  };
  handleChangeTransform = (
    event: any,
    sourceListId: any,
    ImportedDashboardId: any
  ) => {
    // let newData = this.state.dashboardData;
    // newData.loaded_dashboards.dashboards[dashboardId].loaded_lists[
    //   sourceListId
    // ].transformTo = event.target.value;
    // this.setState({ dashboardData: newData });
    console.log(
      "change we have => ",
      sourceListId,
      " in ",
      ImportedDashboardId,
      " -> ",
      event.target.value
    );
    let importedDashboard = this.props.dashboard_data.importedDashboards.filter(
      (d: any) => d._id === ImportedDashboardId
    )[0];
    let mappedLists: any;
    if (importedDashboard.mappedLists) {
      mappedLists = importedDashboard.mappedLists;
    } else {
      mappedLists = {};
    }
    mappedLists[sourceListId] = {
      idlistRemote: sourceListId,
      idlistLocal: event.target.value
    };
    console.log(mappedLists);
    this.props.importedDashboardsActions.updateImporteddashboard(
      ImportedDashboardId,
      this._token,
      importedDashboard.dashboard_id,
      { mappedLists: mappedLists }
    );
  };

  AddField = () => {
    return (
      <Box
        style={{
          zIndex: 1
        }}
        direction="row"
        elevation="small"
        background="light-3"
        round="xsmall"
        border="all"
        pad={{
          left: "small"
        }}>
        <InputBase
          className="add-f-input"
          placeholder="A list name to be created"
          name="list_name"
          id="list_name"
          // value={this.state.listAdder}
          // onChange={this.updateListAdder}
          inputProps={{
            ref: (node: any) => (this._listAdderField = node)
          }}
        />
        <IconButton
          className="add-f-iconButton"
          aria-label="addtolist"
          onClick={this.handleAddList}>
          <AddIcon />
        </IconButton>
      </Box>
    );
  };
  createItems = (idList: any) => {
    const listdata = this.props.dashboard_data.lists[idList];
    return (
      <ListItem key={idList}>
        <ListItemAvatar>
          <Avatar>{shortName(listdata.name)}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={listdata.name} />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Delete"
            onClick={this.handleRemoveList(idList)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };
  handleUpadet = () => {
    //event.preventDefualt();
    const name = this._name.value;
    const descrp = this._descrp.value;
    let obj = this.props.dashboard_data;
    obj.title = name;
    obj.description = descrp;
    obj.lists = this._newListsForUpdate;
    this.props.actions.updateDashboard(obj, this._token);
  };
  TransformOptions = () => {
    const options = Object.keys(this.props.dashboard_data.lists).map(
      (liID: any) => {
        const li = this.props.dashboard_data.lists[liID];
        return (
          <MenuItem key={li.id} value={li.id}>
            {li.name}
          </MenuItem>
        );
      }
    );
    return <React.Fragment>{options}</React.Fragment>;
  };
  DashboardsTransformer = () => {
    const dashsTs = this.props.dashboard_data.importedDashboards.map(
      (dash: any) => {
        const dash_remote_data = this._importeddashboardsRemoteData.filter(
          e => e.id === dash.remote_board_id
        )[0];
        console.log(dash_remote_data);
        if (dash_remote_data !== undefined && dash_remote_data != false) {
          return (
            <ExpansionPanel key={dash._id}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{dash_remote_data.name}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Box direction="column" gap="small" fill>
                  <Typography>
                    Set-up your mapping method, the first column belong to the
                    remote board and the seconde one it's where you want the
                    cards to show up in the current dashboard.
                  </Typography>
                  {dash_remote_data.lists.map((list: any) => {
                    //const list = dash.loaded_lists[list];
                    var current_mapped_to = 0;
                    if (
                      dash.mappedLists &&
                      dash.mappedLists[list.id] &&
                      dash.mappedLists[list.id].idlistLocal
                    ) {
                      current_mapped_to = dash.mappedLists[list.id].idlistLocal;
                    }
                    return (
                      <React.Fragment key={list.id}>
                        <Box
                          pad="xsmall"
                          gap="small"
                          direction="row-responsive"
                          fill="horizontal">
                          <Box direction="column" justify="center">
                            <Typography variant="subheading">
                              Load cards From
                            </Typography>
                          </Box>
                          <Box flex>
                            <TextField
                              variant="outlined"
                              disabled={true}
                              value={list.name}
                              label="list to load from"
                            />
                          </Box>
                          <Box direction="column" justify="center">
                            <Typography variant="subheading">
                              Into the list ➡
                            </Typography>
                          </Box>
                          <Box flex>
                            <Select
                              onChange={event =>
                                this.handleChangeTransform(
                                  event,
                                  list.id,
                                  dash._id
                                )
                              }
                              inputProps={{
                                id: list.id
                              }}
                              input={
                                <OutlinedInput
                                  name="Load into"
                                  labelWidth={150}
                                  inputProps={{
                                    id: list.id
                                  }}
                                />
                              }
                              // value={
                              //   dash.mappedLists[list.id].idlistLocal || ""
                              // }
                              value={current_mapped_to}>
                              <MenuItem value="0">
                                <em className="dontLoad">
                                  <Unlink />
                                  Don't load from this list
                                </em>
                              </MenuItem>
                              {Object.keys(this.props.dashboard_data.lists).map(
                                (liID: any) => {
                                  const li = this.props.dashboard_data.lists[
                                    liID
                                  ];
                                  return (
                                    <MenuItem key={li.id} value={li.id}>
                                      {li.name}
                                    </MenuItem>
                                  );
                                }
                              )}
                            </Select>
                          </Box>
                        </Box>
                        <Divider />
                      </React.Fragment>
                    );
                  })}
                </Box>
              </ExpansionPanelDetails>
              {/* <ExpansionPanelActions>
                <Button variant="contained" color="primary">
                  Save transformt
                </Button>
              </ExpansionPanelActions> */}
            </ExpansionPanel>
          );
        } else {
          return (
            <Box key={dash._id} round="15" pad="medium" elevation="small">
              Cannot proccess this dashborad right now
            </Box>
          );
        }
      }
    );
    return <React.Fragment>{dashsTs}</React.Fragment>;
  };
  /**
   * @param remoteID - the id of the remote board
   * @returns true is the remote board is loaded in the current dashboard , false else
   */
  isLoadedBoard = (remoteID: string) => {
    return (
      this.props.dashboard_data.importedDashboards.filter(
        (s: any) => s.remote_board_id === remoteID
      ).length != 0
    );
  };
  DashboardsImporter = () => {
    const haveAccounts =
      this.props.user.accounts &&
      Object.keys(this.props.user.accounts).length > 0;
    if (haveAccounts) {
      return (
        <Box direction="column">
          <Text margin="medium">
            Start by selecting the boards that you want to use
          </Text>
          {Object.keys(this.props.user.accounts).map((account: any) => {
            const cnt: any = this.props.user.accounts[account];
            return (
              <ExpansionPanel key={account}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{cnt.accountType}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Box direction="column" fill>
                    <Typography>
                      Connected account {cnt.accountType} as
                      {this._userAccountsBoards[cnt.accountType] != undefined &&
                        this._userAccountsBoards[cnt.accountType]["user"] !=
                          undefined && (
                          <a
                            href={
                              this._userAccountsBoards[cnt.accountType]["user"]
                                .url
                            }
                            target="_blank">
                            {
                              this._userAccountsBoards[cnt.accountType]["user"]
                                .fullName
                            }
                          </a>
                        )}
                      .
                    </Typography>
                    <Box margin="small" background="light-0" fill>
                      {this._userAccountsBoards &&
                        this._userAccountsBoards[cnt.accountType] !=
                          undefined &&
                        this._userAccountsBoards[cnt.accountType]["boards"] !=
                          undefined && (
                          <List>
                            {Object.keys(
                              this._userAccountsBoards[cnt.accountType][
                                "boards"
                              ]
                            ).map(boardNM => {
                              const board = this._userAccountsBoards[
                                cnt.accountType
                              ]["boards"][boardNM];
                              return (
                                <ListItem key={board.id}>
                                  <ListItemIcon>
                                    {!this.isLoadedBoard(board.id) ? (
                                      <Connect />
                                    ) : (
                                      <Connectivity />
                                    )}
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={board.name}
                                    secondary={board.desc}
                                  />

                                  <ListItemSecondaryAction>
                                    <Switch
                                      checked={this.isLoadedBoard(board.id)}
                                      onChange={this.handleImportedListSelection(
                                        board.id,
                                        cnt.accountType
                                      )}
                                    />
                                  </ListItemSecondaryAction>
                                </ListItem>
                              );
                            })}
                          </List>
                        )}
                    </Box>
                  </Box>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </Box>
      );
    } else {
      return (
        <Box direction="column" justify="around" pad="medium">
          <Paragraph>
            Welcome in uBoss , before you start Bossing, we first need you to
            connect to your trello account by clicking on the button below. a
            popup will be shown from trello asking you to coonect and approve
            the connection , validates and we will take care of the other things
          </Paragraph>
          <Box direction="row">
            <Button
              variant="outlined"
              onClick={this.connectTrello}
              color="primary">
              Connect trello
            </Button>
            <Button variant="outlined" color="primary">
              Connect Git
            </Button>
            <Button variant="outlined" color="primary">
              Connect Jira
            </Button>
          </Box>
        </Box>
      );
    }
  };
  connectTrello = () => {
    userApi
      .connectTrello(this._token, this.props.user)
      .then((data: any) => {
        console.log(data);
        this.props.startApprove();
        //self.props.endApproveAccount();
        let _user = JSON.parse(localStorage.getItem("user") || "");
        _user.token = this._token;
        window.open(data.link, "_blank");
        let inter = setInterval(() => {
          // if endApprovingAction fired -> update the current user -> set approvingaction & end approvingAction to false / null
          let endFired = localStorage.getItem("endApprovingAction");
          console.log("still watching");
          if (endFired && endFired === "true") {
            console.log("it's over let's update our state here");
            clearInterval(inter);
            /**
             * update user in state -> reset approving
             */
            userActions.approveActionReset();
            this.props.userActions.loadUser(_user);
          }
        }, 5000);
      })
      .catch((error: any) => {
        console.log(error);
        alert("please check your internet access");
      });
  };
  render() {
    var listItems = Object.keys(this.props.dashboard_data.lists).map(
      this.createItems
    );
    return (
      <Box>
        <IconButton onClick={this.handleOpen}>
          <EditIcon fontSize="small" />
        </IconButton>
        <Dialog
          open={this.props.dashboardConfig}
          onClose={this.handleClose}
          fullWidth={true}
          fullScreen
          maxWidth="lg"
          scroll="paper">
          <DialogTitle>Dashboard Configuration</DialogTitle>
          <DialogContent>
            <Box background="light-0" fill direction="column" justify="center">
              <Tabs flex color="light-0">
                <Tab title="Dashboard Data" color="black">
                  <Form onSubmit={this.handleUpadet}>
                    <Box pad="small" flex direction="row-responsive">
                      <Box direction="column" flex>
                        <TextField
                          id="name"
                          label="Dashboard Name"
                          defaultValue={this.props.dashboard_data.title}
                          margin="normal"
                          variant="outlined"
                          required
                          placeholder="Give it a name"
                          autoFocus={true}
                          helperText="Provide a name for you new dashboard"
                          name="name"
                          inputProps={{
                            ref: (node: any) => (this._name = node)
                          }}
                        />

                        <TextField
                          multiline={true}
                          id="descrp"
                          label="Dashboard descrp"
                          defaultValue={this.props.dashboard_data.description}
                          margin="normal"
                          variant="outlined"
                          required
                          placeholder="Give it a descrp"
                          helperText="Provide a descrp for you new dashboard"
                          name="descrp"
                          rows="3"
                          inputProps={{
                            ref: (node: any) => (this._descrp = node)
                          }}
                        />
                      </Box>
                      <Box pad="small" flex direction="column">
                        <Text size="medium">Lists Creation</Text>
                        <Box direction="column">
                          {/* <Text size="small" color="#f03434">
                          Each list must have an unique name
                        </Text> */}
                          <List dense={true}>{listItems}</List>
                        </Box>
                        <this.AddField />
                      </Box>
                    </Box>
                    <Button variant="outlined" color="primary" type="submit">
                      Save changes
                    </Button>
                  </Form>
                </Tab>
                <Tab title="Transform Data" color="black">
                  <Box pad="small" flex>
                    <this.DashboardsTransformer />
                  </Box>
                </Tab>
                <Tab title="Load Dashboards" color="black">
                  <Box pad="small" flex>
                    <this.DashboardsImporter />
                  </Box>
                </Tab>
              </Tabs>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    dashboardConfig: state.view.dashboardConfig,
    success: state.dashboards.success,
    error: state.dashboards.error,
    selected_dashboard: state.dashboards.selectedDashboardID,
    dashboard_data: state.dashboards.selectedDashboardData,
    user: state.auth.user
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    openConfig: () => dispatch(openDashboardConfig()),
    closeConfig: () => dispatch(closeDashboardConfig()),
    actions: bindActionCreators(dashboardsActions, dispatch),
    startApprove: () => dispatch(startApproveAccount()),
    endApproveAccount: () => dispatch(endApproveAccount()),
    userActions: bindActionCreators(userActions, dispatch),
    importedDashboardsActions: bindActionCreators(
      importedDashboardsActions,
      dispatch
    )
    //resetApprovAction:()=>dispatch(approveActionReset())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardConfig);
