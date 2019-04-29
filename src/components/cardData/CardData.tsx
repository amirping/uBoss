import React, { Component } from "react";
import {
  Dialog,
  CardMedia,
  DialogTitle,
  DialogContent,
  Typography,
  Card,
  CardContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from "@material-ui/core";
import { Box, Text } from "grommet";
import Moment from "react-moment";
import { TextAlignFull, Attachment } from "grommet-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cardsActions from "../../actions/cards";
import { closeCardData } from "../../actions/view";
export interface CardDataState {}

class CardData extends Component<any, CardDataState> {
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    //loadCardMoreData
    this.props.actions_card.loadCardMoreData(
      this.props.user.accounts["trello"].token,
      this.props.selectedCard.id
    );
  }
  getAttachmentCover = (idAttachment: string, attachments: Array<any>) => {
    let v = attachments.filter(x => x.id === idAttachment);
    return v[0];
  };
  handleClose = () => {
    this.props.closeCardData();
  };
  render() {
    return (
      <Dialog
        open={this.props.cardDataDialog}
        onClose={this.handleClose}
        maxWidth={!this.props.moreCardData ? "md" : "lg"}
        aria-labelledby="responsive-dialog-title">
        {this.props.selectedCard.idAttachmentCover != null &&
          this.props.selectedCard.attachments.length > 0 && (
            <CardMedia
              className="media"
              image={
                this.getAttachmentCover(
                  this.props.selectedCard.idAttachmentCover,
                  this.props.selectedCard.attachments
                ).url
              }
              title="Contemplative Reptile"
            />
          )}
        <Box direction="row-responsive">
          <Box>
            <DialogTitle id="responsive-dialog-title">
              {this.props.selectedCard.name}
            </DialogTitle>
            <DialogContent>
              <Box>
                {(this.props.selectedCard.labels.length > 0 ||
                  this.props.selectedCard.due != null) && (
                  <Box direction="row-responsive" gap="20px">
                    {this.props.selectedCard.labels.length > 0 && (
                      <Box direction="column">
                        <Typography variant="overline" gutterBottom>
                          Lables
                        </Typography>
                        <Box
                          direction="row-responsive"
                          gap="5px"
                          fill="horizontal">
                          {this.props.selectedCard.labels.map((v: any) => (
                            <Box
                              round="small"
                              pad="xsmall"
                              key={v.id}
                              className="inCardLabel"
                              background={{ color: v.color }}>
                              <Text size="xsmall">
                                {v.name || "\u00A0\u00A0"}
                              </Text>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}
                    {this.props.selectedCard.due != null && (
                      <Box direction="column">
                        <Typography variant="overline" gutterBottom>
                          DUE DATE
                        </Typography>
                        <Box
                          direction="row-responsive"
                          gap="5px"
                          fill="horizontal">
                          <Text size="small">
                            <Moment
                              format="D MMM YYYY - HH:mm"
                              date={this.props.selectedCard.due}
                            />
                            {this.props.selectedCard.dueComplete && (
                              <span style={{ color: "#4CAF50" }}>
                                [ complete ]
                              </span>
                            )}
                            {!this.props.selectedCard.dueComplete && (
                              <span>
                                <span style={{ color: "#c62828" }}>
                                  [ incomplete ] -
                                </span>
                                <Moment
                                  fromNow
                                  date={this.props.selectedCard.due}
                                />
                              </span>
                            )}
                          </Text>
                        </Box>
                      </Box>
                    )}
                  </Box>
                )}
                {this.props.selectedCard.desc.length > 0 && (
                  <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                      <TextAlignFull color="plain" size="small" /> Description
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {this.props.selectedCard.desc
                        .split("\n\n")
                        .map((s: string, i: number) => (
                          <li className="listDesc" key={i}>
                            {s}
                          </li>
                        ))}
                    </Typography>
                  </React.Fragment>
                )}

                {this.props.selectedCard.attachments.length > 0 && (
                  <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                      <Attachment color="plain" size="small" /> Attachments
                    </Typography>
                    <Box direction="column" gap="10px">
                      {this.props.selectedCard.attachments.map(
                        (attach: any) => (
                          <a href={attach.url} target="_blank" key={attach.id}>
                            <Card className="attachItem">
                              <CardMedia
                                image={attach.url}
                                className="sideMedia"
                              />
                              <div>
                                <CardContent>
                                  <Typography variant="body1" gutterBottom>
                                    {attach.name}
                                  </Typography>
                                  <Typography variant="body1" gutterBottom>
                                    Date : <Moment fromNow date={attach.date} />
                                  </Typography>
                                </CardContent>
                              </div>
                            </Card>
                          </a>
                        )
                      )}
                    </Box>
                  </React.Fragment>
                )}
              </Box>
            </DialogContent>
          </Box>
          {this.props.moreCardData && (
            <Box direction="column" width="40%">
              {this.props.moreCardData.comments != undefined && (
                <Box id="comments-section">
                  {this.props.moreCardData.comments.length > 0 ? (
                    <List>
                      {this.props.moreCardData.comments.map((com: any) => (
                        <ListItem key={com.id} alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar>{com.memberCreator.initials}</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  color="textPrimary">
                                  {com.memberCreator.fullName}
                                </Typography>
                                {com.data.text}
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <span>No comments here </span>
                  )}
                </Box>
              )}
              <Box id="checklist-section">
                {this.props.moreCardData.checklists != undefined && (
                  <Box id="comments-section">
                    {this.props.moreCardData.checklists.length > 0 ? (
                      <span>We got checklists</span>
                    ) : (
                      <span>No checklists here </span>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    success: state.dashboards.success,
    error: state.dashboards.error,
    user: state.auth.user,
    cardDataDialog: state.view.cardData,
    selectedCard: state.dashboards.selectedCard,
    moreCardData: state.dashboards.moreCardData
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions_card: bindActionCreators(cardsActions, dispatch),
    closeCardData: () => dispatch(closeCardData())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardData);
