import React, { Component } from "react";
import "./AuthComp.css";
import bgAuth from "./bg_auth_1.jpg";
import {
  Box,
  Text,
  Heading,
  Form,
  FormField,
  Button,
  TextInput,
  ResponsiveContext
} from "grommet";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/auth";
export interface AuthCompProps {}

export interface AuthCompState {
  step: number;
}

class AuthComp extends Component<any, AuthCompState> {
  constructor(props: any) {
    super(props);
    this.state = {
      step: 1
    };
  }
  changeView = (view: number) => {
    return this.setState({ step: view });
  };
  signUp = (params: any) => {
    params.preventDefault();
    console.log(params.value);
    let password = params.value.password;
    let password_confirmation = params.value.password_confirmation;
    if (password.length < 6 || password != password_confirmation) {
      alert("please provide correct password and make sure you repated again ");
      return false;
    } else {
      console.log("fire register");
      this.props.actions.signup({
        name: params.value.name,
        email: params.value.email,
        password: params.value.password
      });
    }
  };
  signIn = (params: any) => {
    params.preventDefault();
    console.log(params.value);
    this.props.actions.login(params.value);
  };
  render() {
    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Box
            direction="column"
            justify="center"
            align="center"
            fill
            background="#CFD8DC">
            <Box
              direction="row"
              elevation="medium"
              width="large"
              background="#ecf0f1"
              overflow="hidden"
              round="small"
              animation="fadeIn">
              <Box flex="grow">
                {this.state.step === 1 && (
                  <Box id="sign_up" direction="column" pad="small">
                    <Text
                      size="large"
                      margin={{
                        bottom: "medium",
                        left: "small",
                        top: "medium"
                      }}
                      weight={400}>
                      uBoss / Sign up
                    </Text>
                    {this.props.success && this.props.success.id === "SIGNUP" && (
                      <Box
                        fill="horizontal"
                        pad="medium"
                        round="xsmall"
                        background="status-ok">
                        <Text>
                          Your account has been created , you can login now
                        </Text>
                      </Box>
                    )}
                    {this.props.error && this.props.error.id === "SIGNUP" && (
                      <Box
                        fill="horizontal"
                        pad="medium"
                        round="xsmall"
                        background="status-error">
                        <Text>
                          {this.props.error.dettails.code} :{" "}
                          {this.props.error.dettails.message}
                        </Text>
                      </Box>
                    )}
                    <Form
                      messages={{
                        invalid: "Wrong value has been given",
                        required: "this field is required"
                      }}
                      onSubmit={this.signUp}>
                      <FormField
                        name="name"
                        label="Name"
                        required
                        validate={{ regexp: /^[a-z]/i }}
                      />
                      <FormField
                        label="Email"
                        name="email"
                        required
                        {...{ type: "email" }}
                      />
                      <Box
                        direction="row-responsive"
                        fill="horizontal"
                        align="stretch"
                        justify="between"
                        gap="small">
                        <FormField
                          name="password"
                          label="Password"
                          required
                          className="fill-space"
                          {...{ type: "password", min: "6" }}
                        />
                        <FormField
                          name="password_confirmation"
                          label="Password confirmation"
                          required
                          className="fill-space"
                          {...{ type: "password" }}
                        />
                      </Box>

                      <Box direction="row" justify="between">
                        <Box direction="row-responsive">
                          <Button onClick={() => this.changeView(2)}>
                            Already have an account !
                          </Button>
                        </Box>
                        <Button
                          type="submit"
                          primary
                          label="Sign me up"
                          alignSelf="end"
                        />
                      </Box>
                    </Form>
                  </Box>
                )}

                {this.state.step === 2 && (
                  <Box id="sign_in" direction="column" pad="small">
                    <Text
                      size="large"
                      margin={{
                        bottom: "medium",
                        left: "small",
                        top: "medium"
                      }}
                      weight={400}>
                      uBoss / Sign in
                    </Text>
                    {this.props.error && this.props.error.id === "LOGIN" && (
                      <Box
                        fill="horizontal"
                        pad="medium"
                        round="xsmall"
                        background="status-error">
                        <Text>
                          {this.props.error.dettails.code} :{" "}
                          {this.props.error.dettails.message}
                        </Text>
                      </Box>
                    )}
                    <Form
                      onSubmit={this.signIn}
                      messages={{
                        invalid: "it look like you miss something there",
                        required: "this field actually is required"
                      }}>
                      <FormField
                        name="email"
                        label="Email"
                        placeholder="your email"
                        required
                        {...{ type: "email" }}
                      />
                      <FormField
                        typeof="password"
                        name="password"
                        label="Password"
                        required
                        placeholder="Your password"
                        {...{ type: "password" }}
                      />

                      <Box direction="row" justify="between">
                        <Box direction="row-responsive" gap="small">
                          <Button
                            onClick={() => {
                              this.changeView(1);
                            }}>
                            I don't have an account!
                          </Button>
                          <Button
                            plain
                            label=" I forget my password !"
                            className="btn-forget"
                          />
                        </Box>
                        <Button
                          type="submit"
                          primary
                          label="Log-In"
                          alignSelf="end"
                        />
                      </Box>
                    </Form>
                  </Box>
                )}
              </Box>
              {size !== "small" && (
                <Box
                  flex="shrink"
                  width="xxsmall"
                  background={{ image: `url(${bgAuth})` }}
                />
              )}
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}
const mapStateToProps = (state: any) => {
  return {
    success: state.auth.success,
    error: state.auth.error
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthComp);
