import * as backendAPI from "../utils/backend-api";

function getAllHolidays() {
  return backendAPI.GET("/holiday/getAll");
}

export { getAllHolidays };
