import { CreateCompanyProps } from "../modules/superadmin/types/superadmin.type";
import * as backendAPI from "../utils/api";

export function getAllCompanies(): Promise<any> {
  return backendAPI.GET(`/company/getAll`);
}

export function createCompany({
  bulstat,
  name,
  yearVacationLimit,
}: CreateCompanyProps): Promise<any> {
  const createBody = JSON.stringify({
    bulstat,
    name,
    yearVacationLimit,
  });
  return backendAPI.POST("/company/create", createBody);
}

export function deleteCompany(id: string): Promise<any> {
  const deleteBody = JSON.stringify({
    companyId: id,
  });
  return backendAPI.POST("/company/delete", deleteBody);
}

const companyService = {
  getAllCompanies,
  createCompany,
  deleteCompany,
};

export default companyService;
