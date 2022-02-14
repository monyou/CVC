const knex = require("../../helpers/knex-config");

async function getAllRoles() {
  try {
    const roles = await knex.db("Roles");

    return {
      roles: roles.map((v) => ({ id: v.Id, name: v.Name })),
    };
  } catch (error) {
    console.log(error);
  }

  return null;
}

module.exports = {
  getAllRoles,
};
