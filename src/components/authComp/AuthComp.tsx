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
export interface AuthCompProps {}

export interface AuthCompState {
  step: number;
}

class AuthComp extends Component<AuthCompProps, AuthCompState> {
  constructor(props: AuthCompProps) {
    super(props);
    this.state = { step: 1 };
  }
  changeView = (view: number) => {
    return this.setState({ step: view });
  };
  signUp = (params: any) => {
    console.log(params);
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
                      uBoos / Sign up
                    </Text>
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
                      uBoos / Sign in
                    </Text>
                    <Form
                      messages={{
                        invalid: "it look like you miss something there",
                        required: "this field actually is required"
                      }}>
                      <FormField name="email" label="Email" required>
                        <TextInput
                          type="email"
                          size="small"
                          placeholder="your email"
                        />
                      </FormField>
                      <FormField
                        typeof="password"
                        name="password"
                        label="Password"
                        required>
                        <TextInput
                          type="password"
                          placeholder="give a strong one"
                        />
                      </FormField>

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

export default AuthComp;
