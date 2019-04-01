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
  Divider
} from "@material-ui/core";
import { Form, Box, Text } from "grommet";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./UserProfile.css";
import { connect } from "react-redux";
import {
  openProfileManagement,
  closeProfileManagement
} from "../../actions/view";
import * as userActions from "../../actions/user";
import { bindActionCreators } from "redux";
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
  constructor(props: any) {
    super(props);
    this.state = { anchorEl: null };
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
      email: this._userForm.email,
      token: localStorage.getItem("token")
    };
    this.props.actions.updateUser(updateObject);
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
  _handleFormFieldChange = (event: any) => {
    this._userForm[event.target.name] = event.target.value;
    console.log(this._userForm);
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
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
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
            <Box direction="column" fill>
              <Box direction="row-responsive" fill justify="between" gap="30px">
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
                      <Button variant="outlined" color="primary" type="submit">
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
                      <Button variant="outlined" color="primary" type="submit">
                        Change password
                      </Button>
                    </Box>
                  </Form>
                </Box>
              </Box>
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
    openProfileManagement: () => dispatch(openProfileManagement()),
    closeProfileManagement: () => dispatch(closeProfileManagement()),
    actions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
