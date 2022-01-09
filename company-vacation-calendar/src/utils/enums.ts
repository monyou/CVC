export enum Roles {
  SuperAdmin = "Superadmin",
  Admin = "Admin",
  User = "User",
}

export enum VacationStatus {
  Accepted = "Accepted",
  Rejected = "Rejected",
  Pending = "Pending",
}

export enum VacationTypes {
  Paid = "Paid",
  Unpaid = "Unpaid",
  Sick = "Sick",
  BizTrip = "Business Trip",
  Maternity = "Maternity",
  Paternity = "Paternity",
}

const enums = {
  Roles,
  VacationStatus,
  VacationTypes,
};

export default enums;
