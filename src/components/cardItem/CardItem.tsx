import React, { Component } from "react";
import { Card, CardContent } from "@material-ui/core";
import { Box, Text } from "grommet";
import { Alarm } from "grommet-icons";
import Moment from "react-moment";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import "./CardItem.css";
import { Provider, connect } from "react-redux";
import { selectCard } from "../../actions/dashboards";
import CardData from "../cardData/CardData";
const Item: any = styled.div``;
export interface CardItemState {
  cardData: {};
}

class CardItem extends Component<any, CardItemState> {
  classCss = "";
  constructor(props: any) {
    super(props);
  }
  openCardData = () => {
    this.props.selectCard(this.props.cardData);
  };
  datediff(first: any, second: any) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }
  componentWillUpdate() {
    console.log("CARD WILL UPDATE");
    console.log(this.props.viewConfig);
  }
  componentWillReceiveProps() {
    console.log("CARD WILL RECEVIE PROPS");
    console.log(this.props.viewConfig);
    let isTimeout = false;
    let isSooner = false;
    let isClosed = false;
    // depand on card data pick css class
    if (
      this.props.viewConfig.timeout ||
      this.props.viewConfig.closed ||
      this.props.viewConfig.sooner
    ) {
      this.classCss = "";
      if (this.props.cardData.closed) {
        isClosed = true;
      } else if (this.props.cardData.due && !this.props.cardData.dueComplete) {
        let today = new Date();
        let cardDay = new Date(this.props.cardData.due);
        //console.log("Due : ", cardDay, "today : ", today);
        if (cardDay <= today) {
          isTimeout = true;
        }
        if (this.datediff(cardDay, today) <= this.props.viewConfig.soonerTime) {
          isSooner = true;
        }
      }
      console.log(
        `isTimeout : ${isTimeout} , isSooner : ${isSooner} , isClosed : ${isClosed}`
      );
      if (isTimeout && this.props.viewConfig.timeout) {
        if (!this.classCss.includes("tiemout")) {
          this.classCss += " timeout";
        }
      } else {
        this.classCss = this.classCss.replace("tiemout", "");
      }
      if (isClosed && this.props.viewConfig.closed) {
        if (!this.classCss.includes("closed")) {
          this.classCss += " closed";
        }
      } else {
        this.classCss = this.classCss.replace("closed", "");
      }
      if (isSooner && this.props.viewConfig.sooner) {
        if (!this.classCss.includes("sooner")) {
          this.classCss += " sooner";
        }
      } else {
        this.classCss = this.classCss.replace("sooner", "");
      }
      console.log(this.classCss);
    }
  }
  render() {
    if (this.props.cardData.name.includes(this.props.searchCard)) {
      return (
        <Draggable
          draggableId={this.props.cardData.id}
          index={this.props.index}>
          {provided => (
            <Item
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}>
              <Box margin={{ top: "xsmall" }} animation="fadeIn">
                <Card
                  className={"card " + this.classCss}
                  onClick={this.openCardData}>
                  <CardContent>
                    <Box direction="row-responsive">
                      {this.props.cardData.due != null && (
                        <Box
                          id="due"
                          direction="row"
                          background="light-0"
                          margin={{ right: "xsmall" }}
                          gap="3px">
                          <Alarm
                            color="plain"
                            size="small"
                            className="center-icon"
                          />
                          <Moment
                            className="date"
                            format="YYYY/MM/DD"
                            date={this.props.cardData.due}
                          />
                        </Box>
                      )}
                      <Box
                        className="label-row"
                        direction="row-responsive"
                        gap="xsmall">
                        {this.props.cardData.labels.map((l: any) => {
                          return (
                            <Text
                              key={l.id}
                              size="xsmall"
                              style={{ background: l.color }}
                              className="label">
                              {l.name.length != 0 ? l.name : "\u00A0"}
                            </Text>
                          );
                        })}
                      </Box>
                    </Box>
                    <Text color="black" size="medium">
                      {this.props.cardData.name}
                    </Text>
                  </CardContent>
                </Card>
              </Box>
            </Item>
          )}
        </Draggable>
      );
    } else {
      return null;
    }
  }
}
const mapStateToProps = (state: any) => {
  return {
    viewConfig: state.dashboards.viewConfig,
    searchCard: state.dashboards.searchCard
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    selectCard: (card: any) => dispatch(selectCard(card))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardItem);
