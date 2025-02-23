import React, {Fragment} from "react";
import {useNavigate} from "react-router-dom";
import ButtonGroup from "@atlaskit/button/button-group";
import LoadingButton from "@atlaskit/button/loading-button";
import Button from "@atlaskit/button/standard-button";
import {Checkbox} from "@atlaskit/checkbox";
import TextField from "@atlaskit/textfield";
import {registerUser} from "../api/authApi";
import Form, {
  CheckboxField,
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection,
  HelperMessage,
  RequiredAsterisk,
} from "@atlaskit/form";
import "../styles/signup.css";

function Signup() {
  let navigate = useNavigate();

  const handleSubmit = (data) => {
    registerUser(data)
      .then((response) => {
        console.log("Signup success!! >> res ", response);

        localStorage.setItem("signupUserName", response.data.userName);
        navigate("/login", {replace: true});
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div id='signup-form'>
      <Form
        onSubmit={(data) => {
          handleSubmit(data);
        }}>
        {({formProps, submitting}) => (
          <form {...formProps}>
            <FormHeader title='Sign Up'>
              <p aria-hidden='true'>
                Required fields are marked with an asterisk <RequiredAsterisk />
              </p>
            </FormHeader>
            <FormSection>
              <Field name='username' label='Username' isRequired>
                {({fieldProps}) => (
                  <Fragment>
                    <TextField autoComplete='off' {...fieldProps} />
                    <HelperMessage>Choose a unique username.</HelperMessage>
                  </Fragment>
                )}
              </Field>

              <Field name='email' label='Email' isRequired>
                {({fieldProps}) => (
                  <Fragment>
                    <TextField type='email' {...fieldProps} />
                    <HelperMessage>Enter a valid email address.</HelperMessage>
                  </Fragment>
                )}
              </Field>

              <Field name='password' label='Password' isRequired>
                {({fieldProps, error}) => (
                  <Fragment>
                    <TextField type='password' {...fieldProps} />
                    {error && <ErrorMessage>Password too short.</ErrorMessage>}
                  </Fragment>
                )}
              </Field>

              <CheckboxField
                name='terms'
                label='Accept Terms & Conditions'
                isRequired>
                {({fieldProps}) => (
                  <Checkbox
                    {...fieldProps}
                    label='I agree to the terms and conditions'
                  />
                )}
              </CheckboxField>
            </FormSection>

            <FormFooter>
              <ButtonGroup>
                <Button appearance='subtle' onClick={() => navigate("/login")}>
                  Back to Login
                </Button>
                <LoadingButton
                  type='submit'
                  appearance='primary'
                  isLoading={submitting}>
                  Sign Up
                </LoadingButton>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>
    </div>
  );
}

export default Signup;
