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
import dayjs from "dayjs";
// import DatePicker from "react-datepicker";

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
// import Link from "next/link";

const CreateFormContractSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  deadline: yup.date().required(),
  bids: yup.number().required(),
  status: yup.number().required(),

  // allowSendMail: yup.bool(),
});

export interface SignUpSubmitValue {}

interface ICreateFormContract {
  handleCreateAccount: (data: SignUpSubmitValue) => void;
}

const CreateFormContract = () => {
  // const [startDate, setStartDate] = useState(new Date());
  // const address = useAddress();
  // const connect = useMetamask();
  const { contract } = useContract('0x72c09FC8D70f28299E07ab9dEacE79BA4727aBe0');
  const { address, connect } = useStateContext();
  const form = useForm({
    resolver: yupResolver(CreateFormContractSchema),
    defaultValues: {
      title: "",
      description: "",
      deadline: new Date(),
      bids: 0,
      status: 0,
    },
  });
  // const data = await
  //  contract?.call('createContract', ["aaaa","desc","6",proposal,41,32,6], { value: (proposal).toString() });

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (address) {
      try {
        const test = await contract?.call(
          "createContract",
          [
            // data.title,
            // data.description,
            // data.deadline,
            // data.bids,
            'aaaa',
            'aaaaaaaaa',
            '2024-12-12',
            3,
            61,
            5,
            9,
          ],
          { value: '3' }
        );

        console.info("contract call successs", test);
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
      <div className="max-w-[464px] w-[464px] mx-auto">
        <div className="my-6">
          <h1 className="text-4xl -tracking-[1px] font-medium text-center">
            Create contract
          </h1>
        </div>
        <Form {...form}>
          <form className="" onSubmit={form.handleSubmit(onSubmit, onError)}>
            {/* <div className="grid grid-cols-2 gap-x-2"> */}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px]  no-underline"
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* </div> */}
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>deadline</FormLabel>
                  <FormControl>
                    <Input
                      className="border-2 border-solid  border-[#e4ebe4] text-[#001e00] text-sm leading-[22px]  no-underline"
                      placeholder=""
                      {...field}
                      type="date"
                      value={field.value ? field.value.toString() : ""}
                    />
                    {/* <DatePicker selected={startDate} onChange={(date : Date) => setStartDate(date)} /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bids"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Bids</FormLabel>
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
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value?.toString()}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px]  no-underline">
                        <SelectValue placeholder="Viet Nam" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />
                    <SelectContent className="border-2 border-solid border-[#e4ebe4] text-[#001e00] text-sm leading-[22px]  no-underline">
                      <SelectItem value="1">Chuẩn bị chuyển</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <div className="text-center mt-10">
              <Button
                className="bg-button-primary hover:bg-button-primary/80 px-6 border-2 border-solid border-transparent rounded-[10rem] transition-all inline-flex justify-center items-center max-h-10 leading-[calc_2.5rem_-_1px] text-base font-medium disabled:bg-button-disabled disabled:text-[#9aaa97] disabled:!cursor-not-allowed disabled:pointer-events-auto"
                onClick={() => {
                  form.handleSubmit(onSubmit, onError);
                }}
              >
                {address ? "Create contract" : "Connect wallet"}
                {/* {" Already create contract"} */}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CreateFormContract;
