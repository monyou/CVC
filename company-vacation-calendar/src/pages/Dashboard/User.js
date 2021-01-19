/** @jsxImportSource @emotion/react */
import React from "react";
import { EventCalendar } from "../../components/EventCalendar";
import { Dialog } from "primereact/dialog";
import {
  getAllVacationsByCompany,
  getAllVacationTypes,
} from "../../services/vacation.service";
import { Formik } from "formik";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { inputErrorMsg } from "../../styles/common";
import { Calendar } from "primereact/calendar";
import { createVacation } from "../../services/vacation.service";
import { getAllHolidays } from "../../services/holiday.service";
import { useSelector } from "react-redux";

function User() {
  const store = useSelector((state) => ({ user: state.user }));
  const [state, setState] = React.useState({
    vacationsForCompany: [],
    vacationTypes: [],
    holidays: [],
    showDialog: false,
  });

  React.useEffect(() => {
    getAllHolidays().then((response) => {
      setState((s) => ({
        ...s,
        holidays: response.holidays
          .find((h) => h.year === new Date().getFullYear())
          .dates.map((d) => new Date(d)),
      }));
    });

    getAllVacationTypes().then((response) => {
      setState((s) => ({
        ...s,
        vacationTypes: response.vacationTypes.map((t) => ({
          label: t.name,
          value: t,
        })),
      }));
    });

    getAllVacationsByCompany(store.user?.company?.id).then((vacations) => {
      let calendarTiles = vacations
        .map((v) =>
          v.days.map((d) => ({
            start: new Date(+d),
            end: new Date(+d),
            title: v.username,
          }))
        )
        .flat();

      setState((s) => ({
        ...s,
        vacationsForCompany: calendarTiles,
      }));
    });
  }, [store.user?.company?.id]);

  function handleVacationSubmit(values, { setSubmitting }) {
    const requestModel = {
      userId: store.user.sub,
      username: store.user.name,
      description: values.description,
      vacationType: values.vacationType,
      days: values.dates.map((d) => d.getTime()),
    };
    createVacation(requestModel).then(
      (response) => {
        setSubmitting(false);
        setState((s) => ({ ...s, showDialog: false }));
      },
      (error) => {
        setSubmitting(false);
      }
    );
  }

  return (
    <div>
      <EventCalendar
        eventsList={state.vacationsForCompany}
        onNewEvent={(e) => {
          setState((s) => ({ ...s, showDialog: true }));
        }}
      />

      <Dialog
        header="Apply for vacation"
        visible={state.showDialog}
        css={{ width: "70vw" }}
        contentStyle={{ maxHeight: "90vh", padding: "10px 25px 40px 25px" }}
        onHide={() => {
          setState((s) => ({ ...s, showDialog: false }));
        }}
      >
        <Formik
          initialValues={{ vacationType: "", description: "", dates: [] }}
          validate={(values) => {
            const errors = {};

            if (!values.vacationType) {
              errors.vacationType = "Type required";
            }

            if (!values.description) {
              errors.description = "Description required";
            }

            if (values.dates.length < 1) {
              errors.dates = "Dates required";
            }

            return errors;
          }}
          onSubmit={handleVacationSubmit}
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
              <Dropdown
                css={{
                  width: "150px",
                }}
                id="vacationType"
                name="vacationType"
                value={values.vacationType}
                options={state.vacationTypes}
                onChange={handleChange}
                placeholder="Type"
              />
              {touched.vacationType && errors.vacationType ? (
                <div css={inputErrorMsg}>{errors.vacationType}</div>
              ) : null}
              <div css={{ marginTop: "30px" }} className="p-inputgroup">
                <span className="p-float-label">
                  <InputTextarea
                    id="description"
                    name="description"
                    rows={5}
                    cols={30}
                    value={values.description}
                    onChange={handleChange}
                    autoResize
                  />
                  <label htmlFor="description">
                    Why you need this vacation
                  </label>
                </span>
              </div>
              {touched.description && errors.description ? (
                <div css={inputErrorMsg}>{errors.description}</div>
              ) : null}
              <Calendar
                css={{
                  position: "relative",
                  left: "50%",
                  transform: "translateX(-50%)",
                  marginTop: "20px",
                }}
                readOnlyInput
                disabledDays={[0, 6]}
                disabledDates={state.holidays}
                inline
                value={values.dates}
                id="dates"
                onChange={handleChange}
                selectionMode="multiple"
                numberOfMonths={1}
              />
              {touched.dates && errors.dates ? (
                <div css={inputErrorMsg}>{errors.dates}</div>
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
      </Dialog>
    </div>
  );
}

export { User };
