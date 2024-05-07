import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { NotificationContext } from "@/app/providers/NotificationProvider";
import {
  GetAllClient,
  GetAllFreelancer,
  UpdateClient,
  UpdateFreelancer,
} from "@/app/services/adminService";
import { UserList } from "@/app/types/authentication.types";
import { Button, Modal, Pagination, Select, Spin } from "antd";
import Search from "antd/es/input/Search";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";

const PAGE_SIZE = 5;

type ListType = "freelancer" | "client";

function Userlist({ type }: { type: ListType }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserList[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(70);

  // Delete user
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(
    undefined
  );
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    undefined
  );

  // Notification
  const { openNotificationWithIcon } = useContext(NotificationContext);

  useEffect(() => {
    getUsers();
  }, [currentPage, selectedStatus]);

  const getUsers = () => {
    if (type == "freelancer") getFreelancers();
    else if (type == "client") getClients();
  };

  const updateUser = () => {
    if (type == "freelancer") updateFreeclancer();
    else if (type == "client") updateClient();
  };

  const getFreelancers = () => {
    if (!loading) {
      setLoading(true);
      GetAllFreelancer({
        page: currentPage,
        num: PAGE_SIZE,
        search: searchText,
        status: selectedStatus,
      })
        .then((res) => {
          console.log(res);
          setUsers(res.data.data);
          setTotal(res.data.total);
          console.log(res.data.total);
        })
        .catch((errors) => {
          console.log(errors);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const getClients = () => {
    if (!loading) {
      setLoading(true);
      GetAllClient({
        page: currentPage,
        num: PAGE_SIZE,
        search: searchText,
        status: selectedStatus,
      })
        .then((res) => {
          console.log(res);
          setUsers(res.data.data);
          setTotal(res.data.total);
          console.log(res.data.total);
        })
        .catch((errors) => {
          console.log(errors);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onSearch = () => {
    getUsers();
  };

  const handleChangeSelectStatus = (value: string) => {
    setSelectedStatus(value === "2" ? undefined : value);
  };

  const onPageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
  };

  const handleDeleleUser = async () => {
    updateUser();
  };

  const updateFreeclancer = () => {
    if (selectedUserId && status && !loading) {
      setLoading(true);
      UpdateFreelancer(selectedUserId, status == 0 ? 1 : 0)
        .then((res) => {
          setUsers((prev) =>
            prev.map((user) => {
              if (user.id != selectedUserId) {
                return user;
              } else {
                user.status = user.status == 0 ? 1 : 0;
                return user;
              }
            })
          );

          setSelectedUserId(undefined);
          setStatus(undefined);

          if (status == 1)
            openNotificationWithIcon(
              "success",
              "Xóa người dùng thành công",
              "Thành công"
            );
          else
            openNotificationWithIcon(
              "success",
              "Khôi phục người dùng thành công",
              "Thành công"
            );
        })
        .catch((error) => {
          openNotificationWithIcon("error", error.message, "Lỗi");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const updateClient = () => {
    if (selectedUserId && status && !loading) {
      setLoading(true);
      UpdateClient(selectedUserId, status == 0 ? 1 : 0)
        .then((res) => {
          setUsers((prev) =>
            prev.map((user) => {
              if (user.id != selectedUserId) {
                return user;
              } else {
                user.status = user.status == 0 ? 1 : 0;
                return user;
              }
            })
          );

          setSelectedUserId(undefined);
          setStatus(undefined);

          if (status == 1)
            openNotificationWithIcon(
              "success",
              "Xóa người dùng thành công",
              "Thành công"
            );
          else
            openNotificationWithIcon(
              "success",
              "Khôi phục người dùng thành công",
              "Thành công"
            );
        })
        .catch((error) => {
          openNotificationWithIcon("error", error.message, "Lỗi");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <div className='p-5 pl-0 pt-0'>
        <span className='text-[16px] p-2 pl-0 pr-8'>Tìm kiếm</span>
        <Search
          placeholder='Tìm kiếm'
          onSearch={onSearch}
          style={{ width: 300 }}
          value={searchText}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
          }}
        />
        <span className='text-[16px] p-2 pl-8 pr-8'>Trạng thái</span>
        <Select
          defaultValue='2'
          style={{ width: 120 }}
          onChange={handleChangeSelectStatus}
          options={[
            { value: "0", label: "Ẩn" },
            { value: "1", label: "Hoạt động" },
            { value: "2", label: "Tất cả" },
          ]}
        />
      </div>
      <table className='overscroll-none'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px] text-center font-medium'>
              STT
            </TableHead>
            <TableHead>Avatar</TableHead>
            <TableHead className='text-center'>Họ tên</TableHead>
            <TableHead className='text-center'>User name</TableHead>
            <TableHead className='text-center'>Email</TableHead>
            <TableHead className='text-center'>Giới tính</TableHead>
            <TableHead className='text-center'>Ngày sinh</TableHead>
            <TableHead className='text-center'>Số điện thoại</TableHead>
            <TableHead className='text-center'>Ngày tham gia</TableHead>
            <TableHead className='text-center'>Trạng thái</TableHead>
            <TableHead className='text-center'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='text-[14px]'>
          {users.map((user, index) => (
            <TableRow key={`applied-job-item-${index}`}>
              <TableCell className='font-medium text-center'>
                {index + 1}
              </TableCell>
              <TableCell>
                {!user.avatar_url && (
                  <div className='h-8 w-8 rounded-full border-solid border border-indigo-600' />
                )}
                {user.avatar_url && (
                  <img
                    className='h-8 w-8 rounded-full border-solid border border-indigo-600'
                    src={user.avatar_url}
                    alt={user.username}
                  />
                )}
              </TableCell>
              <TableCell className='text-center'>
                {user.last_name && user.first_name
                  ? `${user.last_name} ${user.first_name}`
                  : "-"}
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className='text-center'>
                {user.sex === 0 ? "Nữ" : "Nam"}
              </TableCell>
              <TableCell className='text-center'>
                {user.date_of_birth
                  ? format(user.date_of_birth, "dd/MM/yyyy")
                  : "-"}
              </TableCell>
              <TableCell className='text-center'>
                {user.phone_num ?? "-"}
              </TableCell>
              <TableCell className='text-center'>
                {user.created_at ? format(user.created_at, "dd/MM/yyyy") : "-"}
              </TableCell>
              <TableCell className='w-[120px] text-center'>
                {user.status == 0 ? "Ẩn" : "Hoạt động"}
              </TableCell>

              <TableCell className='relative'>
                <div className='p-2 group z-50'>
                  <IoMdMore />
                  <div className='hidden group-hover:block absolute bg-[#f7f7f7] shadow-xl rounded-md px-4 py-1 top-10 right-6 w-[120px]'>
                    <div
                      className='text-[15px] cursor-pointer hover:text-blue-500 pt-1 pb-1'
                      onClick={() => {
                        router.push(`admin/nguoi-dung/${type}/${user.id}`);
                      }}
                    >
                      Xem chi tiết
                    </div>
                    <div
                      className='text-[15px] cursor-pointer hover:text-blue-500 pt-1 pb-1'
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setStatus(user.status);
                        setIsModalOpen(true);
                      }}
                    >
                      {user.status == 0 ? "Khôi phục" : "Xóa"}
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </table>
      {total != 0 && (
        <div className='flex justify-center pt-5'>
          <Pagination
            defaultCurrent={currentPage}
            total={total}
            pageSize={PAGE_SIZE}
            onChange={onPageChange}
          />
        </div>
      )}
      {loading && <Spin fullscreen />}
      <Modal
        title='Cảnh báo'
        open={isModalOpen}
        onOk={handleDeleleUser}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              className='text-[#4096ff] border-[#4096ff] hover:text-[#fff] hover:bg-[#4096ff]'
              onClick={() => {
                handleDeleleUser();
                setIsModalOpen(false);
              }}
            >
              Oke
            </Button>
          </>
        )}
      >
        {status == 0 ? (
          <p>Bạn có muốn khôi phục người dùng này?</p>
        ) : (
          <p>Bạn có muốn xóa người dùng này?</p>
        )}
      </Modal>
    </div>
  );
}

export default Userlist;
