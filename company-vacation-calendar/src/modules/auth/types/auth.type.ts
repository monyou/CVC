import { CompanyModel } from "./../../../dtos/company.dto";
import { RoleModel } from "./../../../dtos/role.dto";
export interface ActivateUserParamsProps {
  id: string;
  email: string;
  securityKey: string;
}

export interface ActivateUserProps {
  id: string;
  password: string;
  securityKey: string;
}

export interface ActivateUserFormikProps {
  password: string;
}

export interface ActivateUserFormikErrors {
  password?: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface LoginFormikProps {
  email: string;
  password: string;
}

export interface LoginFormikErrors {
  email?: string;
  password?: string;
}

export interface SubscribeProps {
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  bulstat: number;
  yearVacationLimit: number;
}

export interface SubscribeFormikProps {
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  bulstat: string;
  yearVacationLimit: string;
}

export interface SubscribeFormikErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  bulstat?: string;
  yearVacationLimit?: string;
}

export interface UserFromTokenModel {
  iat: number;
  email: string;
  firstName: string;
  lastName: string;
  role: RoleModel;
  company: CompanyModel;
  vacationLimit: number;
}
