import React, { Component } from "react";
import { Box, Form, Text } from "grommet";
import "./Dashboards.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import * as dashboardsActions from "../../actions/dashboards";
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
  ListItemSecondaryAction,
  Snackbar,
  CircularProgress
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  openDashboardCreator,
  closeDashboardCreator
} from "../../actions/view";

export interface DashboardsProps {}

export interface DashboardsState {
  // dashboardsList: {
  //   dashboardsIds: Array<string>;
  //   dashboards: any;
  // };
  // open_creator: boolean;
  // dashToCreate: {
  //   name: "";
  //   description: "";
  //   lists: Array<{}>;
  // };
  // listAdder: string;
}

class Dashboards extends Component<any, DashboardsState> {
  _name: any;
  _descrp: any;
  _listAdder: any;
  _token: any;
  _openSnack: boolean = true;
  constructor(props: any) {
    super(props);
    // this.state = {
    //   dashboardsList: {
    //     dashboardsIds: [],
    //     dashboards: {}
    //   },
    //   open_creator: false,
    //   dashToCreate: {
    //     name: "",
    //     description: "",
    //     lists: []
    //   },
    //   listAdder: ""
    // };
  }
  handleClose = () => {
    this.props.closeCreator();
  };
  componentDidMount() {
    this._token = localStorage.getItem("token");
    this.props.actions.loadDashboards(this._token);
  }

  handleOpen = () => {
    this.props.openCreator();
  };
  handleCreate = (params: any) => {
    console.log(params);
    // check if we have at least a list then create
    var name = this._name.value;
    var descrp = this._descrp.value;
    if (this.props.dashboardToCreate.lists.length === 0) {
      alert("at least you must have a list in your dashboard");
    } else if (name.length === 0 || descrp.length === 0) {
      alert("name and description are required to create a dashboard");
    } else {
      let dash = {
        title: name,
        description: descrp,
        lists: this.props.dashboardToCreate.lists
      };
      this.props.actions.createDashboard(dash, this._token);
      // var dash = this.state.dashToCreate;
      // dash.name = name;
      // dash.description = descrp;
      // this.setState({ dashToCreate: dash });
      // console.log(this.state.dashToCreate);
      // // just test -use the name as id but later we will use mongo _id
      // var dashs = this.state.dashboardsList;
      // dashs.dashboardsIds.push(dash.name);
      // Object.assign(dash, { id: dash.name });
      // dashs.dashboards[dash.name] = dash;
      // this.setState({
      //   dashboardsList: dashs
      // });
      // this.setState({
      //   dashToCreate: {
      //     name: "",
      //     description: "",
      //     lists: []
      //   },
      //   listAdder: ""
      // });
      // this._name = "";
      // this._descrp = "";
      // proced API
    }
  };
  handleAddList = () => {
    let listVal = this._listAdder.value;
    if (listVal.length === 0) {
      alert("you need to name it");
      return false;
    }
    if (this.props.dashboardToCreate.lists.includes(listVal)) {
      alert("the list name must be unique");
    } else {
      this.props.actions.addListToDashboardCreator(listVal);
    }
    // var listIs = {
    //   key: listVal,
    //   title: listVal
    // };
    // var allk = this.state.dashToCreate.lists.filter((obj: any) => {
    //   return obj.title === this.state.listAdder;
    // });
    // if (allk.length != 0) {
    //   console.log("already exist");
    // } else {
    //   var newValues = this.state.dashToCreate;
    //   newValues.lists.push(listIs);
    //   console.log(newValues);
    //   this.setState({
    //     // add list to lists
    //     dashToCreate: newValues,
    //     listAdder: ""
    //   });
    // }
  };
  // updateListAdder = (params: any) => {
  //   this.setState({
  //     listAdder: params.target.value
  //   });
  // };
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
          // value={this.props.dashboardToCreate.listAdder}
          // onChange={this.updateListAdder}
          inputProps={{
            ref: (node: any) => (this._listAdder = node)
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
  handleRemoveList = (params: any) => (event: any) => {
    console.log("remove item ", params);

    this.props.actions.removeListToDashboardCreator(params);
  };
  createItems = (params: any) => {
    return (
      <ListItem key={params}>
        <ListItemAvatar>
          <Avatar>{params}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={params} />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Delete"
            onClick={this.handleRemoveList(params)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };
  getShortName = (longName: string) => {
    let name = "";
    longName.split(/[\s,-]+/).map(st => {
      name += st[0].toUpperCase();
    });
    return name;
  };
  handleSnackClose = () => {
    this._openSnack = false;
  };
  DashsRender = () => {
    const dashboardsList = this.props.dashboardsIds.map((dash: any) => {
      const dashb = this.props.dashboards[dash];
      return (
        <div key={dashb._id} className="dashboard-item">
          {this.getShortName(dashb.title)}
        </div>
      );
    });
    return <React.Fragment>{dashboardsList}</React.Fragment>;
  };
  render() {
    var listItems = this.props.dashboardToCreate.lists.map(this.createItems);
    const createDialog = (
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        scroll="paper"
        open={this.props.dashboardCreator}
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
                      ref: (node: any) => (this._name = node)
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
                      ref: (node: any) => (this._descrp = node)
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
    // const dashboardsList = this.props.dashboardsIds.map((dash: any) => {
    //   const dashb = this.props.dashboards[dash];
    //   return (
    //     <div key={dashb._id} className="dashboard-item">
    //       {this.getShortName(dashb.title)}
    //     </div>
    //   );
    // });
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
          {this.props.dashboardsIds && this.props.dashboardsIds.length !== 0 ? (
            <this.DashsRender />
          ) : (
            <CircularProgress color="secondary" style={{ margin: "auto" }} />
          )}
        </Box>
        {createDialog}
        {this.props.success && this.props.success.id === "DASHBOARDS" && (
          <Snackbar
            onClose={this.handleSnackClose}
            open={this._openSnack}
            className="snack-success"
            autoHideDuration={6000}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar">
                <CheckCircleIcon />
                {this.props.success.message}
              </span>
            }
          />
        )}
        {this.props.error && this.props.error.id === "DASHBOARDS" && (
          <Snackbar
            onClose={this.handleSnackClose}
            open={this._openSnack}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            autoHideDuration={6000}
            aria-describedby="client-snackbar"
            // className="snack-error" // not working
            message={
              <span id="client-snackbar">
                <ErrorIcon />
                {this.props.error.dettails.message}
              </span>
            }
          />
        )}
      </Box>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    dashboardCreator: state.view.dashboardCreator,
    dashboardsIds: state.dashboards.dashboardsIDs,
    dashboards: state.dashboards.dashboards,
    dashboardToCreate: {
      title: state.dashboards.title,
      description: state.dashboards.description,
      lists: state.dashboards.lists
    },
    success: state.dashboards.success,
    error: state.dashboards.error
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    openCreator: () => dispatch(openDashboardCreator()),
    closeCreator: () => dispatch(closeDashboardCreator()),
    actions: bindActionCreators(dashboardsActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboards);
