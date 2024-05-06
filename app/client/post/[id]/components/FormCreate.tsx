"use client";
import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { Textarea } from "@/app/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input, Spin } from "antd";
import { Button } from "@/app/components/ui/button";
import { useContract } from "@thirdweb-dev/react";
import { useStateContext } from "@/context";
import { ReloadIcon } from "@radix-ui/react-icons";
import { commonServices } from "@/app/services/common.services";
import { AuthContext } from "@/app/providers/AuthProvider";
import { DetailClientPost, Nominee } from "@/app/types/client.types";
import { clientServices } from "@/app/services/client.services";
import PolicyViews from "./PolicyViews";
import { Button as ButtonAnt, Checkbox, Modal } from "antd";
import SignaturePadSimple from "./SignaturePad";
import InputOtp from "./InputOtp";
import { appConfig } from "@/app/configs/app.config";
import { NotificationContext } from "@/app/providers/NotificationProvider";
import { useRouter } from "next/navigation";
// import Link from "next/link";
const Textarea = Input.TextArea;

const CreateFormContractSchema = yup.object({
  title: yup.string().required(""),
  description: yup.string().required(""),
  // deadline: yup.date().required(),
  bids: yup.number().required(),
  // signature: yup.string().required("Vui lòng nhập chữ ký của bạn"),
  // allowSendMail: yup.bool(),
});

export interface SignUpSubmitValue {}

interface ICreateFormContract {
  handleCreateAccount: (data: SignUpSubmitValue) => void;
}
interface ICreateContract {
  postDetail: DetailClientPost;
}
const inputContainerStyle = {
  display: "inline-block",
  border: "1px solid #ccc",
  borderRadius: "5px",
  overflow: "hidden",
};

const inputStyle = {
  width: "100%",
  height: "100%",
  padding: "0",
  margin: "0",
  border: "none",
  textAlign: "center",
  fontSize: "20px",
  outline: "none",
};

