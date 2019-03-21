import React, { Component } from "react";
import { Box, Form, Text } from "grommet";
import "./Dashboards.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";

export interface DashboardsProps {}

export interface DashboardsState {
  dashboardsList: Array<{}>;
  open_creator: boolean;
  dashToCreate: {
    name: "";
    description: "";
    lists: Array<{}>;
  };
  listAdder: string;
}

class Dashboards extends Component<DashboardsProps, DashboardsState> {
  name: any;
  descrp: any;
  constructor(props: DashboardsProps) {
    super(props);
    this.state = {
      dashboardsList: [],
      open_creator: false,
      dashToCreate: {
        name: "",
        description: "",
        lists: []
      },
      listAdder: ""
    };
  }
  handleClose = () => {
    this.setState({ open_creator: false });
  };
  handleOpen = () => {
    this.setState({ open_creator: true });
  };
  handleCreate = (params: any) => {
    console.log(params);
    // check if we have at least a list then create
    var name = this.name.value;
    var descrp = this.descrp.value;
    if (this.state.dashToCreate.lists.length === 0) {
      alert("at leadt you must have a list in your dashboard");
    } else if (name.length === 0 || descrp.length === 0) {
      alert("name and description are required to create a dashboard");
    } else {
      var dash = this.state.dashToCreate;
      dash.name = name;
      dash.description = descrp;
      this.setState({ dashToCreate: dash });
      console.log(this.state.dashToCreate);
      // just test
      var dashs = this.state.dashboardsList;
      dashs.push(dash);
      this.setState({
        dashboardsList: dashs
      });
      // proced API
    }
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
    var allk = this.state.dashToCreate.lists.filter((obj: any) => {
      return obj.title === this.state.listAdder;
    });
    if (allk.length != 0) {
      console.log("already exist");
    } else {
      var newValues = this.state.dashToCreate;
      newValues.lists.push(listIs);
      console.log(newValues);
      this.setState({
        // add list to lists
        dashToCreate: newValues,
        listAdder: ""
      });
    }
  };
  updateListAdder = (params: any) => {
    this.setState({
      listAdder: params.target.value
    });
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
  createItems = (params: any) => {
    return (
      <ListItem key={params.key}>
        <ListItemAvatar>
          <Avatar>{params.title}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={params.title} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };
  render() {
    var listItems = this.state.dashToCreate.lists.map(this.createItems);
    const createDialog = (
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        scroll="paper"
        open={this.state.open_creator}
        onClose={this.handleClose}
        aria-labelledby="max-width-dialog-title">
        <DialogTitle id="max-width-dialog-title">Create Dashboard</DialogTitle>
        <DialogContent>
          <DialogContentText />
          <Form onSubmit={this.handleCreate}>
            <Box direction="column" fill>
              <Box direction="row-responsive" fill justify="between" gap="30px">
                <Box direction="column" width="medium">
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
                <Box direction="column" width="medium" flex margin="small">
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
              <Button type="submit" variant="outlined" color="secondary">
                Create
              </Button>
            </Box>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
    const dashboardsList = this.state.dashboardsList.map((dash: any) => {
      return (
        <div key={dash.key} className="dashboard-item">
          {dash.name}
        </div>
      );
    });
    return (
      <Box
        direction="column"
        width="xsmall"
        border="right"
        pad="small"
        fill="vertical"
        alignContent="center"
        margin={{ bottom: "medium" }}>
        <Box direction="row" justify="center" margin={{ bottom: "small" }}>
          <Fab color="secondary" aria-label="Add" onClick={this.handleOpen}>
            <AddIcon />
          </Fab>
        </Box>
        <Box
          direction="column"
          fill
          alignContent="around"
          border={{ side: "top" }}
          margin={{ top: "small" }}
          pad={{ top: "small" }}>
          {dashboardsList}
        </Box>
        {createDialog}
      </Box>
    );
  }
}

export default Dashboards;
