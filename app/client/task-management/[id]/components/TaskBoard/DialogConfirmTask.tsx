import React, { useState } from "react";
import { Button, Modal, Select, notification } from "antd";
import { CommonSelectOptions } from "@/app/types/common.types";
import { clientServices } from "@/app/services/client.services";

interface DialogConfirmTaskProps {
  onClosed: () => void;
  open: boolean;
  id_task: string | number;
  job_id: string | number;
}

const Options: CommonSelectOptions[] = [
  {
    label: "Xác nhận task hoàn thành",
    value: "1",
  },
  {
    label: "Cần xử lý lại",
    value: "0",
  },
];
type NotificationType = "success" | "info" | "warning" | "error";
const DialogConfirmTask = ({
  onClosed,
  open,
  id_task,
  job_id
}: DialogConfirmTaskProps) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [choice, setChoice] = useState<string | number>(Options[0].value);

  const openNotification = (type: NotificationType, msg: string) => {
    api[type]({
      message: "Thông Báo",
      description: msg,
    });
  };

  const handleChange = (value: any) => {
    setChoice(value);
  };
  const handleOk = async () => {
    // setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    try {
      const data = {
        id: id_task,
        job_id: job_id,
        status: choice,
      };
      const res = await clientServices.confirmStatus(data);
      if (res.status === 200) {
        openNotification("success", "Xác nhận công việc thành công");
      } else {
        openNotification("error", res.message || "Xác nhận công việc thất bại");
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Có lỗi xảy ra",
      });
    } finally {
      setTimeout(() => {
        onClosed();
        setConfirmLoading(false);
      }, 2000);
    }
  };

  return (
    <>
      <Modal
        title="Xác nhận công việc"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={onClosed}
        footer={[
          <Button key="back" onClick={onClosed}>
            Hủy
          </Button>,
          <Button
            className="bg-button-primary"
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleOk}
          >
            Xác nhận
          </Button>,
        ]}
      >
        <p>Nếu như bạn hài lòng với công việc xác nhận</p>
        <p>Ngược lại công việc sẽ trả về trạng thái đang thực hiện</p>
        <div className="flex text-center items-center flex-col">
          <Select
            onChange={handleChange}
            defaultValue={choice}
            options={Options}
            style={{ width: 250, marginTop: 10 }}
          />
        </div>
      </Modal>
    </>
  );
};

export default DialogConfirmTask;
