const jwt = require("jsonwebtoken");
const config = require("../../config.json");
const {
    firestore
} = require("../../helpers/firebase");

async function authenticate({
    email,
    password
}) {
    try {
        const userQuery = await firestore.collection("users").where('email', '==', email).get();
        const user = userQuery.docs[0].data();

        if (user !== null) {

            // TODO: Add password hash decoder

            if (user.password == password) {
                const token = jwt.sign({
                        sub: user.id,
                        role: user.role,
                        email: user.email,
                        name: `${user.firstName} ${user.lastName}`
                    },
                    config.secret
                );
                return {
                    token,
                };
            }
        }
    } catch (error) {
        console.log(error)
    }

    return null;
}

module.exports = {
    authenticate,
};