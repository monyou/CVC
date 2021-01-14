const {
    firestore
} = require("../../helpers/firebase");
const userService = require('../user/user-service');
const {
    v4: uuidv4
} = require("uuid");

const statuses = require('../enums/vacation-status');

async function getAllVacations() {
    let vacations = [];
    try {
        const response = await userService.getAllUsers();

        vacations = response.users.filter(user => user.vacations.length !== 0).map(user => user.vacations).flat();
    } catch (error) {
        console.log(error);
    }

    return vacations;
}

async function getVacationById({
    id
}) {
    try {
        const response = await userService.getAllUsers();

        vacations = response.users.filter(user => user.vacations.length !== 0).map(user => user.vacations).flat();
        vacation = vacations.filter(vacation => vacation.id === id)[0];
        if (vacation) {
            return vacation;
        }
    } catch (error) {
        console.log(error);
    }

    return null;
}

async function getVacationsByUserId({
    userId
}) {
    let vacations = [];
    try {
        const user = await userService.getUserById({
            id: userId
        });

        vacations = user.vacations;
    } catch (error) {
        console.log(error);
    }

    return vacations;
}

async function getVacationsByCompanyId({
    companyId
}) {
    let vacations = [];
    try {
        const response = await userService.getAllUsers();

        vacations = response.users.filter(user => user.vacations.length !== 0 && user.company.id === companyId).map(user => user.vacations).flat();
    } catch (error) {
        console.log(error);
    }

    return vacations;
}

async function createVacation({
    userId,
    username,
    description,
    vacationType,
    days
}) {
    let result = false;
    try {
        const user = await userService.getUserById({
            id: userId
        });

        if (user) {
            const id = uuidv4();
            const vacation = {
                id,
                username,
                description,
                vacationType,
                days,
                status: statuses.Pending,
                userId,
            };

            result = await userService.addUserVacation({
                userId,
                vacation
            });
        }
    } catch (error) {
        console.log(error);
    }

    return result;
}

async function updateVacation({
    id,
    description,
    vacationType,
    days,
    status,
}) {
    let result = false;
    try {
        let vacation = await getVacationById({
            id
        });

        vacation.description = description != null ? description : vacation.description;
        vacation.vacationType = vacationType != null ? vacationType : vacation.vacationType;
        vacation.days = days != null ? days : vacation.days;
        vacation.status = status != null ? status : vacation.status;

        result = await userService.updateUserVacation({
            vacation
        });
    } catch (error) {
        console.log(error);
    }

    return result;
}

module.exports = {
    getAllVacations,
    getVacationById,
    getVacationsByUserId,
    getVacationsByCompanyId,
    createVacation,
    updateVacation
};