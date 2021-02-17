import * as backendAPI from "../utils/backend-api";

function getAllUsersByCompanyId(id) {
  return backendAPI.GET(`/user/getAllByCompanyId?companyId=${id}`);
}

function createUser({ email, firstName, lastName, roleName, companyName }) {
  const createBody = JSON.stringify({
    email,
    firstName,
    lastName,
    roleName,
    companyName,
  });
  return backendAPI.POST("/user/create", createBody);
}

function deleteUser(id) {
  const deleteBody = JSON.stringify({
    userId: id,
  });
  return backendAPI.POST("/user/delete", deleteBody);
}

function activateUser({ id, password, securityKey }) {
  const activateBody = JSON.stringify({
    id,
    password,
    securityKey,
  });
  return backendAPI.PUT("/user/activate", activateBody);
}

export { getAllUsersByCompanyId, deleteUser, createUser, activateUser };
