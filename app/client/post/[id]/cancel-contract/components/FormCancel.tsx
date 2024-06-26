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
import { Input } from "antd";
import { Button } from "@/app/components/ui/button";
import { useContract } from "@thirdweb-dev/react";
import { useStateContext } from "@/context";
import { ReloadIcon } from "@radix-ui/react-icons";
import { commonServices } from "@/app/services/common.services";
import { AuthContext } from "@/app/providers/AuthProvider";
import { Nominee } from "@/app/types/client.types";
import { clientServices } from "@/app/services/client.services";
import { Button as ButtonAnt, Checkbox, Modal } from "antd";
import PolicyViews from "../../components/PolicyViews";
import SignaturePadSimple from "../../components/SignaturePad";
import constants from "@/app/utils/constants";
import InputOtp from "../../components/InputOtp";
import { appConfig } from "@/app/configs/app.config";
// import Link from "next/link";
const Textarea = Input.TextArea;

const CancelFormContractSchema = yup.object({
  title: yup.string().required(""),
  description: yup.string().required(""),
  // deadline: yup.date().required(),
  bids: yup.number().required(),
  // signature: yup.string().required("Vui lòng nhập chữ ký của bạn"),
  // allowSendMail: yup.bool(),
});

export interface SignUpSubmitValue {}

interface ICancelFormContract {
  handleCancelAccount: (data: SignUpSubmitValue) => void;
}
interface ICancelContract {
  nominee: Nominee;
}

const CancelFormContract: React.FC<ICancelContract> = ({ nominee }) => {
  const [loading, setLoading] = useState(false);
  const user = useContext(AuthContext);
  const [imgSignature, setImgSignature] = useState<String>("");
  const [acceptedPolicy, setAcceptedPolicy] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);
  const [disabledPolicy, setDisabledPolicy] = useState(true);
  4;
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
  const form = useForm({
    resolver: yupResolver(CancelFormContractSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

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

  console.log("infoAppli", nominee);

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
          nominee.job_id,
          nominee.freelancer_id,
          user.user?.id,
        ]);

        const responseContract = await contract?.call(
          "cancelContract",
          [
            data.title,
            data.description,
            imgSignature,
            data.bids,
            nominee.job_id,
            nominee.freelancer_id,
            user.user?.id,
          ],
          { value: data.bids.toString() }
        );
        // gọi cho bên kia biết là chấp nhận freelancer này.
        clientServices.confirmJob(nominee.id);
        setLoading(false);
        console.log(
          "responseContract",
          data.title,
          data.description,
          imgSignature,
          data.bids,
          nominee.job_id,
          nominee.freelancer_id,
          user.user?.id
        );
        //send notification
        // await notiRes =
        sendNotification({
          title: `Đã hủy hợp đồng ${data.title} success`,
          message: `${data.description}`,
          linkable: `info-contract/${nominee.job_id}`,
          smail: 1,
          imagefile: null,
          user_type: "freelancer",
          user_id: nominee.freelancer_id,
        });
      } catch (err) {
        console.error("contract call failure", err);
      }
    } else {
      connect();
    }
    // console.log(data);
  };
  // handleCancelAccount(data);
  const onError: SubmitErrorHandler<SignUpSubmitValue> = (errors) => {
    console.log("error", errors);
  };

  return (
    <>
      <div className="">
        <div className="my-6">
          <h2 className="text-3xl -tracking-[1px] font-medium text-center">
            Quy định hủy hợp đồng
          </h2>
          <span>
            <p className="text-[#001e00] text-lg text-center">
              Hãy cân nhắc trước khi thực hiện việc hủy hợp đồng,
              <br />
              việc này sẽ ảnh hưởng đến uy tín của bạn trong tương lai. Thêm vào
              đó, số tiền bạn đã đặt cọc sẽ không được hoàn lại mà nó sẽ được
              chuyển cho freelancer.
            </p>
          </span>
        </div>
        <Form {...form}>
          <form className="" onSubmit={form.handleSubmit(onSubmit, onError)}>
              {/* <FormField
                control={form.control}
                name="bids"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số bids</FormLabel>
                    <FormControl>
                      <Input
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
              /> */}
            <div className="grid grid-cols-1 gap-x-1">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">
                      Hãy cho chúng tôi biết một vài lý do khiến bạn hủy hợp
                      đồng
                    </FormLabel>
                    <FormControl>
                      <Textarea rows={6} {...field} />
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
                      {address ? "Hủy hợp đồng" : "Kết nối ví MetaMask"}
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

export default CancelFormContract;
