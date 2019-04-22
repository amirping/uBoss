import React, { Component } from "react";
import { Box, Text } from "grommet";
import "./ListItem.css";
import CardItem from "../cardItem/CardItem";
import { IconButton } from "@material-ui/core";
import MoreVert from "@material-ui/icons/MoreVert";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
const Cardlist: any = styled.div``;
export interface ListItemProps {}

export interface ListItemState {
  data: any;
}

class ListItem extends Component<any, ListItemState> {
  constructor(props: any) {
    super(props);
  }
  componentDidUpdate() {
    console.log("list updates");
  }
  cardsCount = (listCardsData: any) => {
    let nbCard = 0;
    Object.keys(listCardsData).map(k => {
      nbCard += listCardsData[k].length;
    });
    // for (let item of listCardsData) {
    //   console.log(item);
    //   nbCard += item.length;
    // }
    return nbCard;
  };
  render() {
    //console.log(Object.entries(this.props.cards));
    //console.log(this.cardsCount(this.props.cards));
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
          {this.cardsCount(this.props.cards) > 0 ? (
            <Droppable droppableId={this.props.listData.id}>
              {provided => (
                <Cardlist {...provided.droppableProps} ref={provided.innerRef}>
                  {Object.keys(this.props.cards).map((remoteId: any) => {
                    const remoteCards = this.props.cards[remoteId];
                    return remoteCards.map((card: any, index: number) => {
                      return (
                        <CardItem key={card.id} cardData={card} index={index} />
                      );
                    });
                  })}
                  {provided.placeholder}
                </Cardlist>
              )}
            </Droppable>
          ) : (
            <Box
              margin="small"
              border="all"
              background="dark-3"
              pad="xsmall"
              round="xsmall">
              <Text alignSelf="center">There is no card here</Text>
            </Box>
          )}
        </Box>
      </Box>
    );
  }
}

export default ListItem;
