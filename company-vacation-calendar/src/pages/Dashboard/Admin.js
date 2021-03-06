/** @jsxImportSource @emotion/react */
import React from "react";
import {
  getAllVacationsByCompany,
  updateVacation,
} from "../../services/vacation.service";
import { vacationStatus } from "../../utils/enums";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createUser,
  deleteUser,
  getAllUsersByCompanyId,
} from "../../services/user.service";
import { TabView, TabPanel } from "primereact/tabview";
import { VacationRequestsList } from "../../components/VacationRequestsList";
import { UsersTable } from "../../components/UsersTable";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { Formik } from "formik";
import { inputErrorMsg, isSmallDeviceMediaQuery } from "../../styles/common";
import { roles } from "../../utils/enums";
import { EventCalendar } from "../../components/EventCalendar";
import { VacationTypesLegend } from "../../components/VacationTypesLegend";
import { vacationTypesColors } from "../../styles/colors";
import { OverlayPanel } from "primereact/overlaypanel";

function Admin() {
  const store = useSelector((state) => ({ user: state.user }));
  const queryClient = useQueryClient();
  const [openAddUserDialog, setOpenAddUserDialog] = React.useState(false);
  const [addUserError, setAddUserError] = React.useState(null);
  const [eventInfo, setEventInfo] = React.useState({
    message: "",
    title: "",
  });
  const eventInfoPanel = React.useRef(null);

  const { data: vacationsForCompany } = useQuery(
    "vacations-per-company",
    () => getAllVacationsByCompany(store.user.company.id),
    { enabled: !!store.user.company.id }
  );
  const updateVacationMutation = useMutation(
    (requestData) => updateVacation(requestData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("vacations-per-company");
      },
    }
  );

  const { data: allCompanyUsers } = useQuery(
    "all-company-users",
    () =>
      getAllUsersByCompanyId(store.user.company.id).then(
        (response) => response.users
      ),
    { enabled: !!store.user?.company?.id }
  );
  const deleteUserMutation = useMutation((userId) => deleteUser(userId), {
    onSuccess: () => {
      queryClient.invalidateQueries("all-company-users");
    },
  });
  const createUserMutation = useMutation((user) => createUser(user), {
    onSuccess: () => {
      queryClient.invalidateQueries("all-company-users");
      setOpenAddUserDialog(false);
    },
    onError: (error) => {
      setAddUserError(error.message);
    },
  });

  const pendingVacations =
    vacationsForCompany?.filter((v) => v.status === vacationStatus.Pending) ||
    [];

  const activeCompanyUsers =
    allCompanyUsers?.filter((u) => u.isActive && u.id !== store.user.sub) || [];

  const vacationsCalendarEvents =
    vacationsForCompany
      ?.filter((x) => x.status === vacationStatus.Accepted)
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

  const vacationsCountPerYear =
    vacationsForCompany?.reduce((prev, curr) => {
      let onlyCurrYear = curr.days.filter(
        (x) => new Date(x).getFullYear() === new Date().getFullYear()
      );
      if (curr.status === vacationStatus.Accepted) {
        if (prev[curr.vacationType.name]) {
          prev[curr.vacationType.name] =
            prev[curr.vacationType.name] + onlyCurrYear.length;
        } else {
          prev[curr.vacationType.name] = onlyCurrYear.length;
        }
      }
      return prev;
    }, {}) || {};

  function handleUpdateVacation(action, vacationId) {
    let requestData = {
      id: vacationId,
    };

    switch (action) {
      case "accept":
        requestData.status = vacationStatus.Accepted;
        break;
      case "reject":
        requestData.status = vacationStatus.Rejected;
        break;
      default:
        break;
    }

    updateVacationMutation.mutate(requestData);
  }

  function handleCreateUser(values, { setSubmitting }) {
    const user = {
      ...values,
      roleName: roles.User,
      companyName: store.user.company.name,
    };

    createUserMutation.mutate(user, { onSettled: () => setSubmitting(false) });
  }

  return (
    <div>
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
            <VacationTypesLegend vacationTypesCount={vacationsCountPerYear} />
          </div>

          <EventCalendar
            styles={{ height: "calc(100vh - 230px)" }}
            eventsList={vacationsCalendarEvents}
            eventStyling={(e) => ({
              style: {
                textShadow: "0 0 2px black",
                backgroundColor: vacationTypesColors[e.vacationType],
              },
            })}
            onEventClicked={(e, el) => {
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
            <div css={{ textAlign: "center", marginBottom: "5px" }}>
              {eventInfo.title}
            </div>
            <div css={{ marginBottom: "10px" }}>
              I need this vacation because:
            </div>
            <div css={{ fontWeight: "600" }}>{eventInfo.message}</div>
          </OverlayPanel>
        </TabPanel>
        <TabPanel header="Employees">
          <UsersTable
            users={activeCompanyUsers}
            addUser={() => setOpenAddUserDialog(true)}
            removeUser={deleteUserMutation.mutate}
          />
        </TabPanel>
      </TabView>

      {/* Dialogs */}

      <Dialog
        header="Add employee"
        visible={openAddUserDialog}
        css={{ width: "50%", ...isSmallDeviceMediaQuery({ width: "95%" }) }}
        contentStyle={{ padding: "10px 25px 40px 25px" }}
        onHide={() => setOpenAddUserDialog(false)}
      >
        <Formik
          initialValues={{ email: "", firstName: "", lastName: "" }}
          validate={(values) => {
            const errors = {};

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
              <div css={{ marginTop: "30px" }} className="p-inputgroup">
                <span className="p-float-label">
                  <InputText
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={(e) => {
                      if (addUserError) {
                        setAddUserError(null);
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
              <div css={{ marginTop: "30px" }} className="p-inputgroup">
                <span className="p-float-label">
                  <InputText
                    id="firstName"
                    type="text"
                    value={values.firstName}
                    onChange={(e) => {
                      if (addUserError) {
                        setAddUserError(null);
                      }
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="firstName">First Name</label>
                </span>
              </div>
              {touched.firstName && errors.firstName ? (
                <div css={inputErrorMsg}>{errors.firstName}</div>
              ) : null}
              <div css={{ marginTop: "30px" }} className="p-inputgroup">
                <span className="p-float-label">
                  <InputText
                    id="lastName"
                    type="text"
                    value={values.lastName}
                    onChange={(e) => {
                      if (addUserError) {
                        setAddUserError(null);
                      }
                      handleChange(e);
                    }}
                  />
                  <label htmlFor="lastName">Last Name</label>
                </span>
              </div>
              {touched.lastName && errors.lastName ? (
                <div css={inputErrorMsg}>{errors.lastName}</div>
              ) : null}
              {addUserError ? (
                <div
                  css={{
                    position: "relative",
                    top: "15px",
                    color: "red",
                    textAlign: "center",
                  }}
                >
                  {addUserError}
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
                  "Add"
                )}
              </Button>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}

export { Admin };
