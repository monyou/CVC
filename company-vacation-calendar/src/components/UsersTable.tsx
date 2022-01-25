/** @jsxImportSource @emotion/react */
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { PrimeSmallButton } from "../styles/common";
import { isSmallDevice } from "../styles/common";
import { confirmDialog } from "primereact/confirmdialog";
import { Divider } from "primereact/divider";
import UserModel from "../dtos/user.dto";

type UsersTableProps = {
  users: Array<UserModel>;
  addUser: any;
  removeUser: any;
};

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  addUser,
  removeUser,
}) => {
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [expandedRows, setExpandedRows] = React.useState<UserModel | null>(
    null
  );

  const tableUsers = users.map((u) => ({
    id: u.id,
    email: u.email,
    firstName: u.firstName,
    lastName: u.lastName,
    vacationsLimit: u.vacationLimit,
    isEmailConfirmed: u.isEmailConfirmed ? "Yes" : "No",
  }));

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
          onClick={() => addUser()}
        />
      </div>
    </div>
  );

  const tableMoreInfoTemplate = (data: UserModel) => (
    <div>
      <Divider align="left">Email</Divider>
      <div css={{ paddingLeft: "40px" }}>{data.email}</div>
      <Divider align="left">Profile Activated</Divider>
      <div css={{ paddingLeft: "40px" }}> {data.isEmailConfirmed}</div>
    </div>
  );

  const tableActionsColBodyTemplate = (data: UserModel) => (
    <div>
      <PrimeSmallButton
        label={isSmallDevice ? "" : "Remove"}
        icon="pi pi-user-minus"
        className="p-button-danger"
        onClick={() =>
          confirmDialog({
            message: `Do you want to remove ${data.firstName} ${data.lastName}?`,
            header: "Remove Employee",
            icon: "pi pi-exclamation-triangle",
            acceptClassName: "p-button-success",
            rejectClassName: "p-button-danger",
            accept: () => removeUser(data.id),
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
        value={tableUsers}
        globalFilter={globalFilter}
        header={tableHeader}
      >
        <Column expander />
        <Column sortable field="firstName" header="First Name" />
        <Column sortable field="lastName" header="Last Name" />
        <Column sortable field="vacationsLimit" header="Unused Vacation Days" />
        <Column
          field="actions"
          header="Actions"
          body={tableActionsColBodyTemplate}
        />
      </DataTable>
    </div>
  );
};

UsersTable.displayName = "UsersTable";
export default UsersTable;
