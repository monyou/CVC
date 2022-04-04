/** @jsxImportSource @emotion/react */
import { useState, FC } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Chip } from "primereact/chip";
import {
  isSmallDeviceMediaQuery,
  PrimeSmallButton,
  smallIconButton,
} from "../styles/common";
import { isSmallDevice } from "../styles/common";
import { confirmDialog } from "primereact/confirmdialog";
import UserModel from "../dtos/user.dto";
import CompanyModel from "../dtos/company.dto";
import { CompaniesWithUsersTableDataModel } from "../modules/superadmin/types/superadmin.type";
import { primaryColor } from "../styles/colors";

type CompaniesWithUsersTableProps = {
  companies: Array<CompanyModel>;
  users: Array<UserModel>;
  addCompany: any;
  removeCompany: (companyId: string) => void;
};

const CompaniesWithUsersTable: FC<CompaniesWithUsersTableProps> = ({
  companies,
  users,
  addCompany,
  removeCompany,
}) => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [expandedRows, setExpandedRows] = useState<UserModel | null>(null);

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
          css={{ ...isSmallDeviceMediaQuery({ ...smallIconButton }) }}
          label={isSmallDevice ? "" : "Add New"}
          icon="pi pi-user-plus"
          className="p-button-success p-button-rounded"
          onClick={() => addCompany()}
        />
      </div>
    </div>
  );

  const tableMoreInfoTemplate = (data: CompaniesWithUsersTableDataModel) => (
    <DataTable autoLayout value={data.users} style={{ width: "100%" }}>
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
      <Column sortable field="email" header="Email" />
      <Column
        sortable
        field="role"
        header="Role"
        body={(data: { role: string }) => (
          <Chip
            label={data.role}
            css={{
              backgroundColor: data.role === "Admin" ? "#fd7e14" : primaryColor,
              color: "white",
            }}
          />
        )}
      />
      <Column sortable field="active" header="Active" />
    </DataTable>
  );

  const tableActionsColBodyTemplate = (data: CompanyModel) => (
    <div>
      <PrimeSmallButton
        css={{ ...isSmallDeviceMediaQuery({ ...smallIconButton }) }}
        label={isSmallDevice ? "" : "Remove"}
        icon="pi pi-user-minus"
        className="p-button-danger p-button-rounded p-button-outlined"
        onClick={() =>
          confirmDialog({
            message: `Do you want to remove ${data.name}?`,
            header: "Remove Company",
            icon: "pi pi-exclamation-triangle",
            acceptClassName:
              "p-button-success p-button-outlined p-button-rounded p-button-sm",
            rejectClassName: "p-button-danger p-button-rounded p-button-sm",
            accept: () => removeCompany(data.id),
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
        value={tableData}
        globalFilter={globalFilter}
        header={tableHeader}
      >
        <Column expander />
        <Column
          style={{ whiteSpace: "nowrap" }}
          sortable
          field="name"
          header="Company Name"
        />
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
