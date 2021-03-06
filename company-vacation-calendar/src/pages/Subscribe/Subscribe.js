/** @jsxImportSource @emotion/react */
import React from "react";
import { backgroundSoloPage } from "../../styles/colors";
import {
  centerDivOnScreen,
  inputErrorMsg,
  inputGroupWithError,
  isSmallDeviceMediaQuery,
} from "../../styles/common";
import { Card } from "primereact/card";
import calendarLogo from "../../assets/logos/calendar.png";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ErrorMessage, Formik } from "formik";
import { useHistory } from "react-router";
import { subscribe } from "../../services/auth.service";
import { useMutation } from "react-query";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";

function Subscribe() {
  const routeHistory = useHistory();
  const subscriptionToast = React.useRef(null);

  const subscribeClientMutation = useMutation((data) => subscribe(data), {
    onSuccess: () => {
      routeHistory.replace("/home", { subscriptionToast: true });
    },
    onError: (error) => {
      subscriptionToast.current.show({
        severity: "error",
        summary: "Subscription Error",
        detail: error.message,
      });
    },
  });

  function handleFormSubmit(values, { setSubmitting }) {
    subscribeClientMutation.mutate(values, {
      onSettled: () => {
        setSubmitting(false);
      },
    });
  }

  return (
    <div css={{ backgroundColor: backgroundSoloPage, height: "100vh" }}>
      <Toast
        css={{ fontSize: "12px", maxWidth: "90%" }}
        ref={subscriptionToast}
      />
      <Card
        css={{
          width: "70%",
          maxHeight: "95%",
          overflowY: "auto",
          ...centerDivOnScreen,
          ...isSmallDeviceMediaQuery({ width: "95%" }),
        }}
      >
        <img
          src={calendarLogo}
          css={{
            display: "block",
            width: "100px",
            height: "100px",
            margin: "0 auto",
            boxShadow: "0 0 50px grey",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          alt="logo"
          onClick={() => routeHistory.push("/home")}
        />
        <h3 css={{ textAlign: "center" }}>
          Hello,
          <br />
          We need some info from you
        </h3>
        <Formik
          initialValues={{
            email: "",
            firstName: "",
            lastName: "",
            name: "",
            bulstat: "",
            yearVacationLimit: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Manager email is required";
            } else if (
              !/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g.test(values.email)
            ) {
              errors.email = "Invalid email";
            }

            if (!values.firstName) {
              errors.firstName = "Manager first name is required";
            }

            if (!values.lastName) {
              errors.lastName = "Manager last name is required";
            }

            if (!values.name) {
              errors.name = "Company name is required";
            }

            if (!values.bulstat) {
              errors.bulstat = "Bulstat is required";
            } else if (
              values.bulstat.length !== 9 ||
              !/^[0-9]*$/g.test(values.bulstat)
            ) {
              errors.bulstat = "Bulstat must be 9 digits number";
            }

            if (!values.yearVacationLimit) {
              errors.yearVacationLimit = "Vacations limit is required";
            } else if (!/^[0-9]*$/g.test(values.yearVacationLimit)) {
              errors.yearVacationLimit =
                "Vacations limit must be positive number";
            }

            return errors;
          }}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form noValidate autoComplete="true" onSubmit={handleSubmit}>
              <div
                css={{
                  display: "flex",
                  justifyContent: "center",
                  ...isSmallDeviceMediaQuery({ flexDirection: "column" }),
                }}
              >
                <div>
                  <div css={{ ...inputGroupWithError }}>
                    <div className="p-inputgroup">
                      <span className="p-inputgroup-addon">
                        <i className="pi pi-briefcase"></i>
                      </span>
                      <span className="p-float-label">
                        <InputText
                          id="name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="name">Company Name</label>
                      </span>
                    </div>
                    <ErrorMessage
                      css={inputErrorMsg}
                      name="name"
                      component="div"
                    />
                  </div>
                  <div css={{ ...inputGroupWithError }}>
                    <div className="p-inputgroup">
                      <span className="p-inputgroup-addon">
                        <i className="pi pi-id-card"></i>
                      </span>
                      <span className="p-float-label">
                        <InputText
                          id="bulstat"
                          name="bulstat"
                          value={values.bulstat}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="bulstat">Company Bulstat</label>
                      </span>
                    </div>
                    <ErrorMessage
                      css={inputErrorMsg}
                      name="bulstat"
                      component="div"
                    />
                  </div>
                  <div css={{ ...inputGroupWithError }}>
                    <div className="p-inputgroup">
                      <span className="p-inputgroup-addon">
                        <i className="pi pi-calendar"></i>
                      </span>
                      <span className="p-float-label">
                        <InputText
                          id="yearVacationLimit"
                          name="yearVacationLimit"
                          value={values.yearVacationLimit}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="yearVacationLimit">
                          Company Vacations Limit
                        </label>
                      </span>
                    </div>
                    <ErrorMessage
                      css={inputErrorMsg}
                      name="yearVacationLimit"
                      component="div"
                    />
                  </div>
                </div>
                <Divider
                  css={isSmallDeviceMediaQuery({ display: "none" })}
                  layout="vertical"
                />
                <div>
                  <div css={{ ...inputGroupWithError }}>
                    <div className="p-inputgroup">
                      <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                      </span>
                      <span className="p-float-label">
                        <InputText
                          id="firstName"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="firstName">Manager First Name</label>
                      </span>
                    </div>
                    <ErrorMessage
                      css={inputErrorMsg}
                      name="firstName"
                      component="div"
                    />
                  </div>
                  <div css={{ ...inputGroupWithError }}>
                    <div className="p-inputgroup">
                      <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                      </span>
                      <span className="p-float-label">
                        <InputText
                          id="lastName"
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="lastName">Manager Last Name</label>
                      </span>
                    </div>
                    <ErrorMessage
                      css={inputErrorMsg}
                      name="lastName"
                      component="div"
                    />
                  </div>
                  <div css={{ ...inputGroupWithError }}>
                    <div className="p-inputgroup">
                      <span className="p-inputgroup-addon">
                        <i className="pi pi-envelope"></i>
                      </span>
                      <span className="p-float-label">
                        <InputText
                          id="email"
                          name="email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label htmlFor="email">Manager Email</label>
                      </span>
                    </div>
                    <ErrorMessage
                      css={inputErrorMsg}
                      name="email"
                      component="div"
                    />
                  </div>
                </div>
              </div>
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
                  "Subscribe"
                )}
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
}

export { Subscribe };
