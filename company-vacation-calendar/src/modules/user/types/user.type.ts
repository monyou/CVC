export interface UserEventInfoProps {
  message: string;
  title: string;
}

export interface UserSubmitVacationProps {
  userId: string;
  username: string;
  description: string;
  vacationType: string;
  days: Array<number>;
}

export interface UserSubmitVacationFormikProps {
  description: string;
  vacationType: string;
  dates: Array<Date>;
}

export interface UserSubmitVacationFormikErrors {
  description?: string;
  vacationType?: string;
  dates?: string;
}
