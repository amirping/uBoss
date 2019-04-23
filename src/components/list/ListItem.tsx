import React, { Component } from "react";
import { Box, Text } from "grommet";
import "./ListItem.css";
import CardItem from "../cardItem/CardItem";
import { IconButton } from "@material-ui/core";
import MoreVert from "@material-ui/icons/MoreVert";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import * as dashboardsActions from "../../actions/dashboards";
import * as cardsActions from "../../actions/cards";
import { connect } from "react-redux";

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
    return nbCard;
  };
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
            <Droppable droppableId={this.props.listData.id}>
              {provided => (
                <Cardlist {...provided.droppableProps} ref={provided.innerRef}>
                  <Box
                    margin="small"
                    border="all"
                    background="dark-3"
                    pad="xsmall"
                    round="xsmall">
                    <Text alignSelf="center">There is no card here</Text>
                  </Box>
                  {provided.placeholder}
                </Cardlist>
              )}
            </Droppable>
          )}
        </Box>
      </Box>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    success: state.dashboards.success,
    error: state.dashboards.error,
    dashboard_data: state.dashboards.selectedDashboardData,
    cards: state.dashboards.cards,
    user: state.auth.user
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(dashboardsActions, dispatch),
    actions_card: bindActionCreators(cardsActions, dispatch)
  };
};

export default ListItem;
