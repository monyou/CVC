const { firestore } = require("../../helpers/firebase");
const { v4: uuidv4 } = require("uuid");

async function getAllCompanies() {
  try {
    const companiesQuery = await firestore.collection("companies").get();
    const companies = companiesQuery.docs
      .map((d) => {
        let company = d.data();

        return company;
      })
      .filter((company) => company.name !== "SD Internal");

    return {
      companies,
    };
  } catch (error) {
    console.log(error);
  }
}

async function createCompany({ bulstat, name, yearVacationLimit }) {
  try {
    const id = uuidv4();

    const companyExistsQuery = await firestore
      .collection("companies")
      .where("bulstat", "==", bulstat)
      .get();

    if (!companyExistsQuery.empty) {
      return null;
    }

    await firestore.collection("companies").doc(id).set({
      id,
      bulstat,
      name,
      yearVacationLimit,
    });

    return {
      id,
    };
  } catch (error) {
    console.log(error);
  }
}

async function deleteCompany({ companyId }) {
  try {
    const usersInCompanyQuery = await firestore
      .collection("users")
      .where("company.id", "==", companyId)
      .get();
    const usersToDeleteForCompany = usersInCompanyQuery.docs
      .map((d) => d.data())
      .filter((u) => u.company.id === companyId)
      .map((u) => firestore.collection("users").doc(u.id));

    await firestore.runTransaction(async (t) => {
      t.delete(firestore.collection("companies").doc(companyId));

      usersToDeleteForCompany.forEach((userId) => {
        t.delete(userId);
      });
    });

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
