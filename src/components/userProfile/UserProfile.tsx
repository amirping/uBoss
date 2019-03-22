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
  MenuItem
} from "@material-ui/core";
import { Form, Box } from "grommet";
import MoreVertIcon from "@material-ui/icons/MoreVert";
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
            <Form>
              <Box direction="column" fill>
                <Box
                  direction="row-responsive"
                  fill
                  justify="between"
                  gap="30px">
                  <Box direction="column">
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
                    />
                  </Box>
                </Box>
              </Box>
            </Form>
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
