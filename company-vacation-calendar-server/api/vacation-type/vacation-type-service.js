const {
    firestore
} = require("../../helpers/firebase");

async function getAllVacationTypes() {
    try {
        const vacationTypesQuery = await firestore.collection("vacation-types").get();
        const vacationTypes = vacationTypesQuery.docs.map(d => {
            let vacationType = d.data();

            return vacationType;
        })

        return {
            vacationTypes,
        };
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllVacationTypes,
};