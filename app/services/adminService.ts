import { UserList } from "../types/authentication.types";
import { CommonResponse } from "../types/common.types";
import ApiService from "./ApiService";

type GetUsersRequest = {
  page: number;
  num: number;
  search?: string;
  status?: string;
};

type GetUsersResponse = CommonResponse & {
  data: {
    current_page: number;
    data: UserList[];
    num: number;
    total: number;
    total_page: number;
  };
};

export function GetAllFreelancer(params: GetUsersRequest) {
  return ApiService.get<GetUsersResponse>(`/administrator/freelancer`, params);
}

export function UpdateFreelancer(id: number, status: number) {
  return ApiService.put<CommonResponse>(`/administrator/freelancer/${id}`, {
    status,
  });
}

export function GetAllClient(params: GetUsersRequest) {
  return ApiService.get<GetUsersResponse>(`/administrator/client`, params);
}

export function UpdateClient(id: number, status: number) {
  return ApiService.put<CommonResponse>(`/administrator/client/${id}`, {
    status,
  });
}
