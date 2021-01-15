import * as backendAPI from "../utils/backend-api";

function getAllVacationsByCompany(companyId) {
  return backendAPI.GET(
    `vacation/getVacationsByCompanyId?companyId=${companyId}`
  );
}

export { getAllVacationsByCompany };
