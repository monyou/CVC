import { VacationModel } from "./vacation.dto";
import { RoleModel } from "./role.dto";
import { CompanyModel } from "./company.dto";

export interface UserModel {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  isEmailConfirmed: boolean;
  vacationLimit: number;
  company: CompanyModel;
  role: RoleModel;
  vacations: Array<VacationModel>;
  password: string;
  securityKey: string;
}

export default UserModel;
