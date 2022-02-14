const knex = require("../../helpers/knex-config");

async function getAllCompanies() {
  try {
    const companies = await knex
      .db("Companies")
      .where("Name", "<>", "CVC Internal");

    return {
      companies: companies.map((c) => ({
        id: c.Id,
        name: c.Name,
        bulstat: c.Bulstat,
        yearVacationLimit: c.YearVacationLimit,
      })),
    };
  } catch (error) {
    console.log(error);
  }

  return null;
}

async function createCompany({ bulstat, name, yearVacationLimit }) {
  try {
    const [{ Id: companyId }] = await knex.db("Companies").insert(
      {
        Bulstat: bulstat,
        Name: name,
        YearVacationLimit: yearVacationLimit,
      },
      ["Id"]
    );

    return {
      id: companyId,
    };
  } catch (error) {
    console.log(error);
  }

  return null;
}

async function deleteCompany({ companyId }) {
  try {
    await knex.db("Companies").where({ Id: companyId }).del();

    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
}

module.exports = {
  getAllCompanies,
  createCompany,
  deleteCompany,
};
