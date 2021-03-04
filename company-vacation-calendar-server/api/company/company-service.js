const { firestore } = require("../../helpers/firebase");

async function getAllCompanies() {
  try {
    const companiesQuery = await firestore.collection("companies").get();
    const companies = companiesQuery.docs.map((d) => {
      let company = d.data();

      return company;
    });

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

module.exports = {
  getAllCompanies,
  createCompany
};
