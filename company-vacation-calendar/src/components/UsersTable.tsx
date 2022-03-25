/** @jsxImportSource @emotion/react */
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import {
  isSmallDeviceMediaQuery,
  PrimeSmallButton,
  smallIconButton,
} from "../styles/common";
import { isSmallDevice } from "../styles/common";
import { confirmDialog } from "primereact/confirmdialog";
import { Divider } from "primereact/divider";
import UserModel from "../dtos/user.dto";
import { primaryColor } from "../styles/colors";
import { Button } from "primereact/button";

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
          css={{ ...isSmallDeviceMediaQuery({ ...smallIconButton }) }}
          label={isSmallDevice ? "" : "Add New"}
          icon="pi pi-user-plus"
          className="p-button-success p-button-rounded"
          onClick={() => addUser()}
        />
      </div>
    </div>
  );

  const tableMoreInfoTemplate = (data: UserModel) => (
    <div style={{ width: "100%" }}>
      <Divider align="left">Role</Divider>
      <div css={{ paddingLeft: "40px" }}>
        <Button
          label={data.role.name}
          tooltip="Click to change role"
          className="p-button-rounded p-button-sm"
          css={{
            backgroundColor:
              data.role.name === "Admin" ? "#fd7e14" : primaryColor,
            color: "white",
            cursor: "pointer",
          }}
          onClick={() =>
            confirmDialog({
              message: `Do you want to change ${data.firstName} ${
                data.lastName
              }'s role to ${data.role.name === "Admin" ? "User" : "Admin"}?`,
              header: "Change Employee Role",
              icon: "pi pi-exclamation-triangle",
              acceptClassName:
                "p-button-success p-button-rounded p-button-outlined p-button-sm",
              rejectClassName: "p-button-danger p-button-rounded p-button-sm",
              accept: () => {},
              draggable: false,
            })
          }
        />
      </div>
      <Divider align="left">Email</Divider>
      <div css={{ paddingLeft: "40px" }}>{data.email}</div>
      <Divider align="left">Profile Activated</Divider>
      <div css={{ paddingLeft: "40px" }}>
        {data.isEmailConfirmed ? "Yes" : "No"}
      </div>
    </div>
  );

  const tableActionsColBodyTemplate = (data: UserModel) => (
    <div>
      <PrimeSmallButton
        css={{ ...isSmallDeviceMediaQuery({ ...smallIconButton }) }}
        label={isSmallDevice ? "" : "Remove"}
        icon="pi pi-user-minus"
        className="p-button-danger p-button-rounded p-button-outlined"
        onClick={() =>
          confirmDialog({
            message: `Do you want to remove ${data.firstName} ${data.lastName}?`,
            header: "Remove Employee",
            icon: "pi pi-exclamation-triangle",
            acceptClassName:
              "p-button-success p-button-rounded p-button-outlined",
            rejectClassName: "p-button-danger p-button-rounded",
            accept: () => removeUser(data.id),
            draggable: false,
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
        value={users}
        globalFilter={globalFilter}
        header={tableHeader}
      >
        <Column expander />
        <Column
          style={{ whiteSpace: "nowrap" }}
          sortable
          field="firstName"
          header="First Name"
        />
        <Column
          style={{ whiteSpace: "nowrap" }}
          sortable
          field="lastName"
          header="Last Name"
        />
        <Column
          style={{ whiteSpace: "nowrap" }}
          sortable
          field="vacationLimit"
          header="Unused Vacation Days"
        />
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
