export interface AdminEventInfoProps {
  message: string;
  title: string;
}

export interface CreateUserProps {
  email: string;
  firstName: string;
  lastName: string;
  roleName: string;
  companyName: string;
}

export interface CreateUserFormikProps {
  email: string;
  firstName: string;
  lastName: string;
}

export interface CreateUserFormikErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface UpdateVacationProps {
  id?: string;
  status?: string;
}
