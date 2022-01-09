/** @jsxImportSource @emotion/react */
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { activateUser } from "../../../../services/user.service";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Formik } from "formik";
import { backgroundSoloPage } from "../../../../styles/colors";
import {
  inputErrorMsg,
  centerDivOnScreen,
  isSmallDeviceMediaQuery,
} from "../../../../styles/common";
import { login } from "../../../../services/auth.service";
import { loginUser } from "../../../../redux/slices/user.slice";
import { useDispatch } from "react-redux";
import {
  ActivateUserFormikErrors,
  ActivateUserFormikProps,
  ActivateUserParamsProps,
  ActivateUserProps,
  LoginProps,
} from "../../types/auth.type";

function ActivateUser() {
  const dispatch = useDispatch();
  const { email, id, securityKey } = useParams<ActivateUserParamsProps>();

  const routeHistory = useHistory();
  const [submitPasswordError, setSubmitPasswordError] =
    React.useState<string>("");

  function handleFormSubmit(
    values: ActivateUserFormikProps,
    { setSubmitting }: any
  ): void {
    const activateBody: ActivateUserProps = { ...values, id, securityKey };
    const loginBody: LoginProps = { ...values, email };

    activateUser(activateBody).then(
      () => {
        login(loginBody).then(
          (u) => {
            setSubmitting(false);
            dispatch(loginUser(u));
            routeHistory.push("/");
          },
          (error) => {
            setSubmitting(false);
            setSubmitPasswordError(error.message);
          }
        );
      },
      (error) => {
        setSubmitting(false);
        setSubmitPasswordError(error.message);
      }
    );
  }

  return (
    <div css={{ backgroundColor: backgroundSoloPage, height: "100vh" }}>
      <Card
        css={{
          minWidth: "300px",
          width: "30%",
          position: "absolute",
          ...centerDivOnScreen,
          ...isSmallDeviceMediaQuery({ width: "95%" }),
        }}
      >
        <h3 css={{ textAlign: "center" }}>Welcome aboard</h3>
        <Formik
          initialValues={{ password: "" }}
          validate={(values) => {
            const errors: ActivateUserFormikErrors = {};

            if (!values.password) {
              errors.password = "Password required";
            }

            return errors;
          }}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form autoComplete="true" onSubmit={handleSubmit}>
              <div css={{ marginTop: "30px" }} className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-key"></i>
                </span>
                <span className="p-float-label">
                  <InputText
                    id="password"
                    type="password"
                    value={values.password}
                    onChange={(e) => {
                      if (submitPasswordError) {
                        setSubmitPasswordError("");
                      }
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="password">Your password</label>
                </span>
              </div>
              {touched.password && errors.password ? (
                <div css={inputErrorMsg}>{errors.password}</div>
              ) : null}
              {submitPasswordError ? (
                <div
                  css={{
                    position: "relative",
                    top: "15px",
                    color: "red",
                    textAlign: "center",
                  }}
                >
                  {submitPasswordError}
                </div>
              ) : null}
              <Button
                css={{
                  display: "block",
                  width: "150px",
                  margin: "0 auto",
                  marginTop: "30px",
                }}
                type="submit"
                className="p-button-primary p-button-rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ProgressSpinner
                    strokeWidth="5"
                    style={{
                      width: "15px",
                      height: "15px",
                    }}
                  />
                ) : (
                  "Enter"
                )}
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
}

export default ActivateUser;
