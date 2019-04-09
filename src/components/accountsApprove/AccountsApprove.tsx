import React, { Component } from "react";
import { Box, Text } from "grommet";
import "./AccountsApprove.css";
import { Add } from "grommet-icons";
import {
  Card,
  CardContent,
  CircularProgress,
  CardActions,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";
import { approveAccount, endApproveAccount } from "../../actions/user";
export interface AccountsApproveProps {
  match: any;
}

export interface AccountsApproveState {}

class AccountsApprove extends Component<any, AccountsApproveState> {
  _token: any;
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    /**
     * token parsing from url inside the hash fragment is only tested with trello
     */
    this._token = localStorage.getItem("token");
    const account_token = this.props.location.hash.split("=")[1];
    //account_token = account_token.;
    const account = {
      accountType: this.props.match.params.accountType,
      token: account_token
    };
    let newUserToUpdate = this.props.user;
    if (!newUserToUpdate.accounts) {
      newUserToUpdate.accounts = {};
    }
    newUserToUpdate.accounts[this.props.match.params.accountType] = account;
    //console.log(newUserToUpdate.accounts);
    setTimeout(() => {
      this.props.approveAccount(newUserToUpdate, this._token);
    }, 5000);
  }
  componentDidUpdate() {
    if (!this.props.approvingAction) {
      setTimeout(() => {
        this.handleClose();
      }, 10000);
    }
  }
  handleClose = () => {
    window.close();
  };
  render() {
    const suc = this.props.success && this.props.success.id === "AAPROVE";
    const err = this.props.error && this.props.error.id === "AAPROVE";
    return (
      <Box
        fill
        justify="around"
        align="center"
        direction="column"
        className="main">
        <Box
          direction="row"
          width="large"
          overflow="hidden"
          animation="fadeIn"
          pad="small">
          <Box id="info-box" direction="column">
            <Box direction="row" align="center" gap="10px" className="titling">
              <span>uBoos</span>

              <Add size="large" color="plain" />

              <span>{this.props.match.params.accountType}</span>
            </Box>
            {this.props.approvingAction === true &&
              !(this.props.success && this.props.success.id === "AAPROVE") &&
              !(this.props.error && this.props.error.id === "APPROVE") && (
                <Card>
                  <CardContent>
                    <Box direction="row-responsive" gap="10px">
                      <Text>
                        Hi {this.props.user.name} , we are working so hard to
                        link your accounts together. you will redirect back once
                        we've done
                      </Text>
                      <CircularProgress
                        color="secondary"
                        style={{ margin: "auto" }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              )}
            {this.props.success && this.props.success.id === "APPROVE" && (
              <Card className="success">
                <CardContent>
                  <Box>
                    <Text>
                      Cheers ☺️ . Your {this.props.match.params.accountType}{" "}
                      account has ben linked with uBoos. This window will be
                      closed afetr few seconds insted you can closed.
                    </Text>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button onClick={this.handleClose}>Close it!</Button>
                </CardActions>
              </Card>
            )}
            {this.props.error && this.props.error.id === "APPROVE" && (
              <Card className="error">
                <CardContent>
                  <Box>
                    <Text>
                      Ay Ay Ay 😢 . There was a problem while linking your{" "}
                      {this.props.match.params.accountType} account. please try
                      later. <br /> This window will be closed afetr few seconds
                      insted you can closed.
                    </Text>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button onClick={this.handleClose}>Close it!</Button>
                </CardActions>
              </Card>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
    success: state.auth.success,
    error: state.auth.error,
    approvingAction: state.auth.approvingAction
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    approveAccount: (user: string, token: string) =>
      dispatch(approveAccount(user, token)),
    endApproveAccount: () => dispatch(endApproveAccount())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsApprove);
