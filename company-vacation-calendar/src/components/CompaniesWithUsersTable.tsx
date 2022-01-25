/** @jsxImportSource @emotion/react */
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { PrimeSmallButton } from "../styles/common";
import { isSmallDevice } from "../styles/common";
import { confirmDialog } from "primereact/confirmdialog";
import UserModel from "../dtos/user.dto";
import CompanyModel from "../dtos/company.dto";
import { CompaniesWithUsersTableDataModel } from "../modules/superadmin/types/superadmin.type";

type CompaniesWithUsersTableProps = {
  companies: Array<CompanyModel>;
  users: Array<UserModel>;
  addCompany: any;
  removeCompany: any;
};

const CompaniesWithUsersTable: React.FC<CompaniesWithUsersTableProps> = ({
  companies,
  users,
  addCompany,
  removeCompany,
}) => {
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [expandedRows, setExpandedRows] = React.useState<UserModel | null>(
    null
  );

  const tableData: Array<CompaniesWithUsersTableDataModel> = companies.map(
    (c: CompanyModel) =>
      ({
        id: c.id,
        name: c.name,
        bulstat: c.bulstat,
        users: users
          .filter((u) => u.company.id === c.id)
          .map((u) => ({
            id: u.id,
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            role: u.role.name,
            active: u.isEmailConfirmed ? "Yes" : "No",
          })),
      } as CompaniesWithUsersTableDataModel)
  );

  const tableHeader = (
    <div
      css={{ display: "flex", alignItems: "center" }}
      className="table-header"
    >
      <div>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            css={{ width: 240 }}
            type="search"
            onInput={(e: any) => setGlobalFilter(e.target.value)}
            placeholder="Global Search"
          />
        </span>
      </div>
      <div css={{ marginLeft: "auto" }}>
        <PrimeSmallButton
          label={isSmallDevice ? "" : "Add New"}
          icon="pi pi-user-plus"
          className="p-button-success"
          onClick={() => addCompany()}
        />
      </div>
    </div>
  );

  const tableMoreInfoTemplate = (data: CompaniesWithUsersTableDataModel) => (
    <DataTable autoLayout value={data.users}>
      <Column sortable field="firstName" header="First Name" />
      <Column sortable field="lastName" header="Last Name" />
      <Column sortable field="email" header="Email" />
      <Column sortable field="role" header="Role" />
      <Column sortable field="active" header="Active" />
    </DataTable>
  );

  const tableActionsColBodyTemplate = (data: CompanyModel) => (
    <div>
      <PrimeSmallButton
        label={isSmallDevice ? "" : "Remove"}
        icon="pi pi-user-minus"
        className="p-button-danger"
        onClick={() =>
          confirmDialog({
            message: `Do you want to remove ${data.name}?`,
            header: "Remove Company",
            icon: "pi pi-exclamation-triangle",
            acceptClassName: "p-button-success",
            rejectClassName: "p-button-danger",
            accept: () => removeCompany(data.id),
          })
        }
      />
    </div>
  );

  return (
    <div>
      <DataTable
        autoLayout
        paginator
        rows={10}
        expandedRows={[expandedRows]}
        onRowToggle={(e) => {
          const item = e.data.slice(-1).pop();
          setExpandedRows(item);
        }}
        rowExpansionTemplate={tableMoreInfoTemplate}
        value={tableData}
        globalFilter={globalFilter}
        header={tableHeader}
      >
        <Column expander />
        <Column sortable field="name" header="Company Name" />
        <Column sortable field="bulstat" header="Bulstat" />
        <Column
          field="actions"
          header="Actions"
          body={tableActionsColBodyTemplate}
        />
      </DataTable>
    </div>
  );
};

CompaniesWithUsersTable.displayName = "CompaniesWithUsersTable";
export default CompaniesWithUsersTable;
