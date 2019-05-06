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
import { changeDashboardView } from "../../actions/dashboards";
export interface ViewConfigProps {}

export interface ViewConfigState {
  open: boolean;
}

class ViewConfig extends Component<any, ViewConfigState> {
  constructor(props: any) {
    super(props);
    this.state = { open: false };
  }
  handlerChange = (name: string) => () => {
    console.log("changing the view config ", name);
    console.log("old value ", this.props.viewConfig[name]);
    console.log("new Value ", !this.props.viewConfig[name]);
    let newConf = Object.assign({}, this.props.viewConfig);
    newConf[name] = !newConf[name];
    this.props.changeDashboardView(newConf);
  };
  render() {
    const { open } = this.state;
    return (
      <DropButton
        icon={<SettingsOption />}
        dropAlign={{ top: "bottom", right: "right" }}
        dropContent={
          <Box gap="10px" background="light-3" direction="column">
            <Box pad="small">
              <Typography variant="h6">Dashboard View</Typography>
            </Box>
            <Box direction="column">
              <List>
                <ListItem
                  role={undefined}
                  dense
                  button
                  onClick={this.handlerChange("sortByProject")}>
                  <Checkbox
                    checked={this.props.viewConfig.sortByProject}
                    tabIndex={-1}
                    name="sortByProject"
                  />
                  <ListItemText primary="Sort card by projects (regroup)" />
                </ListItem>
                <ListItem
                  role={undefined}
                  dense
                  button
                  onClick={this.handlerChange("timeout")}>
                  <Checkbox
                    checked={this.props.viewConfig.timeout}
                    tabIndex={-1}
                    name="timeout"
                  />
                  <ListItemText primary="highlight timeout card's" />
                </ListItem>
                <ListItem
                  role={undefined}
                  dense
                  button
                  onClick={this.handlerChange("sooner")}>
                  <Checkbox
                    checked={this.props.viewConfig.sooner}
                    tabIndex={-1}
                    name="sooner"
                  />
                  <ListItemText primary="highlight sooner cards" />
                </ListItem>
                <ListItem
                  role={undefined}
                  dense
                  button
                  onClick={this.handlerChange("closed")}>
                  <Checkbox
                    checked={this.props.viewConfig.closed}
                    tabIndex={-1}
                    name="closed"
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
  return {
    changeDashboardView: (viewData: any) =>
      dispatch(changeDashboardView(viewData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewConfig);
