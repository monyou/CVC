import { VacationTypeModel } from "./vacationType.dto";
import VacationStatusModel from "./vacationStatus.dto";

export interface VacationModel {
  id: string;
  userId: string;
  username: string;
  days: Array<number>;
  description: string;
  status: VacationStatusModel;
  vacationType: VacationTypeModel;
}

export default VacationModel;
