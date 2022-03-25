/** @jsxImportSource @emotion/react */
import { Formik } from "formik";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CompaniesWithUsersTable from "../../../../components/CompaniesWithUsersTable";
import CompanyModel from "../../../../dtos/company.dto";
import UserModel from "../../../../dtos/user.dto";
import {
  createCompany,
  deleteCompany,
  getAllCompanies,
} from "../../../../services/company.service";
import { createUser, getAllUsers } from "../../../../services/user.service";
import { PrimeButton } from "../../../../styles/common";
import { Roles } from "../../../../utils/enums";
import {
  CreateCompanyWithAdminFormikErrors,
  CreateCompanyWithAdminFormikProps,
  CreateCompanyWithAdminProps,
} from "../../types/superadmin.type";
import { toast } from "react-toastify";

function SuperAdminDashboard() {
  const queryClient = useQueryClient();
  const [openAddCompanyDialog, setOpenAddCompanyDialog] =
    React.useState<boolean>(false);

  const { data: allUsers } = useQuery<Array<UserModel>>(
    "all-users",
    () => getAllUsers().then((response) => response.users),
    {
      initialData: [],
    }
  );
  const { data: allCompanies } = useQuery<Array<CompanyModel>>(
    "all-companies",
    () => getAllCompanies().then((response) => response.companies),
    {
      initialData: [],
    }
  );

  const deleteCompanyMutation = useMutation(
    (companyId: string) => deleteCompany(companyId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-users");
        queryClient.invalidateQueries("all-companies");
        toast("Successfully removed the company", {
          type: toast.TYPE.SUCCESS,
        });
      },
      onError: (error: any) => {
        toast(error.message, {
          type: toast.TYPE.ERROR,
        });
      },
    }
  );
  const createCompanyWithAdminMutation = useMutation(
    ({ company, user }: CreateCompanyWithAdminProps) =>
      Promise.all([createCompany(company), createUser(user)]),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-users");
        queryClient.invalidateQueries("all-companies");
        setOpenAddCompanyDialog(false);
        toast("Successfully created the company", {
          type: toast.TYPE.SUCCESS,
        });
      },
      onError: (error: any) => {
        toast(error.message, {
          type: toast.TYPE.ERROR,
        });
      },
    }
  );

  function handleCreateCompany(
    values: CreateCompanyWithAdminFormikProps,
    { setSubmitting }: any
  ): void {
    const body: CreateCompanyWithAdminProps = {
      company: {
        name: values.companyName,
        bulstat: +values.companyBulstat,
        yearVacationLimit: +values.companyYearVacationLimit,
      },
      user: {
        firstName: values.managerFirstName,
        lastName: values.managerLastName,
        email: values.managerEmail,
        companyName: values.companyName,
        roleName: Roles.Admin,
      },
    };

    createCompanyWithAdminMutation.mutate(body, {
      onSettled: () => setSubmitting(false),
    });
  }

  return (
    <div>
      <CompaniesWithUsersTable
        companies={allCompanies || []}
        users={allUsers || []}
        addCompany={() => setOpenAddCompanyDialog(true)}
        removeCompany={deleteCompanyMutation.mutate}
      />

      {/* Dialogs */}

      <Dialog
        header="Add company"
        visible={openAddCompanyDialog}
        css={{ width: "clamp(300px, 95%, 500px)" }}
        contentStyle={{ padding: "0px 25px 30px 25px" }}
        onHide={() => setOpenAddCompanyDialog(false)}
        draggable={false}
      >
        <Formik
          initialValues={{
            companyName: "",
            companyBulstat: "",
            companyYearVacationLimit: "",
            managerFirstName: "",
            managerLastName: "",
            managerEmail: "",
          }}
          validate={(values) => {
            const errors: CreateCompanyWithAdminFormikErrors = {};

            if (!values.managerEmail) {
              errors.managerEmail = "Manager email is required";
            } else if (
              !/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g.test(
                values.managerEmail
              )
            ) {
              errors.managerEmail = "Email is invalid";
            }

            if (!values.managerFirstName) {
              errors.managerFirstName = "Manager first name is required";
            }

            if (!values.managerLastName) {
              errors.managerLastName = "Manager last name is required";
            }

            if (!values.companyName) {
              errors.companyName = "Company name is required";
            }

            if (!values.companyBulstat) {
              errors.companyBulstat = "Bulstat is required";
            } else if (
              values.companyBulstat.length !== 9 ||
              !/^[0-9]*$/g.test(values.companyBulstat)
            ) {
              errors.companyBulstat = "Bulstat must be 9 digits number";
            }

            if (!values.companyYearVacationLimit) {
              errors.companyYearVacationLimit = "Vacations limit is required";
            } else if (!/^[0-9]*$/g.test(values.companyYearVacationLimit)) {
              errors.companyYearVacationLimit =
                "Vacations limit must be positive number";
            }

            return errors;
          }}
          onSubmit={handleCreateCompany}
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
                    id="companyName"
                    type="text"
                    value={values.companyName}
                    className={
                      touched.companyName && errors.companyName
                        ? "p-invalid"
                        : ""
                    }
                    aria-describedby="companyName-help"
                    onChange={handleChange}
                  />
                  <label htmlFor="companyName">Company Name</label>
                </span>
              </div>
              {touched.companyName && errors.companyName ? (
                <small id="companyName-help" className="p-error">
                  {errors.companyName}
                </small>
              ) : null}
              <div css={{ marginTop: "30px" }} className="p-inputgroup">
                <span className="p-float-label">
                  <InputText
                    id="companyBulstat"
                    type="text"
                    value={values.companyBulstat}
                    className={
                      touched.companyBulstat && errors.companyBulstat
                        ? "p-invalid"
                        : ""
                    }
                    aria-describedby="companyBulstat-help"
                    onChange={handleChange}
                  />
                  <label htmlFor="companyBulstat">Company Bulstat</label>
                </span>
              </div>
              {touched.companyBulstat && errors.companyBulstat ? (
                <small id="companyBulstat-help" className="p-error">
                  {errors.companyBulstat}
                </small>
              ) : null}
              <div css={{ marginTop: "30px" }} className="p-inputgroup">
                <span className="p-float-label">
                  <InputText
                    id="companyYearVacationLimit"
                    type="text"
                    value={values.companyYearVacationLimit}
                    className={
                      touched.companyYearVacationLimit &&
                      errors.companyYearVacationLimit
                        ? "p-invalid"
                        : ""
                    }
                    aria-describedby="companyYearVacationLimit-help"
                    onChange={handleChange}
                  />
                  <label htmlFor="companyYearVacationLimit">
                    Company Year Vacation Limit
                  </label>
                </span>
              </div>
              {touched.companyYearVacationLimit &&
              errors.companyYearVacationLimit ? (
                <small id="companyYearVacationLimit-help" className="p-error">
                  {errors.companyYearVacationLimit}
                </small>
              ) : null}
              <div css={{ marginTop: "30px" }} className="p-inputgroup">
                <span className="p-float-label">
                  <InputText
                    id="managerFirstName"
                    type="text"
                    value={values.managerFirstName}
                    className={
                      touched.managerFirstName && errors.managerFirstName
                        ? "p-invalid"
                        : ""
                    }
                    aria-describedby="managerFirstName-help"
                    onChange={handleChange}
                  />
                  <label htmlFor="managerFirstName">Manager First Name</label>
                </span>
              </div>
              {touched.managerFirstName && errors.managerFirstName ? (
                <small id="managerFirstName-help" className="p-error">
                  {errors.managerFirstName}
                </small>
              ) : null}
              <div css={{ marginTop: "30px" }} className="p-inputgroup">
                <span className="p-float-label">
                  <InputText
                    id="managerLastName"
                    type="text"
                    value={values.managerLastName}
                    className={
                      touched.managerLastName && errors.managerLastName
                        ? "p-invalid"
                        : ""
                    }
                    aria-describedby="managerLastName-help"
                    onChange={handleChange}
                  />
                  <label htmlFor="managerLastName">Manager Last Name</label>
                </span>
              </div>
              {touched.managerLastName && errors.managerLastName ? (
                <small id="managerLastName-help" className="p-error">
                  {errors.managerLastName}
                </small>
              ) : null}
              <div css={{ marginTop: "30px" }} className="p-inputgroup">
                <span className="p-float-label">
                  <InputText
                    id="managerEmail"
                    type="email"
                    value={values.managerEmail}
                    className={
                      touched.managerEmail && errors.managerEmail
                        ? "p-invalid"
                        : ""
                    }
                    aria-describedby="managerEmail-help"
                    onChange={handleChange}
                  />
                  <label htmlFor="managerEmail">Manager Email</label>
                </span>
              </div>
              {touched.managerEmail && errors.managerEmail ? (
                <small id="managerEmail-help" className="p-error">
                  {errors.managerEmail}
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

export default SuperAdminDashboard;
