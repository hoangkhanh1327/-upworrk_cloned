import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { Pencil } from "lucide-react";
import { useContext, useState } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { Alert, Form, Input, Modal, Typography } from "antd";
import InputOtp from "@/app/client/post/[id]/components/InputOtp";
import { loginServices } from "@/app/services/authentication.services";

const PasswordInfoMenu = () => {
  const { onOpenModal } = useContext(ProfileContext);
  const [form] = Form.useForm();
  const [verify, setVerify] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
    };
    
    const handleSubmitForm=async(values:any) => {
        console.log('Received values of form: ', values);
        const result = await loginServices.changePassword(values);
        console.log(result);
        //show thông báo ở đây
        
    }

  return (
    <Card className="rounded-2xl mb-8">
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          Thay đổi mật khẩu
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => onOpenModal?.("change-password")}
                  className="bg-transparent hover:bg-transparent border-2 border-solid border-primary-color rounded-full px-1.5"
                >
                  <Pencil fill="#108a00" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Nhấn để chỉnh sửa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-x-8">
          Thực hiện thay đổi mật khẩu để bảo vệ tài khoản của ban.
        </div>
        <div className="flex gap-x-8">
          <Form
            form={form}
            name="dependencies"
                      autoComplete="off"
            onFinish={handleSubmitForm}
            style={{ width: 800 }}
            layout="vertical"
          >
            <Form.Item
              label="Mật khẩu cũ"
              name="old_password"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu mới"
              name="new_password"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>

            {/* Field */}
            <Form.Item
              label="Xác nhận mật khẩu"
              name="password2"
              dependencies={["new_password"]}
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Vui lòng kiểm tra lại mật khẩu mới và mật khẩu xác nhận phải giống nhau!!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item>
              {!verify ? (
                              <Button onClick={() => { showModal(); }}>Xác thực</Button>
              ) : (
                <Button type="submit">Thay đổi mật khẩu</Button>
              )}
            </Form.Item>
            {/* Render Props
      <Form.Item noStyle dependencies={['password2']}>
        {() => (
          <Typography>
            <p>
              Only Update when <code>password2</code> updated:
            </p>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item> */}
          </Form>
        </div>
      </CardContent>
      <Modal
        className="text-center"
        title="Nhập mã OTP, mã OTP đã được gởi về mail của bạn"
        open={open}
        onCancel={hideModal}
        footer={[]}
      >
        <InputOtp setVerify={setVerify}></InputOtp>
      </Modal>
    </Card>
  );
};

export default PasswordInfoMenu;
