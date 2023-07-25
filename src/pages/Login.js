import React, {Fragment, useState} from "react";

import {useNavigate} from "react-router-dom";
import ButtonGroup from "@atlaskit/button/button-group";
import LoadingButton from "@atlaskit/button/loading-button";
import Button from "@atlaskit/button/standard-button";
import {Checkbox} from "@atlaskit/checkbox";
import TextField from "@atlaskit/textfield";
import {login} from "../api/index";
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
import {FIELDS} from "../constant";

function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  let from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    login(username, password)
      .then((response) => {
        const jwt = response.data.jwt;
        localStorage.setItem(FIELDS.JWT_TOKEN, jwt);
        localStorage.setItem(FIELDS.USER_NAME, username);

        auth.signin(username, () => {
          // Send them back to the page they tried to visit when they were
          // redirected to the login page. Use { replace: true } so we don't create
          // another entry in the history stack for the login page.  This means that
          // when they get to the protected page and click the back button, they
          // won't end up back on the login page, which is also really nice for the
          // user experience.
          navigate(from, {replace: true});
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        width: "400px",
        maxWidth: "100%",
        margin: "200px auto",
        flexDirection: "column",
      }}>
      <Form
        onSubmit={(data) => {
          console.log("form data", data);
          setUsername(data.username);
          setPassword(data.password);
          handleSubmit();
          return new Promise((resolve) => setTimeout(resolve, 2000)).then(() =>
            data.username === "error" ? {username: "IN_USE"} : undefined
          );
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
