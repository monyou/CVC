import { UpdateVacationProps } from "./../modules/admin/types/admin.type";
import * as backendAPI from "../utils/api";
import { UserSubmitVacationProps } from "../modules/user/types/user.type";

export function getAllVacationsByCompany(id: string): Promise<any> {
  return backendAPI.GET(`/vacation/getVacationsByCompanyId?companyId=${id}`);
}

export function getAllVacationTypes(): Promise<any> {
  return backendAPI.GET("/vacation-type/getAll");
}

export function createVacation({
  userId,
  username,
  description,
  vacationType,
  days,
}: UserSubmitVacationProps): Promise<any> {
  const createBody = JSON.stringify({
    userId,
    username,
    description,
    vacationType,
    days,
  });
  return backendAPI.POST("/vacation/create", createBody);
}

export function updateVacation({
  id,
  status,
}: UpdateVacationProps): Promise<any> {
  const updateBody = JSON.stringify({
    id,
    status,
  });
  return backendAPI.PUT("/vacation/update", updateBody);
}

const vacationService = {
  getAllVacationsByCompany,
  getAllVacationTypes,
  createVacation,
  updateVacation,
};

export default vacationService;
