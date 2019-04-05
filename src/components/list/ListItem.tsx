import React, { Component } from "react";
import { Box, Text } from "grommet";
import "./ListItem.css";
import CardItem from "../cardItem/CardItem";
import { IconButton } from "@material-ui/core";
import MoreVert from "@material-ui/icons/MoreVert";
export interface ListItemProps {}

export interface ListItemState {
  data: any;
}

class ListItem extends Component<any, ListItemState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: {
        tasks: {
          "tas-1": {
            id: "tas-1",
            name: "task one",
            labels: ["hot", "fast"],
            due_date: Date.now(),
            description:
              "lorem ipsum text here goes whenever u want me to be as feather like creep"
          },
          "tas-2": {
            id: "tas-2",
            name: "task two",
            labels: ["hot", "fast"],
            due_date: Date.now(),
            description:
              "lorem ipsum text here goes whenever u want me to be as feather like creep"
          },
          "tas-3": {
            id: "tas-3",
            name: "task three",
            labels: ["hot", "fast"],
            due_date: Date.now(),
            description:
              "lorem ipsum text here goes whenever u want me to be as feather like creep"
          },
          "tas-4": {
            id: "tas-3",
            name: "task three",
            labels: ["hot", "fast"],
            due_date: Date.now(),
            description:
              "lorem ipsum text here goes whenever u want me to be as feather like creep"
          },
          "tas-5": {
            id: "tas-3",
            name: "task three",
            labels: ["hot", "fast"],
            due_date: Date.now(),
            description:
              "lorem ipsum text here goes whenever u want me to be as feather like creep"
          }
        },
        list: {
          id: "list-1",
          title: "Done List",
          taskIds: ["tas-1", "tas-2", "tas-3", "tas-4", "tas-5"]
        }
      }
    };
  }

  render() {
    return (
      <Box
        className="list-main"
        direction="column"
        border="all"
        width="medium"
        margin={{ top: "xsmall" }}
        animation="fadeIn"
        background="dark-3">
        <Box direction="row" justify="between" pad={{ left: "small" }}>
          <Text margin={{ top: "small" }} size="medium">
            {this.props.listData.name}
          </Text>
          <IconButton>
            <MoreVert color="action" fontSize="small" />
          </IconButton>
        </Box>
        <Box direction="column" pad="xsmall">
          {this.state.data.list.taskIds.map((taskId: any) => {
            const cardData = this.state.data.tasks[taskId];
            return <CardItem key={taskId} cardData={cardData} />;
          })}
        </Box>
      </Box>
    );
  }
}

export default ListItem;
