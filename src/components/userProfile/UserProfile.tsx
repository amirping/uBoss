import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  DialogActions,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { Form, Box, Text, Tabs, Tab } from "grommet";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./UserProfile.css";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  openProfileManagement,
  closeProfileManagement
} from "../../actions/view";
import * as userActions from "../../actions/user";
import { startApproveAccount, endApproveAccount } from "../../actions/user";
import { bindActionCreators } from "redux";
import { supportedAccounts, accountsType } from "../../utils";
import userApi from "../../api/userApi";
import { logout } from "../../actions/auth";
import TrelloApi from "../../api/trelloApi";
export interface UserProfileProps {}

export interface UserProfileState {
  anchorEl: null;
}

class UserProfile extends Component<any, UserProfileState> {
  _userForm: any = {
    name: this.props.user.name,
    email: this.props.user.email,
    old_password: "",
    new_password: "",
    new_password_confirmation: ""
  };
  _token: any;
  _refreshToken: any;
  constructor(props: any) {
    super(props);
    this.state = { anchorEl: null };
  }
  componentDidMount() {
    this._token = localStorage.getItem("token");
    this._refreshToken = localStorage.getItem("refreshToken");
  }
  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  updateUserIfno = (event: any) => {
    event.preventDefault();
    // go ahead for action etc
    let updateObject = {
      _id: this.props.user._id,
      name: this._userForm.name,
      email: this._userForm.email
    };
    this.props.actions.updateUser(updateObject, this._token);
  };
  updateUserSecurity = (event: any) => {
    event.preventDefault();
    if (this._userForm.old_password === this._userForm.new_password) {
      alert("you cannot use the old password as new one");
      return false;
    } else if (
      this._userForm.new_password != this._userForm.new_password_confirmation
    ) {
      alert("please make sure that you confirm the new password");
      return false;
    } else {
      // all right let's make changes
      let updateObject = {
        _id: this.props.user._id,
        old_password: this._userForm.old_password,
        new_password: this._userForm.new_password,
        token: localStorage.getItem("token")
      };
      this.props.actions.updatePassword(updateObject);
    }
  };
  handleClose = () => {
    this.setState({ anchorEl: null }); // move it to closeProfileManagement #7 bug
    this.props.closeProfileManagement();
  };
  openUserProfile = () => {
    let user = JSON.parse(localStorage.getItem("user") || "");
    this.props.actions.loadUser(user);
    this.props.openProfileManagement();
  };
  logout = () => {
    this.props.logout(this._token, this._refreshToken);
  };
  _handleFormFieldChange = (event: any) => {
    this._userForm[event.target.name] = event.target.value;
    console.log(this._userForm);
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
    const { anchorEl } = this.state;
    return (
      <Box>
        <IconButton
          aria-owns={anchorEl ? "profile-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
          <MenuItem onClick={this.openUserProfile}>My account</MenuItem>
          <MenuItem onClick={this.logout}>Logout</MenuItem>
        </Menu>
        <Dialog
          fullWidth={true}
          fullScreen={true}
          maxWidth="lg"
          scroll="paper"
          open={this.props.profileManagement}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title">
          <DialogTitle id="max-width-dialog-title">
            Profile Mangement
          </DialogTitle>
          <DialogContent>
            <DialogContentText />
            <Box
              direction="row"
              alignContent="around"
              fill="horizontal"
              margin={{ bottom: "small" }}>
              <Avatar
                className="bigAvatar"
                src="https://api.adorable.io/avatars/285/abott@adorable.png"
              />
              <Text
                size="xlarge"
                alignSelf="center"
                margin={{ horizontal: "small" }}>
                {this.props.user.name}
              </Text>
            </Box>

            <Divider />
            {this.props.success && this.props.success.id === "UPDATE_USER" && (
              <Box
                fill="horizontal"
                pad="medium"
                round="xsmall"
                background="status-ok">
                <Text>Your account has been Updates</Text>
              </Box>
            )}
            {this.props.error && this.props.error.id === "UPDATE_USER" && (
              <Box
                fill="horizontal"
                pad="medium"
                round="xsmall"
                background="status-error">
                <Text>
                  {this.props.error.dettails.code} :{" "}
                  {this.props.error.dettails.message}
                </Text>
              </Box>
            )}
            <Box direction="column" fill background="light-0">
              <Tabs>
                <Tab title="Profile data">
                  <Box
                    direction="row-responsive"
                    fill
                    justify="between"
                    gap="30px">
                    <Box direction="column" flex>
                      <Form onSubmit={this.updateUserIfno}>
                        <Box direction="column" flex>
                          <TextField
                            id="name"
                            label="Name"
                            defaultValue={this.props.user.name}
                            margin="normal"
                            variant="outlined"
                            required
                            placeholder="Your name"
                            autoFocus={true}
                            helperText="change your name !"
                            name="name"
                            onChange={this._handleFormFieldChange}
                          />
                          <TextField
                            id="email"
                            label="Email"
                            defaultValue={this.props.user.email}
                            margin="normal"
                            variant="outlined"
                            required
                            placeholder="Give your email"
                            helperText="change your email"
                            name="email"
                            type="email"
                            onChange={this._handleFormFieldChange}
                          />
                          <Button
                            variant="outlined"
                            color="primary"
                            type="submit">
                            Save Changes
                          </Button>
                        </Box>
                      </Form>
                    </Box>

                    <Box direction="column" flex>
                      <Form onSubmit={this.updateUserSecurity}>
                        <Box direction="column" flex>
                          <TextField
                            id="old_password"
                            label="old password"
                            defaultValue=""
                            margin="normal"
                            variant="outlined"
                            required
                            placeholder="your old password"
                            helperText="Provide your old password"
                            name="old_password"
                            type="password"
                            onChange={this._handleFormFieldChange}
                          />
                          <TextField
                            id="new_password"
                            label="new password"
                            defaultValue=""
                            margin="normal"
                            variant="outlined"
                            required
                            placeholder="your new password"
                            helperText="Provide your new password"
                            name="new_password"
                            type="password"
                            onChange={this._handleFormFieldChange}
                          />
                          <TextField
                            id="new_password_confirmation"
                            label="new password again"
                            defaultValue=""
                            margin="normal"
                            variant="outlined"
                            required
                            placeholder="your new password again"
                            helperText="Provide your new password again"
                            name="new_password_confirmation"
                            type="password"
                            onChange={this._handleFormFieldChange}
                          />
                          <Button
                            variant="outlined"
                            color="primary"
                            type="submit">
                            Change password
                          </Button>
                        </Box>
                      </Form>
                    </Box>
                  </Box>
                </Tab>
                <Tab title="External Accounts">
                  <Box fill direction="column">
                    <Typography variant="display1">
                      Manage account for the user
                    </Typography>
                    {/* create list of accounts connected and not connected + delete option */}
                    {this.props.user.accounts != null &&
                      Object.keys(this.props.user.accounts).length != 0 && (
                        <React.Fragment>
                          <Typography variant="headline">
                            Linked Accounts
                          </Typography>
                          <List>
                            {Object.keys(this.props.user.accounts).map(
                              (x: any) => (
                                <ListItem key={x} alignItems="flex-start">
                                  <ListItemAvatar>
                                    <Avatar alt={x}>{x.slice(0, 1)}</Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={x}
                                    secondary={
                                      <React.Fragment>
                                        <Typography
                                          component="span"
                                          color="textPrimary">
                                          Secret Token
                                        </Typography>
                                        {this.props.user.accounts[x].token}
                                      </React.Fragment>
                                    }
                                  />
                                  <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete">
                                      <DeleteIcon />
                                    </IconButton>
                                  </ListItemSecondaryAction>
                                </ListItem>
                              )
                            )}
                          </List>
                        </React.Fragment>
                      )}
                    <Typography variant="headline">
                      Available Accounts
                    </Typography>
                    <List>
                      {accountsType.map((x: string) => {
                        if (
                          this.props.user.accounts &&
                          Object.keys(this.props.user.accounts).indexOf(x) ===
                            -1
                        )
                          return (
                            <ListItem key={x} role={undefined}>
                              <ListItemAvatar>
                                <Avatar>{x.slice(0, 1)}</Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={x} />
                              <ListItemSecondaryAction>
                                {supportedAccounts.indexOf(x) != -1 ? (
                                  <Button
                                    color="primary"
                                    onClick={() => {
                                      x === "trello"
                                        ? this.connectTrello()
                                        : null;
                                    }}>
                                    Link Account
                                  </Button>
                                ) : (
                                  <Button color="secondary" disabled>
                                    Not supported yet
                                  </Button>
                                )}
                              </ListItemSecondaryAction>
                            </ListItem>
                          );
                      })}
                    </List>
                  </Box>
                </Tab>
              </Tabs>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    profileManagement: state.view.profileManagement,
    user: state.auth.user,
    success: state.auth.success,
    error: state.auth.error
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    startApprove: () => dispatch(startApproveAccount()),
    endApproveAccount: () => dispatch(endApproveAccount()),
    userActions: bindActionCreators(userActions, dispatch),
    openProfileManagement: () => dispatch(openProfileManagement()),
    closeProfileManagement: () => dispatch(closeProfileManagement()),
    actions: bindActionCreators(userActions, dispatch),
    logout: (userToken: string, refreshToken: string) =>
      dispatch(logout(userToken, refreshToken))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
