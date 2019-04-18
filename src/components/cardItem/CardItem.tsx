import React, { Component } from "react";
import { Card, CardContent } from "@material-ui/core";
import { Box, Text } from "grommet";
import "./CardItem.css";
export interface CardItemProps {
  cardData: {};
}

export interface CardItemState {
  cardData: {};
}

class CardItem extends Component<CardItemProps, CardItemState> {
  constructor(props: CardItemProps) {
    super(props);
    //this.state = { :  };
  }
  render() {
    return (
      <Box margin={{ top: "xsmall" }}>
        <Card>
          <CardContent>
            <Box className="label-row" direction="row-responsive" gap="small">
              <Text size="xsmall" className="label label-red">
                label 1
              </Text>
              <Text size="xsmall" className="label label-blue">
                label 2
              </Text>
            </Box>
            <Text color="black" size="medium">
              this.props.cardData.name
            </Text>
          </CardContent>
        </Card>
      </Box>
    );
  }
}
export default CardItem;
