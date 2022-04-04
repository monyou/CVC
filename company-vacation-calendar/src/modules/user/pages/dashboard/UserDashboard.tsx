/** @jsxImportSource @emotion/react */
import { useState, useRef } from "react";
import EventCalendar from "../../../../components/EventCalendar";
import { Dialog } from "primereact/dialog";
import { Formik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import {
  isSmallDeviceMediaQuery,
  PrimeButton,
} from "../../../../styles/common";
import { Calendar } from "primereact/calendar";
import { useSelector } from "react-redux";
import VacationTypesLegend from "../../../../components/VacationTypesLegend";
import { locale } from "primereact/api";
import { vacationTypesColors } from "../../../../styles/colors";
import { OverlayPanel } from "primereact/overlaypanel";
import { VacationStatus } from "../../../../utils/enums";
import moment from "moment";
import { selectUser } from "../../../../redux/slices/user.slice";
import { toast } from "react-toastify";
import {
  UserEventInfoProps,
  UserSubmitVacationFormikErrors,
  UserSubmitVacationFormikProps,
  UserSubmitVacationProps,
} from "../../types/user.type";
import {
  useCreateVacationMutation,
  useGetAllHolidaysQuery,
  useGetAllVacationsByCompanyQuery,
  useGetAllVacationTypesQuery,
} from "../../../../redux/baseApi";

function UserDashboard() {
  locale("bg");

  const reduxUser = useSelector(selectUser);
  const [showApplyForVacationDialog, setShowApplyForVacationDialog] =
    useState<boolean>(false);
  const [eventInfo, setEventInfo] = useState<UserEventInfoProps>({
    message: "",
    title: "",
  });
  const eventInfoPanel = useRef<any>(null);

  const { data: vacationTypes } = useGetAllVacationTypesQuery();
  const { data: holidays } = useGetAllHolidaysQuery();
  const { data: vacationsForCompany } = useGetAllVacationsByCompanyQuery(
    reduxUser?.company?.id,
    { skip: !reduxUser?.company?.id }
  );
  const [createVacation] = useCreateVacationMutation();

  const vacationsCalendarEvents =
    vacationsForCompany
      ?.filter((x) => x.status.name === VacationStatus.Accepted)
      .map((v) =>
        v.days.map((d) => ({
          start: new Date(+d),
          end: new Date(+d),
          title: v.username,
          description: v.description,
          vacationType: v.vacationType.name,
        }))
      )
      .flat() || [];

  const userPendingAndAcceptedVacationApplications =
    vacationsForCompany
      ?.filter(
        (x) =>
          (x.status.name === VacationStatus.Pending ||
            x.status.name === VacationStatus.Accepted) &&
          x.userId === reduxUser.sub
      )
      .flatMap((x) => x.days)
      .map((d) => new Date(d)) || [];

  const disabledDaysForApplicationLeave = [
    ...(holidays?.map((d) => new Date(d)) || []),
    ...userPendingAndAcceptedVacationApplications,
  ];

  function handleVacationSubmit(
    values: UserSubmitVacationFormikProps,
    { setSubmitting }: any
  ): void {
    const requestModel: UserSubmitVacationProps = {
      userId: reduxUser.sub,
      username: `${reduxUser.firstName} ${reduxUser.lastName}`,
      description: values.description,
      vacationType: values.vacationType,
      days: values.dates.map((d: Date) => d.getTime()),
    };
    createVacation(requestModel)
      .then(() => {
        setShowApplyForVacationDialog(false);
        toast("Vacation request was sent to managers for approval", {
          type: toast.TYPE.SUCCESS,
        });
      })
      .catch((error) => {
        toast(error.message, {
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <div>
      <div css={{ marginBottom: 30, textAlign: "center" }}>
        Available days: <strong>{reduxUser.vacationLimit}</strong>
      </div>
      <div css={{ marginBottom: 30 }}>
        <VacationTypesLegend vacationTypes={vacationTypes} />
      </div>

      <EventCalendar
        styles={{ height: "calc(100vh - 200px)" }}
        eventsList={vacationsCalendarEvents}
        eventStyling={(e: any) => ({
          style: {
            textShadow: "0 0 2px black",
            backgroundColor: vacationTypesColors[e.vacationType],
          },
        })}
        onEventClicked={(e: any, el: any) => {
          setEventInfo({ message: e.description, title: e.title });
          eventInfoPanel.current.toggle(el);
        }}
        onNewEvent={() => {
          setShowApplyForVacationDialog(true);
        }}
      />

      <OverlayPanel
        css={{ maxWidth: "92%", transform: "translateX(10px)" }}
        ref={eventInfoPanel}
        showCloseIcon
        dismissable
      >
        <div css={{ textAlign: "center", marginBottom: "5px" }}>
          {eventInfo.title}
        </div>
        <div css={{ marginBottom: "10px" }}>Reasons:</div>
        <div css={{ fontWeight: "600" }}>{eventInfo.message}</div>
      </OverlayPanel>

      {/* Dialogs */}

      <Dialog
        header="Apply for vacation"
        visible={showApplyForVacationDialog}
        css={{ width: "50%", ...isSmallDeviceMediaQuery({ width: "95%" }) }}
        contentStyle={{ padding: "0px 25px 30px 25px" }}
        onHide={() => {
          setShowApplyForVacationDialog(false);
        }}
        draggable={false}
      >
        <Formik
          initialValues={{ vacationType: "", description: "", dates: [] }}
          validate={(values) => {
            const errors: UserSubmitVacationFormikErrors = {};

            if (!values.vacationType) {
              errors.vacationType = "Type required";
            }

            if (!values.description) {
              errors.description = "Reason required";
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
                options={vacationTypes?.map((t) => ({
                  label: t.name,
                  value: t,
                }))}
                onChange={handleChange}
                className={
                  touched.vacationType && errors.vacationType ? "p-invalid" : ""
                }
                aria-describedby="vacationType-help"
                placeholder="Type"
              />
              {touched.vacationType && errors.vacationType ? (
                <small
                  id="vacationType-help"
                  className="p-error"
                  css={{ display: "block" }}
                >
                  {errors.vacationType}
                </small>
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
                    className={
                      touched.description && errors.description
                        ? "p-invalid"
                        : ""
                    }
                    aria-describedby="description-help"
                    autoResize
                  />
                  <label htmlFor="description">Reasons</label>
                </span>
              </div>
              {touched.description && errors.description ? (
                <small
                  id="description-help"
                  className="p-error"
                  css={{ display: "block" }}
                >
                  {errors.description}
                </small>
              ) : null}
              <Calendar
                css={{
                  position: "relative",
                  left: "50%",
                  transform: "translateX(-50%)",
                  marginTop: "20px",
                }}
                minDate={moment().add(1, "days").toDate()}
                readOnlyInput
                disabledDays={[0, 6]}
                disabledDates={disabledDaysForApplicationLeave}
                inline
                value={values.dates}
                id="dates"
                onChange={handleChange}
                selectionMode="multiple"
                numberOfMonths={1}
              />
              {touched.dates && errors.dates ? (
                <small
                  id="dates-help"
                  className="p-error"
                  css={{ display: "block", textAlign: "center" }}
                >
                  {errors.dates}
                </small>
              ) : null}
              <PrimeButton
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

export default UserDashboard;
