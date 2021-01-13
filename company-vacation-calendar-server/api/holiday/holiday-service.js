const {
    firestore
} = require("../../helpers/firebase");

async function getAllHolidays() {
    try {
        const holidaysQuery = await firestore.collection("holidays").get();
        const holidays = holidaysQuery.docs.map(d => {
            let holiday = d.data();

            return holiday;
        })

        return {
            holidays,
        };
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllHolidays,
};