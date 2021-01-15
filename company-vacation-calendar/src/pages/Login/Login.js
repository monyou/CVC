/** @jsxImportSource @emotion/react */
import React from "react";
import { useHistory } from "react-router-dom";
import { getToken, login } from "../../services/auth.service";
import { GlobalContext } from "../../App";
import { backgroundSoloPage } from "../../styles/colors";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { centerDivOnScreen, inputErrorMsg } from "../../styles/common";
import { Formik } from "formik";

function Login() {
  const routeHistory = useHistory();
  const [submitLoginFormError, setSubmitLoginFormError] = React.useState(null);
  const [globalState, setGlobalState] = React.useContext(GlobalContext);

  React.useLayoutEffect(() => {
    if (getToken()) {
      routeHistory.replace("/dashboard");
      return;
    }
  }, [globalState, setGlobalState, routeHistory]);

  function handleFormSubmit(values, { setSubmitting }) {
    login(values).then(
      (u) => {
        setGlobalState({ ...globalState, user: u });
        setSubmitting(false);
        routeHistory.push("/dashboard");
      },
      (error) => {
        setSubmitLoginFormError(error.message);
        setSubmitting(false);
      }
    );
  }

  return (
    <div css={{ backgroundColor: backgroundSoloPage, height: "100vh" }}>
      <Card css={{ minWidth: "300px", width: "30%", ...centerDivOnScreen }}>
        <h3>Welcome back,</h3>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email required";
            } else if (
              !/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g.test(values.email)
            ) {
              errors.email = "Invalid email";
            }

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
            <form onSubmit={handleSubmit}>
              <div css={{ marginTop: "30px" }} className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-envelope"></i>
                </span>
                <span className="p-float-label">
                  <InputText
                    id="email"
                    name="email"
                    type="text"
                    value={values.email}
                    onChange={(e) => {
                      if (submitLoginFormError) {
                        setSubmitLoginFormError(null);
                      }
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="email">Email</label>
                </span>
              </div>
              {touched.email && errors.email ? (
                <div css={inputErrorMsg}>{errors.email}</div>
              ) : null}
              <div className="p-inputgroup" css={{ marginTop: "25px" }}>
                <span className="p-inputgroup-addon">
                  <i className="pi pi-key"></i>
                </span>
                <span className="p-float-label">
                  <InputText
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={(e) => {
                      if (submitLoginFormError) {
                        setSubmitLoginFormError(null);
                      }
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="password">Password</label>
                </span>
              </div>
              {touched.password && errors.password ? (
                <div css={inputErrorMsg}>{errors.password}</div>
              ) : null}
              {submitLoginFormError ? (
                <div
                  css={{
                    position: "relative",
                    top: "15px",
                    color: "red",
                    textAlign: "center",
                  }}
                >
                  {submitLoginFormError}
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
                label={isSubmitting ? "Processing..." : "Enter"}
                className="p-button-primary p-button-rounded"
                disabled={isSubmitting}
              />
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
}

export { Login };
