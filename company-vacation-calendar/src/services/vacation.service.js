import * as backendAPI from "../utils/backend-api";

function getAllVacationsByCompany(id) {
  return backendAPI.GET(`/vacation/getVacationsByCompanyId?companyId=${id}`);
}

function getAllVacationTypes() {
  return backendAPI.GET("/vacation-type/getAll");
}

function createVacation(data) {
  return backendAPI.POST("/vacation/create", data);
}

function updateVacation(data) {
  return backendAPI.PUT("/vacation/update", data);
}

export {
  getAllVacationsByCompany,
  getAllVacationTypes,
  createVacation,
  updateVacation,
};
