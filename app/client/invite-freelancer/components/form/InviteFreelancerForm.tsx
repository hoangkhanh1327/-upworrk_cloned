"use client";
import React, { useContext, useEffect, useState } from "react";
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
import { useStateContext } from "@/context";
import { ReloadIcon } from "@radix-ui/react-icons";
import { commonServices } from "@/app/services/common.services";
import { AuthContext } from "@/app/providers/AuthProvider";
import { FreelancerInfo } from "@/app/types/authentication.types";
import JobItem from "@/app/freelancer/my-job/components/AppliedJobs/JobItem";
import { clientServices } from "@/app/services/client.services";
import { ClientPostList } from "@/app/types/client.types";
import { isEmpty } from "lodash";
import { Skeleton } from "@/app/components/ui/skeleton";
import { useToast } from "@/app/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface ICreateInvite {
  freelancer: FreelancerInfo;
  onClose?: () => void;
}
export interface SignUpSubmitValue {}
const CreateFormInviteSchema = yup.object({
  title: yup.string().required(""),
  mail_invite: yup.string().required(""),
  // deadline: yup.date().required(),
  // bids: yup.number().required(),
  // signature: yup.string().required("Vui lòng nhập chữ ký của bạn"),
  // allowSendMail: yup.bool(),
});

const InviteFreelancerForm = ({ freelancer, onClose }: ICreateInvite) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<ClientPostList>([]);
  const [isGettingPosts, setIsGettingPosts] = useState<boolean>(false);
  const [idJob, setIdJob] = useState<number>(posts[0]?.id || 0);
  const { toast } = useToast();
  useEffect(() => {
    const fecthPosts = async (data: any) => {
      try {
        setIsGettingPosts(true);
        const res = await clientServices.getPosts({
          page: data?.page || 1,
          num: 999,
          status: 1,
        });
        if (res.data && !isEmpty(res.data.data)) {
          setPosts(res.data.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsGettingPosts(false);
      }
    };
    fecthPosts({ page: 1, statusOpts: "1" });
  }, []);

  const form: any = useForm({
    resolver: yupResolver(CreateFormInviteSchema),
    defaultValues: {
      title: "",
      mail_invite: "",
    },
  });
  const handleSetJob = (e: React.ChangeEvent<HTMLInputElement>) => {
    const postId = e.target?.value;
    console.log(postId);
    setIdJob(Number(postId));
    // ...
  };

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
    const dataSubmit = {
      title: data.title,
      job_id: idJob,
      freelancer_id: freelancer.id,
      mail_invite: data.mail_invite,
    };
    const res = await clientServices.sendInviteWorkToFreelancer(dataSubmit);
    try {
      setLoading(true);
      if (res.status === 200) {
        sendNotification({
          title: `Lời mời làm việc từ ${user?.username} 😍`,
          message: data.mail_invite,
          linkable: `/job/${idJob}`,
          smail: 1,
          imagefile: null,
          user_type: "freelancer",
          user_id: freelancer.id,
        });

        toast({
          title: "Thành công",
          description: "Gửi lời mời thành công",
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-white bg-green-200"
          ),
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: "Gửi lời mời thất bại",
        description: res.message || "Có lỗi xảy ra, vui lòng thử lại sau",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-white bg-red-200"
        ),
        duration: 2000,
      });
    }
    setLoading(false);
    onClose?.();
  };
  // handleCreateAccount(data);
  const onError: SubmitErrorHandler<SignUpSubmitValue> = (errors) => {
    console.log("error", errors);
  };

  return (
    <>
      <div className="">
        <Form {...form}>
          <form className="" onSubmit={form.handleSubmit(onSubmit, onError)}>
            <div className="grid grid-cols-1 gap-x-1">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        className="border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px] 
                        focus-visible:ring-offset-0 focus-visible:ring-transparent focus-visible:ring-opacity-50
                        no-underline"
                        placeholder="Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-x-1 my-2">
              <p className="py-2">Chọn công việc</p>
              <select
                onChange={(e) => handleSetJob(e as any)}
                className="peer h-full w-full 
              rounded-[7px] bg-transparent px-3 py-2.5 font-sans
               text-sm font-normal text-blue-gray-700 outline outline-0
               border-2 border-solid border-[#e4ebe4]
               focus:border-0
                 focus:border-transparent  focus:outline-1 disabled:bg-blue-gray-50"
              >
                {isGettingPosts ? (
                  <Skeleton className="h-8" />
                ) : (
                  posts.map((post) => (
                    <option
                      key={post.id}
                      value={post.id}
                      className="py-2 !h-[50px] text-lg hover:bg-gray-200"
                    >
                      {post.title}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="grid grid-cols-1 gap-x-1">
              <FormField
                //  ref={usernameRef}
                control={form.control}
                name="mail_invite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nội dung thư mời</FormLabel>
                    <FormControl>
                      <Textarea
                        className="
                        focus-visible:ring-offset-0 focus-visible:ring-transparent focus-visible:ring-opacity-50 border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px]  no-underline"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                Gửi lời mời
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default InviteFreelancerForm;
