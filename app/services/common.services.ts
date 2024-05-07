import { appConfig } from "../configs/app.config";
import { CommonResponse, Skill } from "../types/common.types";
import ApiService from "./ApiService";

type GetSkillRequest = {
  page: number;
  num: number;
  search?: string;
};

type GetSkillResponse = CommonResponse & {
  data: {
    data: Skill[];
    total: number;
    total_page: number;
  };
};
type GetMajorResponse = CommonResponse & {
  
    data:any;
    total: number;
    total_page: number;
};

const getMajor = (params: GetSkillRequest) => {
  return ApiService.get<GetMajorResponse>(`/majors`, params);
 }
const getSkill = (params: GetSkillRequest) => {
  return ApiService.get<GetSkillResponse>(`/administrator/skill`, params);
};
const sendNotication = async (params: INotiParams) => {
  return ApiService.postFormData<any>(`/notifications`, {
    title: params.title,
    message: params.message,
    linkable: params.linkable,
    smail: params.smail,
    imagefile: params.imagefile,
    user_type: params.user_type,
    user_id: params.user_id,
  });
};

const pushSeenNoti = async (id: number) => { 
  return ApiService.put<any>(`/notifications/${id}/seen`);
}

const getInfoUser = async (params:any): Promise<any>=>{
  return ApiService.get<any>(`/info-user?id=${params.id}&typeUser=${params.type}`)
  
}

const getInfoJob = async (id:number): Promise<any>=>{
  return ApiService.get<any>(`/job/${id}`)
  
}

//api get notification
const getNotification = async (params: any) => {
  return ApiService.get<GetNotificationResponse>(`/notifications`);
};

const sendOtp = async () => {
  return ApiService.post<GetNotificationResponse>(`/send-otp`);
}
const verifyOtp = async (otp:any) => {
  return ApiService.post<GetNotificationResponse>(`/verify-otp`,{otp:otp});
}
const getProvinces = async () => { 
  return ApiService.get<GetProvinces>(`https://vapi.vnappmob.com/api/province/`);
}

const getDistricts = async (province_id:number) => { 
  return ApiService.get<GetProvinces>(`https://vapi.vnappmob.com/api/province/district/${province_id}`);
}
const getWarks= async (district_id:number) => { 
  return ApiService.get<GetProvinces>(`https://vapi.vnappmob.com/api/province/ward/${district_id}`);
}

const UpdateInfo = async (user_type:string,atributeUpdate:any) => {
  if (user_type == 'client')
    return await ApiService.postFormData<any>('/client/info/update',atributeUpdate);
  else
    return await ApiService.postFormData<any>('/freelancer/info/update',atributeUpdate);
}

const verifyCard = async (image:any) => {
  return await ApiService.postFormData<any>('/verify-citizen-identification-card', {image:image});
}

const getDataChart = async (url: any, params: any) => { 
  return await ApiService.get<any>(url, params);
}

const feedback = async (params: any) => { 
  return await ApiService.post<any>('/feedback', params);
}

export type GetProvinces = any;

export type INotiParams = {
  title: string;
  message: string;
  linkable: string;
  smail: number;
  imagefile: File|null;
  user_type?: string;
  user_id?: number;
};
export type INoti = {
  id: number;
  user_id: number;
  type_user: string;
  noti_type: string;
  title: string;
  message: string;
  time_push: string;
  image: string;
  linkable: string;
  is_read: string;
  created_at: string;
  updated_at: string;
};

export type GetNotificationResponse = CommonResponse & {
  data: {
    data: INoti[];
    total: number;
    total_page: number;
  };
};

export const commonServices = {
  getSkill,
  sendNotication,
  getNotification,
  getInfoUser,
  getInfoJob,
  sendOtp,
  pushSeenNoti,
  verifyOtp,
  getProvinces,
  getWarks,
  getDistricts,
  UpdateInfo,
  getMajor,
  verifyCard,
  getDataChart,
  feedback

};
