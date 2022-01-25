import { CreateUserProps } from "../modules/admin/types/admin.type";
import { ActivateUserProps } from "../modules/auth/types/auth.type";
import * as backendAPI from "../utils/api";

export function getAllUsersByCompanyId(id: string): Promise<any> {
  return backendAPI.GET(`/user/getAllByCompanyId?companyId=${id}`);
}

export function getAllUsers(): Promise<any> {
  return backendAPI.GET(`/user/getAll`);
}

export function createUser({
  email,
  firstName,
  lastName,
  roleName,
  companyName,
}: CreateUserProps): Promise<any> {
  const createBody = JSON.stringify({
    email,
    firstName,
    lastName,
    roleName,
    companyName,
  });
  return backendAPI.POST("/user/create", createBody);
}

export function deleteUser(id: string): Promise<any> {
  const deleteBody = JSON.stringify({
    userId: id,
  });
  return backendAPI.POST("/user/delete", deleteBody);
}

export function activateUser({
  id,
  password,
  securityKey,
}: ActivateUserProps): Promise<any> {
  const activateBody = JSON.stringify({
    id,
    password,
    securityKey,
  });
  return backendAPI.PUT("/user/activate", activateBody);
}

const userService = {
  getAllUsersByCompanyId,
  getAllUsers,
  deleteUser,
  createUser,
  activateUser,
};

export default userService;
