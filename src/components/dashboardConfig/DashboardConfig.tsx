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
  OutlinedInput
} from "@material-ui/core";
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
import { openDashboardConfig, closeDashboardConfig } from "../../actions/view";
import userApi from "../../api/userApi";
import { startApproveAccount } from "../../actions/user";
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
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
      listAdder: "",
      dashboardData: {
        listsIds: ["dl-1", "dl-2"],
        lists: {
          "dl-1": {
            title: "Done",
            id: "dl-1"
          },
          "dl-2": {
            title: "Progress",
            id: "dl-2"
          }
        },
        loaded_dashboards: {
          dashboardsIds: ["d-14", "d-15", "d-16"],
          dashboards: {
            "d-14": {
              id: "d-14",
              listsIds: ["l-114", "l-555"],
              title: "Dashboard jsProject",
              loaded_lists: {
                "l-114": {
                  id: "l-144",
                  name: "ready",
                  transformTo: ""
                },
                "l-555": {
                  id: "l-555",
                  name: "to be done",
                  transformTo: ""
                }
              }
            },
            "d-15": {
              id: "d-15",
              listsIds: ["l-21234"],
              title: "Dashboard javaProject",
              loaded_lists: {
                "l-21234": {
                  name: "finish",
                  id: "l-21234",
                  transformTo: ""
                }
              }
            },
            "d-16": {
              id: "d-16",
              listsIds: ["l-88", "l-9775", "l-6654"],
              title: "Dashboard cProject",
              loaded_lists: {
                "l-88": {
                  name: "finished",
                  id: "l-88",
                  transformTo: ""
                },
                "l-9775": {
                  name: "ready",
                  id: "l-9775",
                  transformTo: ""
                },
                "l-6654": {
                  name: "close",
                  id: "l-6654",
                  transformTo: ""
                }
              }
            }
          }
        }
      }
    };
  }
  componentDidMount() {
    this._token = localStorage.getItem("token");
    this._listsForUpdate = Object.keys(this.props.dashboard_data.lists);
    this._newListsForUpdate = this.props.dashboard_data.lists;
  }
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
  handleRemoveList = (listID: string) => (event: any) => {
    console.log("remove this :", listID);
    let obj = this.props.dashboard_data;
    delete obj.lists[listID];
    this.props.actions.updateDashboard(obj, this._token);
  };
  handleChangeTransform = (event: any, sourceListId: any, dashboardId: any) => {
    let newData = this.state.dashboardData;
    newData.loaded_dashboards.dashboards[dashboardId].loaded_lists[
      sourceListId
    ].transformTo = event.target.value;
    this.setState({ dashboardData: newData });
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
  handleUpadet = (event: any) => {
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
    const dashsTs = this.state.dashboardData.loaded_dashboards.dashboardsIds.map(
      (id: any) => {
        const dash = this.state.dashboardData.loaded_dashboards.dashboards[id];
        return (
          <ExpansionPanel key={id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{dash.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Box direction="column" gap="small" fill>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
                {dash.listsIds.map((listID: any) => {
                  const list = dash.loaded_lists[listID];
                  return (
                    <React.Fragment key={listID}>
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
                              this.handleChangeTransform(event, listID, dash.id)
                            }
                            inputProps={{
                              id: list.id
                            }}
                            input={
                              <OutlinedInput
                                name="Load into"
                                id="jkjsdkjfnsdkjnf"
                                labelWidth={150}
                                inputProps={{
                                  id: listID
                                }}
                              />
                            }
                            value={list.transformTo || ""}>
                            <MenuItem value="">
                              <em>None</em>
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
            <ExpansionPanelActions>
              <Button variant="contained" color="primary">
                Save transformt
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        );
      }
    );
    return <React.Fragment>{dashsTs}</React.Fragment>;
  };
  connectTrello = () => {
    userApi
      .connectTrello(this._token, this.props.user)
      .then((data: any) => {
        console.log(data);
        this.props.startApprove();
        window.open(data.link, "_blank");
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
                    {this.props.user.accounts &&
                    this.props.user.accounts.trello &&
                    this.props.user.accounts.trello.token.length !== 0 ? (
                      <div>Load your dashboards by selecting em</div>
                    ) : (
                      <Box direction="column" justify="around" pad="medium">
                        <Paragraph>
                          Welcome in uBoos , before you start boosing, we first
                          need you to connect to your trello account by clicking
                          on the button below. a popup will be shown from trello
                          asking you to coonect and approve the connection ,
                          validates and we will take care of the other things
                        </Paragraph>
                        <Button
                          variant="outlined"
                          onClick={this.connectTrello}
                          color="primary">
                          Connect trello
                        </Button>
                      </Box>
                    )}
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
    startApprove: () => dispatch(startApproveAccount())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardConfig);