const CreateFormContract: React.FC<ICreateContract> = ({ postDetail }) => {
  const [loading, setLoading] = useState(false);
  const user = useContext(AuthContext);
  const [contractFile, setContractFile] = useState(null);
  const [imgSignature, setImgSignature] = useState<String>("");
  const [acceptedPolicy, setAcceptedPolicy] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);
  const [disabledPolicy, setDisabledPolicy] = useState(true);
  const nominee = postDetail.nominee;
  const [verify, setVerify] = useState(false);

  const toggleChecked = () => {
    setChecked(!checked);
  };
  const onChange = (e: any) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };

  const { contract } = useContract(appConfig.contractId);
  const { address, connect } = useStateContext();
  const { openNotificationWithIcon } = useContext(NotificationContext);
  console.log("address", address);
  const form = useForm({
    resolver: yupResolver(CreateFormContractSchema),
    defaultValues: {
      title: postDetail.title,
      description: "",
      // deadline: new Date(),
      bids: postDetail.bids,
      // signature: "",
    },
  });
  const router = useRouter();
  useEffect(() => {
    
    const checkData = async () => {
      setLoading(true);
      const data = await contract?.call("getJobInfoByCurrentJobId", [postDetail.id]);
      setLoading(false);
      if (data != undefined) { 
        openNotificationWithIcon('warning',"Hợp đồng đã được tạo","Hợp đồng này đã được tạo. Vui lòng thao tác lại.")
        router.push(`/client/post/${postDetail.id}`);
      }
    }
   // checkData();
    
  },[])
  

  const sendNotification = async (data: any) => {
    try {
      // setIsGettingPosts(true);
      const res = await commonServices.sendNotication(data);
      if (res.status === 200) {
        console.log("send notification success", res);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      // setIsGettingPosts(false);
    }
  };

  console.log("infoAppli", postDetail);

  useEffect(() => {
    if (imgSignature) {
      if (!verify) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  }, [imgSignature, verify]);
  /////Các hàm MODAL/////
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (address) {
      try {
        console.log("data");
        setLoading(true);
        console.log([
          data.title,
          data.description,
          imgSignature,
          data.bids,
          nominee?.job_id,
          nominee?.freelancer_id,
          user.user?.id,
        ]);

        const responseContract = await contract?.call(
          "createContract",
          [
            data.title,
            data.description,
            imgSignature,
            data.bids,
            nominee?.job_id,
            nominee?.freelancer_id,
            user.user?.id,
          ],
          { value: data.bids.toString() }
        );
        console.log("->", appConfig, responseContract);

        // gọi cho bên kia biết là chấp nhận freelancer này.
        //clientServices.confirmJob(nominee.id);
        setLoading(false);
        console.log(
          "responseContract",
          data.title,
          data.description,
          imgSignature,
          data.bids,
          nominee?.job_id,
          nominee?.freelancer_id,
          user.user?.id
        );
        //send notification
        // await notiRes =
        sendNotification({
          title: `Create contract ${data.title} success`,
          message: `${data.description}`,
          linkable: `/info-contract/${nominee?.job_id}`,
          smail: 1,
          imagefile: null,
          user_type: "freelancer",
          user_id: nominee?.freelancer_id,
        });
        openNotificationWithIcon("success", "Thành công", "Giao dịch thành công");
        router.push(`/client/post/${postDetail.id}`);
      } catch (err) {
        openNotificationWithIcon("error", "Thất bại", "Có lỗi khi thực hiện vui lòng thao tác lại.");
        console.error("contract call failure", err);
        router.push(`/client/post/${postDetail.id}`);
      }
    } else {
      connect();
    }
    // console.log(data);
  };
  // handleCreateAccount(data);
  const onError: SubmitErrorHandler<SignUpSubmitValue> = (errors) => {
    console.log("error", errors);
  };

  return (
    <>
      {loading && <Spin fullscreen></Spin>}
      <div className="">
        <Form {...form}>
          <form className="" onSubmit={form.handleSubmit(onSubmit, onError)}>
            <div className="grid grid-cols-2 gap-x-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        size="large"
                        className="border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px]  no-underline"
                        placeholder="Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bids"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số bids</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        size="large"
                        type="number"
                        className="border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px]  no-underline"
                        placeholder="bids"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-x-1">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hãy viết mô tả ngắn về hợp đồng</FormLabel>
                    <FormControl>
                      <Textarea rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-x-1 my-2">
              <PolicyViews setDisabledPolicy={setDisabledPolicy}></PolicyViews>
              <Checkbox
                checked={checked}
                disabled={disabledPolicy}
                onChange={onChange}
              >
                {disabledPolicy
                  ? "Vui lòng đọc điều khoảng trước khi tích vào đây"
                  : "Tôi đã đọc kỹ và tôi chấp nhận tất cả điều khoản nêu trên."}
              </Checkbox>
            </div>
            {checked ? (
              <>
                <div className="grid grid-cols-1 gap-x-1 justify-items-center">
                  <FormItem>
                    <FormLabel>{"Chữ ký"}</FormLabel>
                    <SignaturePadSimple setImg={setImgSignature} />

                    <FormMessage />
                  </FormItem>
                </div>

                <div className="text-center mt-6">
                  {verify ? (
                    <Button
                      disabled={loading}
                      className="bg-button-primary hover:bg-button-primary/80 px-6 border-2 border-solid border-transparent rounded-[10rem] transition-all inline-flex justify-center items-center max-h-10 leading-[calc_2.5rem_-_1px] text-base font-medium disabled:bg-button-disabled disabled:text-[#9aaa97] disabled:!cursor-not-allowed disabled:pointer-events-auto"
                      onClick={() => {
                        form.handleSubmit(onSubmit, onError);
                      }}
                    >
                      {loading && (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin inline-flex" />
                      )}
                      {address ? "Tạo hợp đồng" : "Kết nối ví MetaMask"}
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </form>
        </Form>
        <Modal
          className="text-center"
          title="Nhập mã OTP, mã OTP đã được gởi về mail của bạn"
          open={open}
          onCancel={hideModal}
          footer={[]}
        >
          <InputOtp setVerify={setVerify}></InputOtp>
        </Modal>
      </div>
    </>
  );
};

export default CreateFormContract;
