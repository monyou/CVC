import { CreateUserProps } from "../../admin/types/admin.type";

export interface CompaniesWithUsersTableDataModel {
  id: string;
  name: string;
  bulstat: number;
  users: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }>;
}

export interface CreateCompanyProps {
  name: string;
  bulstat: number;
  yearVacationLimit: number;
}

export interface CreateCompanyWithAdminProps {
  company: CreateCompanyProps;
  user: CreateUserProps;
}

export interface CreateCompanyWithAdminFormikProps {
  companyName: string;
  companyBulstat: string;
  companyYearVacationLimit: string;
  managerFirstName: string;
  managerLastName: string;
  managerEmail: string;
}

export interface CreateCompanyWithAdminFormikErrors {
  companyName?: string;
  companyBulstat?: string;
  companyYearVacationLimit?: string;
  managerFirstName?: string;
  managerLastName?: string;
  managerEmail?: string;
}
