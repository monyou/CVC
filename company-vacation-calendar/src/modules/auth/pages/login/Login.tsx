/** @jsxImportSource @emotion/react */
import React from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../../../services/auth.service";
import { InputText } from "primereact/inputtext";
import { centerDivOnScreen, PrimeButton } from "../../../../styles/common";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../../redux/slices/user.slice";
import calendarLogo from "../../../../assets/logos/calendar.png";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  LoginFormikErrors,
  LoginFormikProps,
  LoginProps,
} from "../../types/auth.type";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const routeHistory = useHistory();

  function handleFormSubmit(
    values: LoginFormikProps,
    { setSubmitting }: any
  ): void {
    const loginBody: LoginProps = { ...values };
    login(loginBody).then(
      (u) => {
        setSubmitting(false);
        dispatch(loginUser(u));
        routeHistory.push("/");
      },
      (error) => {
        setSubmitting(false);
        toast(error.message, {
          type: toast.TYPE.ERROR,
        });
      }
    );
  }

  return (
    <div
      css={{
        position: "absolute",
        width: "clamp(300px, 95%, 500px)",
        ...centerDivOnScreen,
      }}
    >
      <img
        src={calendarLogo}
        css={{
          display: "block",
          width: "100px",
          height: "100px",
          margin: "0 auto",
          cursor: "pointer",
        }}
        alt="logo"
        onClick={() => routeHistory.push("/")}
      />
      <h3 css={{ textAlign: "center", marginTop: 50 }}>Welcome</h3>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: LoginFormikErrors = {};
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
          <form autoComplete="true" onSubmit={handleSubmit}>
            <div css={{ marginTop: "30px" }} className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-envelope"></i>
              </span>
              <span className="p-float-label">
                <InputText
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  className={touched.email && errors.email ? "p-invalid" : ""}
                  aria-describedby="email-help"
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
              </span>
            </div>
            {touched.email && errors.email ? (
              <small id="email-help" className="p-error">
                {errors.email}
              </small>
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
                  className={
                    touched.password && errors.password ? "p-invalid" : ""
                  }
                  aria-describedby="password-help"
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
              </span>
            </div>
            {touched.password && errors.password ? (
              <small id="password-help" className="p-error">
                {errors.password}
              </small>
            ) : null}
            <PrimeButton
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
                "Login"
              )}
            </PrimeButton>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
