export interface Menu {
  title: string;
  key: string;
  description: string;
}

export const menuData: Menu[] = [
  {
    title: "Freelancers",
    key: "freelancers",
    description: "Danh sách freelancers",
  },
  {
    title: "Clients",
    key: "clients",
    description: "Danh sách clients",
  },
  {
    title: "Posts",
    key: "posts",
    description: "Danh sách bài đăng",
  },
  {
    title: "Reports",
    key: "reports",
    description: "Báo cáo",
  },
];
