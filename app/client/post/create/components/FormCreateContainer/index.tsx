"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Editor } from "@tinymce/tinymce-react";
import { Input } from "@/app/components/ui/input";
import { CreatePostContext } from "../../context/CreatePostContext";
import { Textarea } from "@/app/components/ui/textarea";
import SkillSelect from "@/app/components/Selects/SkillSelect";
import { Skill } from "@/app/types/common.types";
import { CalendarIcon, X } from "lucide-react";
import Upload from "@/app/components/themes/Upload";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/app/components/ui/calendar";
import { Select } from "@/app/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { clientServices } from "@/app/services/client.services";
import SingleImageUpload from "@/app/components/themes/ImageUpload/SingleImageUpload";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { notification } from "antd";
type NotificationType = "success" | "info" | "warning" | "error";
const createPostSchema = yup.object({
  title: yup
    .string()
    .min(20, "Vui lòng nhập tiêu đề ít nhất 50 ký tự")
    .required("Vui lòng nhập tiêu đề"),
  desc: yup.string().required("Vui lòng nhập mô tả ngắn"),
  content: yup.string().required("Vui lòng nhập nội dung"),
  bids: yup.number().min(1, "Vui lòng nhập bid lớn hơn 0").required(),
  deadline: yup.string().required("Vui lòng chọn ngày hết hạn"),
  status: yup.number(),
  thumbnail: yup.mixed().nullable(),
  content_file: yup.mixed().nullable(),
  skill: yup
    .array()
    .of(
      yup.object().shape({
        skill_id: yup.number(),
        point: yup.number(),
        name: yup.string(),
      })
    )
    .min(3, "Vui lòng chọn ít nhất 3 skill")
    .required("Vui lòng chọn ít nhất 1 skill"),
});

interface SkillSubmit {
  skill_id: number;
  point: number;
  name: string;
}

interface ICreatePostData {
  deadline: string;
  skill: SkillSubmit[];
}

