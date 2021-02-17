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

export { getAllUsersByCompanyId, deleteUser, createUser };
