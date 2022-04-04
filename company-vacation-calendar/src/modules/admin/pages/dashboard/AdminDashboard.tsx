/** @jsxImportSource @emotion/react */
import { useState, useRef } from "react";
import { VacationStatus } from "../../../../utils/enums";
import { useSelector } from "react-redux";
import { TabView, TabPanel } from "primereact/tabview";
import VacationRequestsList from "../../../../components/VacationRequestsList";
import UsersTable from "../../../../components/UsersTable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { Formik } from "formik";
import { PrimeButton } from "../../../../styles/common";
import { Roles } from "../../../../utils/enums";
import EventCalendar from "../../../../components/EventCalendar";
import VacationTypesLegend from "../../../../components/VacationTypesLegend";
import { vacationTypesColors } from "../../../../styles/colors";
import { OverlayPanel } from "primereact/overlaypanel";
import { selectUser } from "../../../../redux/slices/user.slice";
import {
  AdminEventInfoProps,
  CreateUserFormikErrors,
  CreateUserFormikProps,
  CreateUserProps,
  UpdateVacationProps,
} from "../../types/admin.type";
import { toast } from "react-toastify";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersByCompanyIdQuery,
  useGetAllVacationsByCompanyQuery,
  useUpdateVacationMutation,
} from "../../../../redux/baseApi";

function AdminDashboard() {
  const reduxUser = useSelector(selectUser);
  const [openAddUserDialog, setOpenAddUserDialog] = useState<boolean>(false);
  const [eventInfo, setEventInfo] = useState<AdminEventInfoProps>({
    message: "",
    title: "",
  });
  const eventInfoPanel = useRef<any>(null);

  const { data: vacationsForCompany, refetch: refetchVacationsForCompany } =
    useGetAllVacationsByCompanyQuery(reduxUser?.company?.id, {
      skip: !reduxUser?.company?.id,
    });
  const { data: allCompanyUsers, refetch: refetchAllCompanyUsers } =
    useGetAllUsersByCompanyIdQuery(reduxUser?.company?.id, {
      skip: !reduxUser?.company?.id,
    });
  const [updateVacation] = useUpdateVacationMutation();
  const [createUser] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const pendingVacations =
    vacationsForCompany?.filter(
      (v) => v.status.name === VacationStatus.Pending
    ) || [];

  const activeCompanyUsers =
    allCompanyUsers?.filter((u) => u.isActive && u.id !== reduxUser.sub) || [];

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

  function handleUpdateVacation(action: string, vacationId: string): void {
    let requestData: UpdateVacationProps = {
      id: vacationId,
    };

    switch (action) {
      case "accept":
        requestData.status = VacationStatus.Accepted;
        break;
      case "reject":
        requestData.status = VacationStatus.Rejected;
        break;
      default:
        break;
    }

    updateVacation(requestData)
      .then(() => {
        refetchVacationsForCompany();
        toast("Successfully updated vacation request", {
          type: toast.TYPE.SUCCESS,
        });
      })
      .catch((error) => {
        toast(error.message, {
          type: toast.TYPE.ERROR,
        });
      });
  }

  function handleCreateUser(
    values: CreateUserFormikProps,
    { setSubmitting }: any
  ): void {
    const user: CreateUserProps = {
      ...values,
      roleName: Roles.User,
      companyName: reduxUser.company.name,
    };

    createUser(user)
      .then(() => {
        refetchAllCompanyUsers();
        setOpenAddUserDialog(false);
        toast("Successfully created user", {
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

  function handleRemoveUser(userId: string): void {
    deleteUser(userId)
      .then(() => {
        refetchAllCompanyUsers();
        toast("Successfully removed user", {
          type: toast.TYPE.SUCCESS,
        });
      })
      .catch((error) => {
        toast(error.message, {
          type: toast.TYPE.ERROR,
        });
      });
  }

  return (
    <div>
      <div css={{ marginBottom: 10, textAlign: "center" }}>
        Available days: <strong>{reduxUser.vacationLimit}</strong>
      </div>
      <TabView
        renderActiveOnly={false}
        css={{ ".p-tabview-nav": { justifyContent: "center" } }}
      >
        <TabPanel header="Requests">
          <VacationRequestsList
            pendingVacations={pendingVacations}
            handleUpdateVacation={handleUpdateVacation}
          />
        </TabPanel>
        <TabPanel header="Calendar">
          <div
            css={{
              marginBottom: "20px",
            }}
          >
            <VacationTypesLegend />
          </div>

          <EventCalendar
            styles={{ height: "calc(100vh - 260px)" }}
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
            newEventOption={false}
          />

          <OverlayPanel
            css={{ maxWidth: "92%", transform: "translateX(10px)" }}
            ref={eventInfoPanel}
            showCloseIcon
            dismissable
          >
            <div css={{ textAlign: "center", marginBottom: "10px" }}>
              {eventInfo.title}
            </div>
            <div>Reasons:</div>
            <div css={{ fontWeight: "600" }}>{eventInfo.message}</div>
          </OverlayPanel>
        </TabPanel>
        <TabPanel header="Employees">
          <UsersTable
            users={activeCompanyUsers}
            addUser={() => setOpenAddUserDialog(true)}
            removeUser={handleRemoveUser}
          />
        </TabPanel>
      </TabView>

      {/* Dialogs */}

      <Dialog
        header="Add employee"
        visible={openAddUserDialog}
        css={{ width: "clamp(300px, 95%, 500px)" }}
        contentStyle={{ padding: "0px 25px 30px 25px" }}
        onHide={() => setOpenAddUserDialog(false)}
        draggable={false}
      >
        <Formik
          initialValues={{ email: "", firstName: "", lastName: "" }}
          validate={(values) => {
            const errors: CreateUserFormikErrors = {};

            if (!values.email) {
              errors.email = "Email required";
            } else if (
              !/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g.test(values.email)
            ) {
              errors.email = "Email invalid";
            }

            if (!values.firstName) {
              errors.firstName = "First name required";
            }

            if (!values.lastName) {
              errors.lastName = "Last name required";
            }

            return errors;
          }}
          onSubmit={handleCreateUser}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <div className="p-inputgroup">
                <span className="p-float-label">
                  <InputText
                    id="email"
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
              <div css={{ marginTop: "30px" }} className="p-inputgroup">
                <span className="p-float-label">
                  <InputText
                    id="firstName"
                    type="text"
                    value={values.firstName}
                    className={
                      touched.firstName && errors.firstName ? "p-invalid" : ""
                    }
                    aria-describedby="firstName-help"
                    onChange={handleChange}
                  />
                  <label htmlFor="firstName">First Name</label>
                </span>
              </div>
              {touched.firstName && errors.firstName ? (
                <small id="firstName-help" className="p-error">
                  {errors.firstName}
                </small>
              ) : null}
              <div css={{ marginTop: "30px" }} className="p-inputgroup">
                <span className="p-float-label">
                  <InputText
                    id="lastName"
                    type="text"
                    value={values.lastName}
                    className={
                      touched.lastName && errors.lastName ? "p-invalid" : ""
                    }
                    aria-describedby="lastName-help"
                    onChange={handleChange}
                  />
                  <label htmlFor="lastName">Last Name</label>
                </span>
              </div>
              {touched.lastName && errors.lastName ? (
                <small id="lastName-help" className="p-error">
                  {errors.lastName}
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
                  "Add"
                )}
              </PrimeButton>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}

export default AdminDashboard;
