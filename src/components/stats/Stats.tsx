import React, { Component } from "react";
import { connect } from "react-redux";
import { Box } from "grommet";
import { Typography } from "@material-ui/core";
import {
  PieChart,
  Pie,
  Sector,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  YAxis,
  ResponsiveContainer
} from "recharts";

export interface StatsProps {}

export interface StatsState {
  activeIndex: number;
}

class Stats extends Component<any, StatsState> {
  constructor(props: any) {
    super(props);
    this.state = { activeIndex: 0 };
  }
  onPieEnter = (data: any, index: any) => {
    this.setState({
      activeIndex: index
    });
  };
  renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333">{`Total: ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  render() {
    return (
      <Box direction="column" fill animation="fadeIn" overflow="auto">
        <Box direction="column" fill="horizontal">
          <Box>
            <Typography variant="h5">Global Card's Stats</Typography>
          </Box>
          <Box direction="row">
            <PieChart width={400} height={250}>
              <Pie
                activeIndex={this.state.activeIndex}
                activeShape={this.renderActiveShape}
                data={[
                  { name: "Open Cards", value: this.props.stats.open },
                  { name: "Closed cards", value: this.props.stats.closed },
                  { name: "Sooner Cards", value: this.props.stats.sooner },
                  {
                    name: "Out of Time cards",
                    value: this.props.stats.outOftime
                  }
                ]}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={this.onPieEnter}
              />
            </PieChart>
            <Box direction="column" justify="center">
              <Typography variant="body1">
                This Pie chart, represente the global state of cards in all
                projects. <br /> in Global this chart give you an idea about how
                many Open , closed , out of date and soon cards <br />
              </Typography>
              <ul>
                <li>Open Cards : {this.props.stats.open}</li>
                <li>Closed cards : {this.props.stats.closed}</li>
                <li>Sooner Cards : {this.props.stats.sooner}</li>
                <li>Out of Time cards : {this.props.stats.outOftime}</li>
              </ul>
            </Box>
          </Box>
        </Box>
        <Box direction="column">
          <Typography variant="h5">Boards Stats</Typography>
          <Box direction="row-responsive">
            <Box direction="column" flex>
              <ResponsiveContainer height={300}>
                <LineChart
                  data={this.props.stats.cardsBylist}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
            <Box direction="column" flex>
              <ResponsiveContainer height={300}>
                <LineChart
                  data={this.props.stats.cardsByboard}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>
        <Box direction="column">
          <Typography variant="h5">General Stats</Typography>
          <Box direction="row-responsive" />
        </Box>
      </Box>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    stats: state.dashboards.stats
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return null;
};

export default connect(
  mapStateToProps,
  null
)(Stats);
