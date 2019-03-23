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
export interface UserProfileProps {}

export interface UserProfileState {
  show: boolean;
  anchorEl: null;
}

class UserProfile extends Component<UserProfileProps, UserProfileState> {
  constructor(props: UserProfileProps) {
    super(props);
    this.state = { show: false, anchorEl: null };
  }
  handleCloseUserProfile = () => {
    this.setState({
      show: false
    });
  };
  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  openUserProfile = () => {
    this.setState({ show: true });
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
          open={this.state.show}
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
                Folen ben Folen
              </Text>
            </Box>
            <Divider />
            <Box direction="column" fill>
              <Box direction="row-responsive" fill justify="between" gap="30px">
                <Box direction="column" flex>
                  <Form>
                    <Box direction="column" flex>
                      <TextField
                        id="name"
                        label="Name"
                        defaultValue=""
                        margin="normal"
                        variant="outlined"
                        required
                        placeholder="Your name"
                        autoFocus={true}
                        helperText="change your name !"
                        name="name"
                      />
                      <TextField
                        id="email"
                        label="Email"
                        defaultValue=""
                        margin="normal"
                        variant="outlined"
                        required
                        placeholder="Give your email"
                        helperText="change your email"
                        name="email"
                        type="email"
                      />
                      <Button variant="outlined" color="primary" type="submit">
                        Save Changes
                      </Button>
                    </Box>
                  </Form>
                </Box>

                <Box direction="column" flex>
                  <Form>
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
                      />
                      <TextField
                        id="new_password_c"
                        label="new password again"
                        defaultValue=""
                        margin="normal"
                        variant="outlined"
                        required
                        placeholder="your new password again"
                        helperText="Provide your new password again"
                        name="new_password"
                        type="password"
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
            <Button onClick={this.handleCloseUserProfile} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}

export default UserProfile;
