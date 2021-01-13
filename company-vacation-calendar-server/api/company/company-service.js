const {
    firestore
} = require("../../helpers/firebase");

async function getAllCompanies() {
    try {
        const companiesQuery = await firestore.collection("companies").get();
        const companies = companiesQuery.docs.map(d => {
            let company = d.data();

            return company;
        })

        return {
            companies,
        };
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllCompanies,
};