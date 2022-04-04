import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CompanyModel from "../dtos/company.dto";
import UserModel from "../dtos/user.dto";
import VacationModel from "../dtos/vacation.dto";
import VacationTypeModel from "../dtos/vacationType.dto";
import {
  CreateUserProps,
  UpdateVacationProps,
} from "../modules/admin/types/admin.type";
import {
  ActivateUserProps,
  LoginProps,
  SubscribeProps,
} from "../modules/auth/types/auth.type";
import { CreateCompanyProps } from "../modules/superadmin/types/superadmin.type";
import { UserSubmitVacationProps } from "../modules/user/types/user.type";
import { getToken, getUserFromToken, setToken } from "../utils/common";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api`,
    prepareHeaders: (headers) => {
      const authToken = getToken() ? `Bearer ${getToken()}` : undefined;
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", authToken as string);
      return headers;
    },
  }),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    // Auth
    login: builder.mutation<any, LoginProps>({
      query: (body) => ({
        url: "auth/token",
        body,
        method: "POST",
      }),
      transformResponse: (response: any) => {
        setToken(response.token);
        const user = getUserFromToken();
        return user;
      },
    }),
    subscribe: builder.mutation<any, SubscribeProps>({
      query: (body) => ({
        url: "auth/subscribe",
        body,
        method: "POST",
      }),
    }),
    // Company
    getAllCompanies: builder.query<CompanyModel[], void>({
      query: () => `company/getAll`,
      transformResponse: (response: any) => {
        return response.companies;
      },
    }),
    createCompany: builder.mutation<any, CreateCompanyProps>({
      query: (body) => ({
        url: "company/create",
        body,
        method: "POST",
      }),
    }),
    deleteCompany: builder.mutation<any, string>({
      query: (id) => ({
        url: "company/delete",
        body: {
          companyId: id,
        },
        method: "POST",
      }),
    }),
    // Holiday
    getAllHolidays: builder.query<number[], void>({
      query: () => `holiday/getAll`,
      transformResponse: (response: any) => {
        return response.holidays;
      },
    }),
    // User
    getAllUsersByCompanyId: builder.query<UserModel[], string>({
      query: (id) => `user/getAllByCompanyId?companyId=${id}`,
      transformResponse: (response: any) => {
        return response.users;
      },
    }),
    getAllUsers: builder.query<UserModel[], void>({
      query: () => `user/getAll`,
      transformResponse: (response: any) => {
        return response.users;
      },
    }),
    createUser: builder.mutation<any, CreateUserProps>({
      query: (body) => ({
        url: "user/create",
        body,
        method: "POST",
      }),
    }),
    deleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: "user/delete",
        body: {
          userId: id,
        },
        method: "POST",
      }),
    }),
    activateUser: builder.mutation<any, ActivateUserProps>({
      query: (body) => ({
        url: "user/activate",
        body,
        method: "PUT",
      }),
    }),
    // Vacation
    getAllVacationsByCompany: builder.query<VacationModel[], string>({
      query: (id) => `vacation/getVacationsByCompanyId?companyId=${id}`,
    }),
    getAllVacationTypes: builder.query<VacationTypeModel[], void>({
      query: () => `vacation-type/getAll`,
      transformResponse: (response: any) => {
        return response.vacationTypes;
      },
    }),
    createVacation: builder.mutation<any, UserSubmitVacationProps>({
      query: (body) => ({
        url: "vacation/create",
        body,
        method: "POST",
      }),
    }),
    updateVacation: builder.mutation<any, UpdateVacationProps>({
      query: (body) => ({
        url: "vacation/update",
        body,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSubscribeMutation,
  useGetAllCompaniesQuery,
  useCreateCompanyMutation,
  useDeleteCompanyMutation,
  useGetAllHolidaysQuery,
  useGetAllUsersByCompanyIdQuery,
  useGetAllUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useActivateUserMutation,
  useGetAllVacationsByCompanyQuery,
  useGetAllVacationTypesQuery,
  useCreateVacationMutation,
  useUpdateVacationMutation,
} = baseApi;

export default baseApi;
