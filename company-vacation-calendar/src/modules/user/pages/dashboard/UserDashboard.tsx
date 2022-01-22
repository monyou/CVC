/** @jsxImportSource @emotion/react */
import React from "react";
import EventCalendar from "../../../../components/EventCalendar";
import { Dialog } from "primereact/dialog";
import {
  getAllVacationsByCompany,
  getAllVacationTypes,
} from "../../../../services/vacation.service";
import { Formik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import {
  inputErrorMsg,
  isSmallDeviceMediaQuery,
  PrimeButton,
} from "../../../../styles/common";
import { Calendar } from "primereact/calendar";
import { createVacation } from "../../../../services/vacation.service";
import { getAllHolidays } from "../../../../services/holiday.service";
import { useSelector } from "react-redux";
import VacationTypesLegend from "../../../../components/VacationTypesLegend";
import { useQuery } from "react-query";
import { locale } from "primereact/api";
import { vacationTypesColors } from "../../../../styles/colors";
import { OverlayPanel } from "primereact/overlaypanel";
import { useMutation } from "react-query";
import { VacationStatus } from "../../../../utils/enums";
import moment from "moment";
import { selectUser } from "../../../../redux/slices/user.slice";
import VacationModel from "../../../../dtos/vacation.dto";
import VacationTypeModel from "../../../../dtos/vacationType.dto";
import HolidayModel from "../../../../dtos/holiday.dto";
import { toast } from "react-toastify";
import {
  UserEventInfoProps,
  UserSubmitVacationFormikErrors,
  UserSubmitVacationFormikProps,
  UserSubmitVacationProps,
} from "../../types/user.type";

function UserDashboard() {
  locale("bg");

  const reduxUser = useSelector(selectUser);
  const [showApplyForVacationDialog, setShowApplyForVacationDialog] =
    React.useState<boolean>(false);
  const [eventInfo, setEventInfo] = React.useState<UserEventInfoProps>({
    message: "",
    title: "",
  });
  const eventInfoPanel = React.useRef<any>(null);

  const { data: vacationTypes } = useQuery<Array<VacationTypeModel>>(
    "vacation-types",
    () => getAllVacationTypes().then((data) => data.vacationTypes),
    {
      initialData: [],
    }
  );
  const { data: holidays } = useQuery<Array<HolidayModel>>(
    "holidays",
    () => getAllHolidays().then((data) => data.holidays),
    {
      initialData: [],
    }
  );
  const { data: vacationsForCompany } = useQuery<Array<VacationModel>>(
    "vacations-per-company",
    () => getAllVacationsByCompany(reduxUser.company.id).then((data) => data),
    {
      initialData: [],
      enabled: !!reduxUser.company.id,
    }
  );

  const createVacationMutation = useMutation(
    (requestData: UserSubmitVacationProps) => createVacation(requestData),
    {
      onSuccess: () => {
        setShowApplyForVacationDialog(false);
        toast("Vacation request was sent to managers for approval", {
          type: toast.TYPE.SUCCESS,
        });
      },
    }
  );

  const vacationsCalendarEvents =
    vacationsForCompany
      ?.filter((x) => x.status === VacationStatus.Accepted)
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

  function handleVacationSubmit(
    values: UserSubmitVacationFormikProps,
    { setSubmitting }: any
  ): void {
    const requestModel: UserSubmitVacationProps = {
      userId: reduxUser.sub,
      username: reduxUser.name,
      description: values.description,
      vacationType: values.vacationType,
      days: values.dates.map((d: Date) => d.getTime()),
    };
    createVacationMutation.mutate(requestModel, {
      onSettled: () => {
        setSubmitting(false);
      },
    });
  }

  return (
    <div>
      <div
        css={{
          marginBottom: "30px",
        }}
      >
        <VacationTypesLegend vacationTypes={vacationTypes} />
      </div>

      <EventCalendar
        styles={{ height: "calc(100vh - 160px)" }}
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
        contentStyle={{ padding: "10px 25px 40px 25px" }}
        onHide={() => {
          setShowApplyForVacationDialog(false);
        }}
      >
        <Formik
          initialValues={{ vacationType: "", description: "", dates: [] }}
          validate={(values) => {
            const errors: UserSubmitVacationFormikErrors = {};

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
                options={vacationTypes?.map((t) => ({
                  label: t.name,
                  value: t,
                }))}
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
                minDate={moment().add(1, "days").toDate()}
                readOnlyInput
                disabledDays={[0, 6]}
                disabledDates={holidays
                  ?.find((h) => h.year === new Date().getFullYear())
                  ?.dates.map((d) => new Date(d))}
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
