import { Skill } from "./common.types";

export type ClientPost = {
  bids: string;
  client_id: string;
  content: string;
  created_at: string;
  deadline: string;
  desc: string;
  id: number;
  min_proposals: string;
  status: string | number;
  thumbnail: string;
  title: string;
  updated_at: string;
};

export type ClientPostList = ClientPost[];

type Task = {
  id: number;
  name: string;
};

export type Applied = {
  attachment_url: string;
  cover_letter: string;
  created_at: string;
  email: string;
  freelancer_id: string;
  id: number;
  job_id: string;
  proposal: string;
  updated_at: string;
  username: string;
};
export type Invited = {
  id: number;
  title: string;
  mail_invite: string;
  job_id: string;
  client_id: string;
  freelancer_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  username: string;
  email: string;
};

export type DetailClientPost = {
  id: number;
  client_id: number;
  title: string;
  desc: string;
  content: string;
  thumbnail: string;
  bids: number;
  status: number | string;
  deadline: string;
  created_at: string;
  content_file: string;
  updated_at: string;
  min_proposals: string | number;
  nominee?: Nominee;
  skills: {
    skill_desc: string;
    skill_id: string;
    skill_name: string;
    skill_points?: string;
  }[];
  applied: Applied[];
  statusText: string;
  task: Task[];
  list_invite: Invited[];
};

export type Nominee = {
  attachment_url: string;
  cover_letter: string;
  created_at: string;
  email: string;
  freelancer_id: string;
  id: number;
  job_id: string | number;
  proposal: string | number;
  status: string | number;
  updated_at: string;
  username: string;
};
