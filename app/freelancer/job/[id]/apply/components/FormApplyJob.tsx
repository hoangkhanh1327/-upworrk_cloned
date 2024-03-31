"use client";
import React, { useContext, useState } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { cn } from "@/lib/utils";

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
import Link from "next/link";
import { Textarea } from "@/app/components/ui/textarea";
import Upload from "@/app/components/themes/Upload";
import { ReloadIcon } from "@radix-ui/react-icons";
import { freelancerServices } from "@/app/services/freelancer.services";
import { commonServices } from "@/app/services/common.services";
import { AuthContext } from "@/app/providers/AuthProvider";
import { DetailClientPost } from "@/app/types/client.types";
import { toast } from "@/app/components/ui/use-toast";

const signUpFormSchema = yup.object({
  attachments: yup.mixed().nullable(),
  coverLetter: yup.string().required(),
});

export interface SignUpSubmitValue {
  [key: string]: string | number;
}

interface ISignUpForm {
  handleApplyJob: (data: SignUpSubmitValue) => void;
  job: DetailClientPost;
}

const FormApplyJob: React.FC<ISignUpForm> = ({ handleApplyJob, job }) => {
  const user = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    resolver: yupResolver(signUpFormSchema),
    defaultValues: {
      attachments: null,
      coverLetter: "",
    },
  });

  const sendNotification = async (data: any) => {
    
    try {
        // setIsGettingPosts(true);
        const res = await commonServices.sendNotication(data);
        if(res.status === 200) {
          toast({
              title: 'Thành công',
              description: 'Bạn đã gửi yêu cầu làm việc thành công',
              className: cn(
                  'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
              ),
              duration: 1000,
          });
        }
    } catch (error) {
      // if (res.data) {
        toast({
            title: 'Thất bại',
            description: 'Đã có lỗi xảy ra',
            className: cn(
                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
            ),
            duration: 1000,
        });
    } finally {
        // setIsGettingPosts(false);
    }
};


  const handleCreatePost = async (data: any) => {
    try {
      setLoading(true);
      const dataApplyJob = {
        ...data,
        proposal: 0,
        jobId: job.id,
      };
      const res = await freelancerServices.applyJob({
        ...dataApplyJob,
        // deadline: format(data.deadline, "yyyy-MM-dd"),
      });
      if (res.status === 200) {
        // router.push("/client/dashboard");
         sendNotification({
            title: `Có 1 ứng viên mới đã ứng tuyển công việc ${job.title} của bạn`,
            message: `Ứng viên ${user.user?.username} đã ứng tuyển công việc ${job.title} của bạn`,
            linkable: '/contract',
            smail: 1,
            imagefile: null,
            user_type: 'client',
            user_id: job.client_id
        })
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const fileContent = form.watch("attachments");

  const onSubmit: SubmitHandler<SignUpSubmitValue | any> = (data) =>
    handleCreatePost(data);
  const onError: SubmitErrorHandler<SignUpSubmitValue | any> = (errors) => {
    console.log("error", errors);
  };

  return (
    <>
      <div className="mx-auto px-6">
        <Form {...form}>
          <form className="" onSubmit={form.handleSubmit(onSubmit, onError)}>
            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Upload file description about your job`}</FormLabel>
                  <Upload
                    className="h-[66px]"
                    multiple={false}
                    disabled={fileContent ? true : false}
                    showList={true}
                    fileList={fileContent ? [fileContent as File] : []}
                    draggable={true}
                    onChange={(file) => {
                      form.setValue("attachments", file[0]);
                    }}
                    onFileRemove={() => {
                      form.setValue("attachments", null);
                    }}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hãy viết mô tả ngắn về bạn và công việc</FormLabel>
                  <FormControl>
                    <Textarea rows={10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center items-center gap-x-1 mt-20">
              <Button
                disabled={loading}
                className="block bg-[#108a00] hover:bg-[#14a800]"
                type="submit"
              >
                {loading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin inline-flex" />
                )}
                Gửi thông tin ứng tuyển
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default FormApplyJob;
