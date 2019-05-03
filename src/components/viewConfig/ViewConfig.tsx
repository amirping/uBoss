import React, { Component } from "react";
import { SettingsOption } from "grommet-icons";
import { DropButton, Box } from "grommet";
import {
  Typography,
  Checkbox,
  Input,
  List,
  ListItem,
  ListItemText,
  TextField
} from "@material-ui/core";
import { connect } from "react-redux";
export interface ViewConfigProps {}

export interface ViewConfigState {
  open: boolean;
}

class ViewConfig extends Component<any, ViewConfigState> {
  constructor(props: any) {
    super(props);
    this.state = { open: false };
  }
  render() {
    const { open } = this.state;
    return (
      <DropButton
        open={open}
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
        icon={<SettingsOption />}
        dropAlign={{ top: "bottom", right: "right" }}
        dropContent={
          <Box gap="10px" background="dark-3" direction="column">
            <Box pad="small">
              <Typography variant="h6">Dashboard View</Typography>
            </Box>
            <Box direction="column">
              {/* <Box direction="row">
                <Typography>Sort card by project</Typography>
                <Checkbox
                  checked={this.props.viewConfig.sortByProject}
                  value="checkedB"
                  color="primary"
                />
              </Box>
              <Box direction="row">
                <Typography>highlight timeout card</Typography>
                <Checkbox
                  checked={this.props.viewConfig.timeout}
                  value="true"
                  color="primary"
                />
              </Box>
              <Box direction="row">
                <Typography>highlight sooner card</Typography>
                <Checkbox
                  checked={this.props.viewConfig.sooner}
                  value="checkedB"
                  color="primary"
                />
                <Input
                  value={this.props.viewConfig.soonerTime}
                  inputProps={{
                    "aria-label": "sooner time"
                  }}
                />
              </Box>
              <Box direction="row">
                <Typography>highlight closed card</Typography>
                <Checkbox
                  checked={this.props.viewConfig.closed}
                  value="checkedB"
                  color="primary"
                />
              </Box> */}
              <List>
                <ListItem role={undefined} dense button>
                  <Checkbox
                    checked={this.props.viewConfig.sortByProject}
                    tabIndex={-1}
                  />
                  <ListItemText primary="Sort card by projects (regroup)" />
                </ListItem>
                <ListItem role={undefined} dense button>
                  <Checkbox
                    checked={this.props.viewConfig.timeout}
                    tabIndex={-1}
                  />
                  <ListItemText primary="highlight timeout card's" />
                </ListItem>
                <ListItem role={undefined} dense button>
                  <Checkbox
                    checked={this.props.viewConfig.sooner}
                    tabIndex={-1}
                  />
                  <ListItemText primary="highlight sooner cards" />
                </ListItem>
                <ListItem role={undefined} dense button>
                  <Checkbox
                    checked={this.props.viewConfig.closed}
                    tabIndex={-1}
                  />
                  <ListItemText primary="highlight closed cards" />
                </ListItem>
              </List>
              <Box direction="column" pad="small">
                <Typography>The sooner time trigger</Typography>
                <TextField
                  id="standard-name"
                  label="sooner time limit"
                  value={this.props.viewConfig.soonerTime}
                  margin="normal"
                />
              </Box>
            </Box>
          </Box>
        }
      />
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    viewConfig: state.dashboards.viewConfig
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return null;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewConfig);
