/** @jsxImportSource @emotion/react */
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { activateUser } from "../../services/user.service";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Formik } from "formik";
import { backgroundSoloPage } from "../../styles/colors";
import { inputErrorMsg, centerDivOnScreen } from "../../styles/common";
import { login } from "../../services/auth.service";
import { loginUserAction } from "../../redux/actions/user.action";
import { useDispatch } from "react-redux";

function ActivateUser() {
  const dispatch = useDispatch();
  const { email, id, securityKey } = useParams();

  const routeHistory = useHistory();
  const [submitPasswordError, setSubmitPasswordError] = React.useState(null);

  function handleFormSubmit(values, { setSubmitting }) {
    const activateBody = { ...values, id, securityKey };
    const loginBody = { ...values, email };

    activateUser(activateBody).then(
      () => {
        login(loginBody).then(
          (u) => {
            setSubmitting(false);
            dispatch(loginUserAction(u));
            routeHistory.push("/dashboard");
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
      <Card css={{ minWidth: "300px", width: "30%", ...centerDivOnScreen }}>
        <h3 css={{ textAlign: "center" }}>Welcome aboard</h3>
        <Formik
          initialValues={{ password: "" }}
          validate={(values) => {
            const errors = {};

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
                        setSubmitPasswordError(null);
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

export { ActivateUser };
