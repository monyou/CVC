const knex = require("../../helpers/knex-config");
const statuses = require("../../helpers/vacation-status");

async function getAllVacations() {
  try {
    const vacations = await knex
      .db("Vacations")
      .join(
        "VacationStatuses",
        "Vacations.VacationStatusId",
        "VacationStatuses.Id"
      )
      .join("VacationTypes", "Vacations.VacationTypeId", "VacationTypes.Id")
      .select(
        "Vacations.Id",
        "Vacations.UserId",
        "Vacations.Username",
        "Vacations.Description",
        "Vacations.Days",
        "VacationStatuses.Id as VacationStatus_Id",
        "VacationStatuses.Name as VacationStatus_Name",
        "VacationTypes.Id as VacationType_Id",
        "VacationTypes.Id as VacationType_Name"
      );

    return vacations.map((v) => ({
      id: v.Id,
      userId: v.UserId,
      username: v.Username,
      days: v.Days.split(",").map((d) => +d),
      description: v.Description,
      status: {
        id: v.VacationStatus_Id,
        name: v.VacationStatus_Name,
      },
      vacationType: {
        id: v.VacationType_Id,
        name: v.VacationType_Name,
      },
    }));
  } catch (error) {
    console.log(error);
  }

  return null;
}

async function getVacationById({ id }) {
  try {
    const [vacation] = await knex
      .db("Vacations")
      .join(
        "VacationStatuses",
        "Vacations.VacationStatusId",
        "VacationStatuses.Id"
      )
      .join("VacationTypes", "Vacations.VacationTypeId", "VacationTypes.Id")
      .where({ "Vacations.Id": id })
      .select(
        "Vacations.Id",
        "Vacations.UserId",
        "Vacations.Username",
        "Vacations.Description",
        "Vacations.Days",
        "VacationStatuses.Id as VacationStatus_Id",
        "VacationStatuses.Name as VacationStatus_Name",
        "VacationTypes.Id as VacationType_Id",
        "VacationTypes.Id as VacationType_Name"
      );

    if (vacation) {
      return {
        id: vacation.Id,
        userId: vacation.UserId,
        username: vacation.Username,
        days: vacation.Days.split(",").map((d) => +d),
        description: vacation.Description,
        status: {
          id: vacation.VacationStatus_Id,
          name: vacation.VacationStatus_Name,
        },
        vacationType: {
          id: vacation.VacationType_Id,
          name: vacation.VacationType_Name,
        },
      };
    }
  } catch (error) {
    console.log(error);
  }

  return null;
}

async function getVacationsByUserId({ userId }) {
  try {
    const vacations = await knex
      .db("Vacations")
      .join(
        "VacationStatuses",
        "Vacations.VacationStatusId",
        "VacationStatuses.Id"
      )
      .join("VacationTypes", "Vacations.VacationTypeId", "VacationTypes.Id")
      .where({ "Vacations.UserId": userId })
      .select(
        "Vacations.Id",
        "Vacations.UserId",
        "Vacations.Username",
        "Vacations.Description",
        "Vacations.Days",
        "VacationStatuses.Id as VacationStatus_Id",
        "VacationStatuses.Name as VacationStatus_Name",
        "VacationTypes.Id as VacationType_Id",
        "VacationTypes.Id as VacationType_Name"
      );

    return vacations.map((v) => ({
      id: v.Id,
      userId: v.UserId,
      username: v.Username,
      days: v.Days.split(",").map((d) => +d),
      description: v.Description,
      status: {
        id: v.VacationStatus_Id,
        name: v.VacationStatus_Name,
      },
      vacationType: {
        id: v.VacationType_Id,
        name: v.VacationType_Name,
      },
    }));
  } catch (error) {
    console.log(error);
  }

  return null;
}

async function getVacationsByCompanyId({ companyId }) {
  try {
    const vacations = await knex
      .db("Vacations")
      .join(
        "VacationStatuses",
        "Vacations.VacationStatusId",
        "VacationStatuses.Id"
      )
      .join("VacationTypes", "Vacations.VacationTypeId", "VacationTypes.Id")
      .join("Users", "Vacations.UserId", "Users.Id")
      .join("Companies", "Users.CompanyId", "Companies.Id")
      .where({ "Companies.Id": companyId })
      .select(
        "Vacations.Id",
        "Vacations.UserId",
        "Vacations.Username",
        "Vacations.Description",
        "Vacations.Days",
        "VacationStatuses.Id as VacationStatus_Id",
        "VacationStatuses.Name as VacationStatus_Name",
        "VacationTypes.Id as VacationType_Id",
        "VacationTypes.Id as VacationType_Name"
      );

    return vacations.map((v) => ({
      id: v.Id,
      userId: v.UserId,
      username: v.Username,
      days: v.Days.split(",").map((d) => +d),
      description: v.Description,
      status: {
        id: v.VacationStatus_Id,
        name: v.VacationStatus_Name,
      },
      vacationType: {
        id: v.VacationType_Id,
        name: v.VacationType_Name,
      },
    }));
  } catch (error) {
    console.log(error);
  }

  return null;
}

async function createVacation({
  userId,
  username,
  description,
  vacationType,
  days,
}) {
  try {
    const [user] = await knex
      .db("Users")
      .where({ Id: userId })
      .select("VacationLimit");

    const [vacationStatus] = await knex
      .db("VacationStatuses")
      .where({ Name: statuses.Pending });

    if (user && vacationStatus && user.VacationLimit >= days.length) {
      await knex.db("Vacations").insert({
        Username: username,
        Description: description,
        Days: days.join(","),
        VacationStatusId: vacationStatus.id,
        VacationTypeId: vacationType.id,
        UserId: userId,
      });

      return true;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
}

async function updateVacation({ id, status }) {
  try {
    const [vacationStatus] = await knex
      .db("VacationStatuses")
      .where({ Name: status });

    const [vacation] = await knex
      .db("Vacations")
      .join("VacationTypes", "Vacations.VacationTypeId", "VacationTypes.Id")
      .join("Users", "Vacations.UserId", "User.Id")
      .where({ "Vacations.Id": id })
      .select(
        "Vacation.*",
        "VacationTypes.Name as VacationType_Name",
        "Users.VacationLimit as User_VacationLimit"
      );

    if (vacation && vacationStatus) {
      await knex.db("Vacations").where({ Id: id }).update({
        VacationStatusId: vacationStatus.Id,
      });

      if (
        status === statuses.Accepted &&
        vacation.VacationType_Name === "Paid"
      ) {
        await knex
          .db("Users")
          .where({ Id: vacation.UserId })
          .update({
            VacationLimit:
              vacation.User_VacationLimit - vacation.Days.split(",").length,
          });
      }

      return true;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
}

module.exports = {
  getAllVacations,
  getVacationById,
  getVacationsByUserId,
  getVacationsByCompanyId,
  createVacation,
  updateVacation,
};
