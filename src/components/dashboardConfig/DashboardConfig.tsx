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
  ExpansionPanelDetails
} from "@material-ui/core";
import { Box, Tabs, Tab, Form, Text } from "grommet";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
        lists: [],
        loaded_lists:[]
      }
    };
  }
  handleClose = () => {
    this.setState({
      show: false
    });
  };
  handleOpen = () => {
    this.setState({
      show: true
    });
  };
  updateListAdder = (params: any) => {
    this.setState({
      listAdder: params.target.value
    });
  };
  handleAddList = () => {
    if (this.state.listAdder.length === 0) {
      alert("you need to name it");
      return false;
    }
    var listIs = {
      key: this.state.listAdder,
      title: this.state.listAdder
    };
    var allk = this.state.dashboardData.lists.filter((obj: any) => {
      return obj.title === this.state.listAdder;
    });
    if (allk.length != 0) {
      console.log("already exist");
    } else {
      var newValues = this.state.dashboardData;
      newValues.lists.push(listIs);
      console.log(newValues);
      this.setState({
        // add list to lists
        dashboardData: newValues,
        listAdder: ""
      });
    }
  };
  AddField = () => {
    return (
      <Box
        style={{ zIndex: 1 }}
        direction="row"
        elevation="small"
        background="light-3"
        round="xsmall"
        border="all"
        pad={{ left: "small" }}>
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
  render() {
    return (
      <Box>
        <IconButton onClick={this.handleOpen}>
          <EditIcon fontSize="small" />
        </IconButton>
        <Dialog
          open={this.state.show}
          onClose={this.handleClose}
          fullWidth={true}
          maxWidth="lg"
          scroll="paper">
          <DialogTitle>Dashboard Configuration</DialogTitle>
          <DialogContent>
            <Box background="light-1" fill>
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
                        <List dense={true}>
                          <ListItem>test</ListItem>
                        </List>
                      </Box>
                      <this.AddField />
                    </Box>
                  </Box>
                </Tab>
                <Tab title="Transform Data" color="black">
                  <Box pad="small" flex>
                  <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography >Expansion Panel 1</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
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
