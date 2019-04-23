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
const Item: any = styled.div``;
export interface CardItemState {
  cardData: {};
}

class CardItem extends Component<any, CardItemState> {
  constructor(props: any) {
    super(props);
  }
  openCardData = () => {
    this.props.selectCard(this.props.cardData);
  };
  render() {
    return (
      <Draggable draggableId={this.props.cardData.id} index={this.props.index}>
        {provided => (
          <Item
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>
            <Box margin={{ top: "xsmall" }}>
              <Card className="card" onClick={this.openCardData}>
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
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    selectCard: (card: any) => dispatch(selectCard(card))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CardItem);
