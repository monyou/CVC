const knex = require("../../helpers/knex-config");

async function getAllVacationTypes() {
  try {
    const vacationTypes = await knex.db("VacationTypes");

    return {
      vacationTypes: vacationTypes.map((v) => ({ id: v.Id, name: v.Name })),
    };
  } catch (error) {
    console.log(error);
  }

  return null;
}

module.exports = {
  getAllVacationTypes,
};
