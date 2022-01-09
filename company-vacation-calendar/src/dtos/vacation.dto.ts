import { VacationTypeModel } from "./vacationType.dto";
import { VacationStatus } from "../utils/enums";

export interface VacationModel {
  id: string;
  userId: string;
  username: string;
  days: Array<number>;
  description: string;
  status: VacationStatus;
  vacationType: VacationTypeModel;
}

export default VacationModel;
