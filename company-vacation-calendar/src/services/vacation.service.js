import * as backendAPI from "../utils/backend-api";

function getAllVacationsByCompany(id) {
  return backendAPI.GET(`/vacation/getVacationsByCompanyId?companyId=${id}`);
}

function getAllVacationTypes() {
  return backendAPI.GET("/vacation-type/getAll");
}

function createVacation({ userId, username, description, vacationType, days }) {
  const createBody = JSON.stringify({
    userId,
    username,
    description,
    vacationType,
    days,
  });
  return backendAPI.POST("/vacation/create", createBody);
}

function updateVacation({ id, status }) {
  const updateBody = JSON.stringify({
    id,
    status,
  });
  return backendAPI.PUT("/vacation/update", updateBody);
}

export {
  getAllVacationsByCompany,
  getAllVacationTypes,
  createVacation,
  updateVacation,
};
