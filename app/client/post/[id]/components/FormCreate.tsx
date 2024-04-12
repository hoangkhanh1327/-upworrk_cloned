"use client";
import React, { useContext, useState } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useAddress, useMetamask, useContract } from "@thirdweb-dev/react";
import { useStateContext } from "@/context";
import { ReloadIcon } from "@radix-ui/react-icons";
import { commonServices } from "@/app/services/common.services";
import { AuthContext } from "@/app/providers/AuthProvider";
import { Applied } from "@/app/types/client.types";
import SignaturePad from "@/app/freelancer/info-contract/[job_id]/SignaturePad";
import { appConfig } from "@/app/configs/app.config";
import { clientServices } from "@/app/services/client.services";
// import Link from "next/link";

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
  // postId: string;
  infoApply: Applied;
}

const CreateFormContract: React.FC<ICreateContract> = ({ infoApply }) => {
  const [loading, setLoading] = useState(false);
  const user = useContext(AuthContext);
  const [contractFile, setContractFile] = useState(null);
  const [imgSignature, setImgSignature] = useState<String>("");

  const { contract } = useContract('0x141F9921217A5e6f0f34341077d831482db29d00');
  const { address, connect } = useStateContext();
  console.log("address", address);
  const form = useForm({
    resolver: yupResolver(CreateFormContractSchema),
    defaultValues: {
      title: "",
      description: "",
      // deadline: new Date(),
      bids: 0,
      // signature: "",
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

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (address) {
      try {
        console.log("data");
        setLoading(true);
        const responseContract = await contract?.call(
          "createContract",
          [
            data.title,
            data.description,
            imgSignature,
            data.bids,
            infoApply.job_id,
            infoApply.freelancer_id,
            user.user?.id,
          ],
          { value: data.bids.toString() }
        );
        // gọi cho bên kia biết là chấp nhận freelancer này.
        clientServices.confirmJob(infoApply.id);
        setLoading(false);
        console.log(
          "responseContract",
          data.title,
          data.description,
          imgSignature,
          data.bids,
          infoApply.job_id,
          infoApply.freelancer_id,
          user.user?.id
        );
        //send notification
        // await notiRes =
        sendNotification({
          title: `Create contract ${data.title} success`,
          message: `${data.description}`,
          linkable: `info-contract/${infoApply.job_id}`,
          smail: 1,
          imagefile: null,
          user_type: "freelancer",
          user_id: infoApply.freelancer_id,
        });
      } catch (err) {
        console.error("contract call failure", err);
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
      <div className="">
        {/* <div className="my-6">
          <h1 className="text-4xl -tracking-[1px] font-medium text-center">
            Điền thông tin hợp đồng
          </h1>
        </div> */}
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

            <div className="grid grid-cols-1 gap-x-1">
              {/* <FormField
                control={form.control}
                name="signature"
                render={({ field }) => ( */}
                  <FormItem>
                    <FormLabel>Chữ ký</FormLabel>
                    <FormControl>
                      <SignaturePad setImg={setImgSignature} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                {/* )} */}
              {/* /> */}
            </div>
            {/* </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

            <div className="text-center mt-6">
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
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CreateFormContract;
