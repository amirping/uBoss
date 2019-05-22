import React, { Component } from "react";
import { connect } from "react-redux";
import { Box } from "grommet";
import { Typography } from "@material-ui/core";
import "./Stats.css";
import {
  PieChart,
  Pie,
  Sector,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  AreaChart,
  Area
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
      <Box
        direction="column"
        fill
        animation="fadeIn"
        pad="xsmall"
        overflow="auto">
        {/* WOOOOO */}
        <div className="statBox">
          <Typography className="title" variant="h5">
            Global Card's Stats
          </Typography>
          <div className="row-box">
            <div className="stat">
              <ResponsiveContainer height={250} width="50%">
                <PieChart>
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
              </ResponsiveContainer>
            </div>
            <div className="dsc">
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
            </div>
          </div>
        </div>
        {/* WOOOOO */}
        <div className="col-box">
          <Typography variant="h5" className="title">
            Boards Stats
          </Typography>
          <div className="row-box">
            <div className="statBox">
              <div className="stat ">
                <Typography className="sub-title" variant="caption">
                  Number of cards By list
                </Typography>
                <ResponsiveContainer height={250}>
                  <BarChart
                    data={this.props.stats.cardsBylist}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 10,
                      bottom: 5
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id" stroke="#ffffff" />
                    <YAxis stroke="#ffffff" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" label maxBarSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="statBox">
              <div className="stat ">
                <Typography className="sub-title" variant="caption">
                  Number of cards By Board
                </Typography>
                <ResponsiveContainer height={250}>
                  <BarChart
                    data={this.props.stats.cardsByboard}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 10,
                      bottom: 5
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id" stroke="#ffffff" />
                    <YAxis stroke="#ffffff" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" label maxBarSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          {/* piechart for each Board (open,closed,sooner,out of time) */}
          <div className="statBox">
            <Typography className="title" variant="headline">
              Cards stats by Board
            </Typography>
            <div className="row-box">
              {this.props.stats.statsByBoards.map((x: any) => (
                <div className="stat">
                  <Typography variant="caption" className="sub-title">
                    Board: {x.id}
                  </Typography>
                  <ResponsiveContainer height={300}>
                    <PieChart>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                      <Pie
                        label
                        data={x.data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={80}
                        fill="#8884d8">
                        {x.data.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="statBox">
          <Typography variant="h5" className="title">
            General Stats
          </Typography>
          <Typography variant="caption" className="sub-title">
            Activity on cards by date
          </Typography>
          <div className="row-box">
            <div className="stat">
              <ResponsiveContainer height={400}>
                <AreaChart
                  data={this.props.stats.lastActivityCards}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="activity"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Box>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    stats: state.dashboards.stats
  };
};

export default connect(
  mapStateToProps,
  null
)(Stats);
