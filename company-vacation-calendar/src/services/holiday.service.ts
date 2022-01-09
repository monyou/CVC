import * as backendAPI from "../utils/api";

export function getAllHolidays(): Promise<any> {
  return backendAPI.GET("/holiday/getAll");
}

const holidayService = {
  getAllHolidays,
};

export default holidayService;
