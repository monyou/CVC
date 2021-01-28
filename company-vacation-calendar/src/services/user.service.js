import * as backendAPI from "../utils/backend-api";

function getAllUsersByCompanyId(id) {
  return backendAPI.GET(`/user/getAllByCompanyId?companyId=${id}`);
}

function deleteUser(id) {
  const deleteBody = JSON.stringify({
    userId: id,
  });
  return backendAPI.POST("/user/delete", deleteBody);
}

export { getAllUsersByCompanyId, deleteUser };
