import React, { Component } from "react";
import { Text, Box, Button } from "grommet";
import { Add } from "grommet-icons";
import "./Dashboards.css";
export interface DashboardsProps {}

export interface DashboardsState {
  dashboardsList: {};
}

class Dashboards extends Component<DashboardsProps, DashboardsState> {
  constructor(props: DashboardsProps) {
    super(props);
    this.state = { dashboardsList: {} };
  }
  render() {
    return (
      <Box
        direction="column"
        width="xsmall"
        border="right"
        pad="small"
        alignContent="center">
        <Box>
          <Button
            a11yTitle="add a dashboards"
            primary
            icon={<Add />}
            className="btn-round"
          />
        </Box>
      </Box>
    );
  }
}

export default Dashboards;
