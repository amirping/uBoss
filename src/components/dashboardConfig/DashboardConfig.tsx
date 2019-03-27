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
import { Box, Tabs, Tab, Form, Text } from "grommet";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import { Value } from "../../../types/grommet-controls.d";
export interface DashboardConfigProps {}

export interface DashboardConfigState {
  show: boolean;
  listAdder: string;
  dashboardData: any;
}

class DashboardConfig extends Component<
  DashboardConfigProps,
  DashboardConfigState
> {
  name: any;
  descrp: any;
  constructor(props: DashboardConfigProps) {
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
  handleClose = () => {
    this.setState({ show: false });
  };
  handleOpen = () => {
    this.setState({ show: true });
  };
  updateListAdder = (params: any) => {
    this.setState({ listAdder: params.target.value });
  };
  handleAddList = () => {
    if (this.state.listAdder.length === 0) {
      alert("you need to name it");
      return false;
    }
    var listIs = {
      id: this.state.listAdder,
      title: this.state.listAdder
    };
    var allk = this.state.dashboardData.listsIds.filter((obj: any) => {
      return obj === this.state.listAdder;
    });
    if (allk.length != 0) {
      console.log("already exist");
    } else {
      var newValues = this.state.dashboardData;
      newValues.lists[listIs.id] = listIs;
      newValues.listsIds.push(listIs.id);
      console.log(newValues);
      this.setState({
        // add list to lists
        dashboardData: newValues,
        listAdder: ""
      });
    }
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
          placeholder="A lidt name to be created"
          name="list_name"
          id="list_name"
          value={this.state.listAdder}
          onChange={this.updateListAdder}
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
  createItems = (params: any) => {
    const listdata = this.state.dashboardData.lists[params];
    return (
      <ListItem key={listdata.id}>
        <ListItemAvatar>
          <Avatar>{listdata.title}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={listdata.title} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };
  render() {
    var listItems = this.state.dashboardData.listsIds.map(this.createItems);
    return (
      <Box>
        <IconButton onClick={this.handleOpen}>
          <EditIcon fontSize="small" />
        </IconButton>
        <Dialog
          open={this.state.show}
          onClose={this.handleClose}
          fullWidth={true}
          fullScreen
          maxWidth="lg"
          scroll="paper">
          <DialogTitle>Dashboard Configuration</DialogTitle>
          <DialogContent>
            <Box background="light-1" fill direction="column" justify="center">
              <Tabs flex color="dark-1">
                <Tab title="Dashboard Data" color="black">
                  <Box pad="small" flex direction="row-responsive">
                    <Box direction="column" flex>
                      <TextField
                        id="name"
                        label="Dashboard Name"
                        defaultValue=""
                        margin="normal"
                        variant="outlined"
                        required
                        placeholder="Give it a name"
                        autoFocus={true}
                        helperText="Provide a name for you new dashboard"
                        name="name"
                        inputProps={{
                          ref: (node: any) => (this.name = node)
                        }}
                      />

                      <TextField
                        multiline={true}
                        id="descrp"
                        label="Dashboard descrp"
                        defaultValue=""
                        margin="normal"
                        variant="outlined"
                        required
                        placeholder="Give it a descrp"
                        helperText="Provide a descrp for you new dashboard"
                        name="descrp"
                        rows="3"
                        inputProps={{
                          ref: (node: any) => (this.descrp = node)
                        }}
                      />
                    </Box>
                    <Box pad="small" flex direction="column">
                      <Text size="medium">Lists Creation</Text>
                      <Box direction="column">
                        <Text size="small" color="#f03434">
                          Each list must have an unique name
                        </Text>
                        <List dense={true}>{listItems}</List>
                      </Box>
                      <this.AddField />
                    </Box>
                  </Box>
                </Tab>
                <Tab title="Transform Data" color="black">
                  <Box pad="small" flex>
                    {this.state.dashboardData.loaded_dashboards.dashboardsIds.map(
                      (id: any) => {
                        const dash = this.state.dashboardData.loaded_dashboards
                          .dashboards[id];
                        return (
                          <ExpansionPanel key={id}>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}>
                              <Typography>{dash.title}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Box direction="column" gap="small" fill>
                                <Typography>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Suspendisse malesuada lacus
                                  ex, sit amet blandit leo lobortis eget.
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
                                        <Box
                                          direction="column"
                                          justify="center">
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
                                        <Box
                                          direction="column"
                                          justify="center">
                                          <Typography variant="subheading">
                                            Into the list ➡
                                          </Typography>
                                        </Box>
                                        <Box flex>
                                          <Select
                                            onChange={event =>
                                              this.handleChangeTransform(
                                                event,
                                                listID,
                                                dash.id
                                              )
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
                                            {this.state.dashboardData.listsIds.map(
                                              (liID: any) => {
                                                const li = this.state
                                                  .dashboardData.lists[liID];
                                                return (
                                                  <MenuItem
                                                    key={li.id}
                                                    value={li.id}>
                                                    {li.title}
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
                    )}
                  </Box>
                </Tab>
                <Tab title="Load Dashboards" color="black">
                  <Box pad="small" flex>
                    Two
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

export default DashboardConfig;
