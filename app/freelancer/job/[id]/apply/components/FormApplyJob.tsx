"use client";
import React, { useState } from "react";
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

const signUpFormSchema = yup.object({
  attachments: yup.mixed().nullable(),
  coverLetter: yup.string().required(),
});

export interface SignUpSubmitValue {
  [key: string]: string | number;
}

interface ISignUpForm {
  handleApplyJob: (data: SignUpSubmitValue) => void;
}

const FormApplyJob: React.FC<ISignUpForm> = ({ handleApplyJob }) => {
  const form = useForm({
    resolver: yupResolver(signUpFormSchema),
    defaultValues: {
      attachments: null,
      coverLetter: "",
    },
  });
  const fileContent = form.watch("attachments");

  const onSubmit: SubmitHandler<SignUpSubmitValue | any> = (data) =>
    handleApplyJob(data);
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
          </form>
        </Form>
      </div>
    </>
  );
};

export default FormApplyJob;
