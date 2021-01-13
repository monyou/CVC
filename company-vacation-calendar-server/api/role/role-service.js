const {
    firestore
} = require("../../helpers/firebase");

async function getAllRoles() {
    try {
        const rolesQuery = await firestore.collection("roles").get();
        const roles = rolesQuery.docs.map(d => {
            let role = d.data();

            return role;
        })

        return {
            roles,
        };
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllRoles,
};