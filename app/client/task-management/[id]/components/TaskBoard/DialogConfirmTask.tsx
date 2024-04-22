import React, { useState } from "react";
import { Button, Modal, Select } from "antd";
import { CommonSelectOptions } from "@/app/types/common.types";

interface DialogConfirmTaskProps {
  onClosed: () => void;
  open: boolean;
}
const DialogConfirmTask = ({ onClosed, open }: DialogConfirmTaskProps) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
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
  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  const handleOk = () => {
    // setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      onClosed();
      setConfirmLoading(false);
    }, 2000);
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
            defaultValue={Options[0].value}
            options={Options}
            style={{ width: 250, marginTop: 10 }}
          />
        </div>
      </Modal>
    </>
  );
};

export default DialogConfirmTask;
