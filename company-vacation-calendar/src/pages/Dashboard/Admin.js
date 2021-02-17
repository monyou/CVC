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
import { inputErrorMsg } from "../../styles/common";
import { roles } from "../../utils/enums";

function Admin() {
  const store = useSelector((state) => ({ user: state.user }));
  const queryClient = useQueryClient();
  const [openAddUserDialog, setOpenAddUserDialog] = React.useState(false);
  const [addUserError, setAddUserError] = React.useState(null);

  const { data: allVacations } = useQuery(
    "all-vacations",
    () => getAllVacationsByCompany(store.user.company.id),
    { enabled: !!store.user?.company?.id }
  );
  const updateVacationMutation = useMutation(
    (requestData) => updateVacation(requestData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-vacations");
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
    allVacations?.filter((v) => v.status === vacationStatus.Pending) ?? [];

  const activeCompanyUsers =
    allCompanyUsers?.filter((u) => u.isActive && u.id !== store.user.sub) ?? [];

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
        <TabPanel header="Calendar">Calendar</TabPanel>
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
        css={{ width: "70vw" }}
        contentStyle={{ maxHeight: "90vh", padding: "10px 25px 40px 25px" }}
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
