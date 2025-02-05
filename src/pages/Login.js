import React, {Fragment, useState} from "react";

import {useNavigate, useLocation} from "react-router-dom";
import ButtonGroup from "@atlaskit/button/button-group";
import LoadingButton from "@atlaskit/button/loading-button";
import Button from "@atlaskit/button/standard-button";
import {Checkbox} from "@atlaskit/checkbox";
import TextField from "@atlaskit/textfield";
import {authenticate} from "../api/index";
import {useAuth} from "../services/AuthProvider";

import Form, {
  CheckboxField,
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection,
  HelperMessage,
  RequiredAsterisk,
  ValidMessage,
} from "@atlaskit/form";

import "../styles/login.css";
import {FIELDS} from "../constant";

function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  let from = location.state?.from?.pathname || "/";

  const handleSubmit = (data) => {
    authenticate(data.username, data.password)
      .then((response) => {
        const jwt = response.data.jwt;
        localStorage.setItem(FIELDS.JWT_TOKEN, jwt);
        localStorage.setItem(FIELDS.USER_NAME, data.username);

        auth.signin(data.username, () => {
          navigate(from, {replace: true});
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div id='login-form'>
      <Form
        onSubmit={(data) => {
          handleSubmit(data);
        }}>
        {({formProps, submitting}) => (
          <form {...formProps}>
            <FormHeader title='Login'>
              <p aria-hidden='true'>
                Required fields are marked with an asterisk <RequiredAsterisk />
              </p>
            </FormHeader>
            <FormSection>
              <Field
                aria-required={true}
                name='username'
                label='Username'
                isRequired
                defaultValue='tienlm'>
                {({fieldProps, error}) => (
                  <Fragment>
                    <TextField autoComplete='off' {...fieldProps} />
                    {!error && (
                      <HelperMessage>
                        You can use letters, numbers and periods.
                      </HelperMessage>
                    )}
                    {error && (
                      <ErrorMessage>
                        This username is already in use, try another one.
                      </ErrorMessage>
                    )}
                  </Fragment>
                )}
              </Field>
              <Field
                aria-required={true}
                name='password'
                label='Password'
                defaultValue=''
                isRequired
                validate={(value) =>
                  value && value.length < 4 ? "TOO_SHORT" : undefined
                }>
                {({fieldProps, error, valid, meta}) => {
                  return (
                    <Fragment>
                      <TextField type='password' {...fieldProps} />
                      {error && !valid && (
                        <HelperMessage>
                          Use 4 or more characters with a mix of letters,
                          numbers and symbols.
                        </HelperMessage>
                      )}
                      {error && (
                        <ErrorMessage>
                          Password needs to be more than 4 characters.
                        </ErrorMessage>
                      )}
                      {valid && meta.dirty ? (
                        <ValidMessage>Awesome password!</ValidMessage>
                      ) : null}
                    </Fragment>
                  );
                }}
              </Field>
              <CheckboxField
                name='remember'
                label='Remember me'
                defaultIsChecked>
                {({fieldProps}) => (
                  <Checkbox
                    {...fieldProps}
                    label='Always sign in on this device'
                  />
                )}
              </CheckboxField>
            </FormSection>

            <FormFooter>
              <ButtonGroup>
                <Button appearance='subtle'>Cancel</Button>
                <LoadingButton
                  type='submit'
                  appearance='primary'
                  isLoading={submitting}>
                  Login
                </LoadingButton>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>
    </div>
  );
}

export default Login;