const FormCreateContainer = () => {
  const { step, goPreviousStep } = useContext(CreatePostContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: NotificationType, msg: string) => {
    api[type]({
      message: "Thông Báo",
      description: msg,
    });
  };

  const form = useForm({
    resolver: yupResolver(createPostSchema),
    defaultValues: {
      title: "",
      desc: "",
      content: "",
      bids: 1,
      skill: [],
      content_file: null,
      thumbnail: null,
      status: 0,
    },
  });

  const skills = form.watch("skill");
  const fileThumbnail = form.watch("thumbnail");

  const onSubmit: SubmitHandler<any> = (data) =>
    handleCreatePost(data);

  const onError: SubmitErrorHandler<ICreatePostData> = (errors) => {
    console.log("error", errors);
  };

  const handleCreatePost = async (data: ICreatePostData) => {
    console.log("data", data);
    const skilla: any[] = [];
    (data.skill as SkillSubmit[]).forEach((s) => {
      skilla.push(s.skill_id);
    });
    console.log("skill", skilla.toString());
    try {
      setLoading(true);
      const res = await clientServices.createPost({
        ...data,
        skill: skilla.toString(),
        deadline: format(data.deadline, "yyyy-MM-dd"),
      });
      if (res.status === 200) {
        openNotification("success", "Đã tạo công việc thành công.");
        router.push("/client/dashboard");
      } else {
        openNotification("error", `${res.message}` || "Tạo công việc thất bại");
      }
    } catch (error) {
      openNotification("error", "Tạo công việc thất bại");
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleValidate = async () => {
      let isValid = true;
      if (step === 2) {
        isValid = await form.trigger(["title", "desc"]);
      } else if (step === 3) {
        isValid = await form.trigger(["skill", "bids"]);
      } else if (step === 4) {
        isValid = await form.trigger("content");
      }

      if (!isValid) {
        goPreviousStep?.();
      }
    };
    handleValidate();
  }, [step, form, goPreviousStep]);

  return (
    <section className="container px-20 py-8">
      <Form {...form}>
        <form id="form-create" onSubmit={form.handleSubmit(onSubmit, onError)}>
          {step === 1 && (
            <div className="grid grid-cols-2 gap-x-8 px-12 mx-12">
              <div>
                <small className="mb-6 inline-block text-sm">
                  {`1/5`} <span className="ml-6">Công việc</span>
                </small>
                <h2 className="mb-6 text-4xl leading-8 -tracking-[0.25px] font-rza">{`Hãy bắt đầu với tiêu đề và mô tả công việc!`}</h2>
                <p className="text-sm leading-5 mb-8">
                  {`Điều này sẽ giúp cho ứng viên sẽ nắm bắt rõ được công việc của bạn! Giúp công việc của bạn nổi bật hơn với ứng viên phù hợp.`}
                </p>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>Tiêu đề công việc của bạn</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Viết mô tả ngắn cho công việc của bạn!
                      </FormLabel>
                      <FormControl>
                        {/* <Textarea rows={10} {...field} /> */}
                        <Editor
                          apiKey="fzcxmrnujn12zebeylcj8ku45qb2el9jt6zgbk37w0nlc36q"
                          init={{
                            plugins:
                              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                            toolbar:
                              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                            tinycomments_mode: "embedded",
                            tinycomments_author: "Author name",
                            // mergetags_list: [
                            //   { value: "First.Name", title: "First Name" },
                            //   { value: "Email", title: "Email" },
                            // ],
                            ai_request: (request: any, respondWith: any) =>
                              respondWith.string(() =>
                                Promise.reject(
                                  "See docs to implement AI Assistant"
                                )
                              ),
                          }}
                          //initialValue="Nhập thông tin giới thiệu về bạn! Nội dung này sẽ được hiển thị trên trang cá nhân của bạn."
                          // onEditorChange={(content: string) =>
                          //   form.setFieldsValue({ desc: content })
                          // }
                          onEditorChange={(content: string) => {
                            form.setValue("desc", content);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="grid grid-cols-2 gap-x-8 px-12 mx-12">
              <div>
                <small className="mb-6 inline-block text-sm">
                  {`2/5`} <span className="ml-6">Công việc</span>
                </small>
                <h2 className="mb-6 text-4xl leading-8 -tracking-[0.25px] font-rza">{`What are the main skills required for your work?`}</h2>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="skill"
                  render={({ field }) => (
                    <>
                      <FormItem className="mb-2">
                        <FormLabel className="block font-medium text-base leading-[22px] mb-3">
                          Lựa chọn 3-5 skills cho công việc
                        </FormLabel>
                        <FormControl>
                          <div>
                            <SkillSelect
                              onChange={(value: any) => {
                                if (value) {
                                  const convertValue = value?.map(
                                    (s: Skill) => ({
                                      skill_id: s.id,
                                      name: s.name,
                                      point: 100,
                                    })
                                  );
                                  const selectedSkills = [
                                    ...skills,
                                    ...convertValue,
                                  ]?.filter(
                                    (s, index, seft) =>
                                      index ===
                                      seft.findIndex(
                                        (t) =>
                                          t.skill_id?.toString() ===
                                          s.skill_id?.toString()
                                      )
                                  );
                                  form.setValue("skill", selectedSkills);
                                }
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <div className="flex items-center mt-3 gap-x-4 mb-6">
                        <span className="w-4 h-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            role="img"
                          >
                            <path
                              vectorEffect="non-scaling-stroke"
                              stroke="var(--icon-color, #001e00)"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              strokeWidth="1.5"
                              d="M12 21a9 9 0 100-18 9 9 0 000 18z"
                            ></path>
                            <path
                              vectorEffect="non-scaling-stroke"
                              stroke="var(--icon-color, #001e00)"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit="10"
                              strokeWidth="1.5"
                              d="M11.7 7l1.2 3.2 3.5.2-2.7 2.2.9 3.4-2.9-1.9L8.8 16l.9-3.4L7 10.4l3.4-.2L11.7 7z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                        <span className="text-[#5e6d55]">
                          Hãy chọn 3-5 skills
                        </span>
                      </div>
                    </>
                  )}
                />
                {skills.length ? (
                  <Fragment>
                    <h5 className="text-base font-medium my-3">
                      Lựa chọn Skills:{" "}
                    </h5>
                    <div className="flex gap-x-1 gap-y-2">
                      {skills.map((s) => (
                        <div
                          key={`selected-skill-${s.skill_id}`}
                          className="cursor-pointer flex items-center gap-x-1 border-2 border-solid border-transparent px-3 rounded-2xl h-8 text-sm font-medium leading-[31px] bg-[#108a00] hover:bg-[#14a800] text-white"
                          onClick={() => {
                            const removedSkill = skills.filter(
                              (currentSkill) =>
                                s.skill_id?.toString() !==
                                currentSkill.skill_id?.toString()
                            );
                            form.setValue("skill", removedSkill);
                          }}
                        >
                          {s.name}
                          <X className="w-5 h-5" />
                        </div>
                      ))}
                    </div>
                  </Fragment>
                ) : null}
                <FormField
                  control={form.control}
                  name="bids"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel className="block font-medium text-base leading-[22px] mb-3">
                        Số bids
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="grid grid-cols-2 gap-x-8 px-12 mx-12">
              <div>
                <small className="mb-6 inline-block text-sm">
                  {`3/5`} <span className="ml-6">Công việc</span>
                </small>
                <h2 className="mb-6 text-4xl leading-8 -tracking-[0.25px] font-rza">{`Hãy hãy đầu với tiêu đề và mô tả cho công việc của bạn.`}</h2>
                {/* <p className="text-sm leading-5 mb-8">
                  {`Next, write a detail description about your job. This can help freelancer easy to access your job!`}
                </p> */}
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>Nội dung công việc</FormLabel>
                      <FormControl>
                        {/* <Textarea rows={10} {...field} /> */}
                           <Editor
                          apiKey="fzcxmrnujn12zebeylcj8ku45qb2el9jt6zgbk37w0nlc36q"
                          init={{
                            plugins:
                              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                            toolbar:
                              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                            tinycomments_mode: "embedded",
                            tinycomments_author: "Author name",
                            // mergetags_list: [
                            //   { value: "First.Name", title: "First Name" },
                            //   { value: "Email", title: "Email" },
                            // ],
                            ai_request: (request: any, respondWith: any) =>
                              respondWith.string(() =>
                                Promise.reject(
                                  "See docs to implement AI Assistant"
                                )
                              ),
                          }}
                          //initialValue="Nhập thông tin giới thiệu về bạn! Nội dung này sẽ được hiển thị trên trang cá nhân của bạn."
                          // onEditorChange={(content: string) =>
                          //   form.setFieldsValue({ desc: content })
                          // }
                          onEditorChange={(content: string) => {
                            form.setValue("content", content);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{`Upload file description about your job`}</FormLabel>
                      <Upload
                        className="h-[66px]"
                        multiple={false}
                        disabled={fileThumbnail ? true : false}
                        showList={true}
                        fileList={fileThumbnail ? [fileThumbnail as File] : []}
                        draggable={true}
                        onChange={(file) => {
                          form.setValue("thumbnail", file[0]);
                        }}
                        onFileRemove={() => {
                          form.setValue("thumbnail", null);
                        }}
                      />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="grid grid-cols-2 gap-x-8 px-12 mx-12">
              <div>
                <small className="mb-6 inline-block text-sm">
                  {`4/5`} <span className="ml-6">Công việc</span>
                </small>
                <h2 className="mb-6 text-4xl leading-8 -tracking-[0.25px] font-rza">{`Điền trạng thái và ngày đến hạn cho công việc của bạn!.`}</h2>
                {/* <p className='text-sm leading-5 mb-8'>
                                    {`Điền trạng thái và ngày đến hạn cho công việc của bạn`}
                                </p> */}
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="mr-3 block">
                        Ngày đến hạn{" "}
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd-MM-yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value as any}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>Trạng thái công việc</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">Ẩn</SelectItem>
                          <SelectItem value="1">Mở ứng tuyển</SelectItem>
                          <SelectItem value="2">Đóng ứng tuyển</SelectItem>
                          <SelectItem value="3">Đang được thực hiện</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content_file"
                  render={({ field }) => {
                    return (
                      <FormItem className="mb-6">
                        <FormLabel>File liên quan</FormLabel>
                        <SingleImageUpload
                          defaultImageSrc={field.value as any}
                          onFileUpload={(file) => {
                            form.setValue("content_file", file);
                          }}
                          onDeleteImage={() => {
                            form.setValue("content_file", null);
                          }}
                        />
                      </FormItem>
                    );
                  }}
                />
                <Button
                  disabled={loading}
                  className="block bg-[#108a00] hover:bg-[#14a800]"
                  type="submit"
                >
                  {loading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin inline-flex" />
                  )}
                  Tạo công việc mới
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </section>
  );
};

export default FormCreateContainer;
