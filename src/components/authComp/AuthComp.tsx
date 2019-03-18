import React, { Component } from "react";
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

export interface AuthCompState {}

class AuthComp extends Component<AuthCompProps, AuthCompState> {
  constructor(props: AuthCompProps) {
    super(props);
    //this.state = { :  };
  }
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
                <Box id="sign_up" direction="column" pad="small">
                  <Text
                    size="large"
                    margin={{ bottom: "medium", left: "small", top: "medium" }}
                    weight={400}>
                    uBoos / Sign up
                  </Text>
                  <Form
                    messages={{
                      invalid: "it look like you miss something there",
                      required: "this field actually is required"
                    }}>
                    <FormField name="name" label="Name" pad={true} required />
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
                    <FormField
                      name="password_confirmation"
                      label="Password confirmation"
                      required>
                      <TextInput
                        type="password"
                        placeholder="confirm the password"
                      />
                    </FormField>
                    <Box direction="row" justify="end">
                      <Button
                        type="submit"
                        primary
                        label="Sign me up"
                        alignSelf="end"
                      />
                    </Box>
                  </Form>
                </Box>
                <Box id="sign_in" />
              </Box>
              <Box flex="shrink" width="xxsmall" background="dark-1" />
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

export default AuthComp;
