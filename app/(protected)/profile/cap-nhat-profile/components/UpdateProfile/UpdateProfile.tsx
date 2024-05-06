import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  Spin,
  TreeSelect,
  Upload,
} from "antd";
import { commonServices } from "@/app/services/common.services";
import { FormProps } from "react-hook-form";
import { NotificationContext } from "@/app/providers/NotificationProvider";
import { Editor } from "@tinymce/tinymce-react";
import { PlusOutlined } from "@ant-design/icons";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";

const { RangePicker } = DatePicker;

type IAddPersonInfo = {
  setProcess: any;
  userType: string;
};

const formItemLayout = {};
const UpdateProfile = ({ setProcess, userType }: IAddPersonInfo) => {
  const [form] = Form.useForm();
  const [skilList, setSkilList] = useState<any>([]);
  const [majorList, setMajorList] = useState([]);
  const [districtsc, setDistrictsc] = useState(0);

  const [loading, setLoading] = useState(false);
  let { openNotificationWithIcon } = useContext(NotificationContext);
  const normFile = (e: any) => {
    return e?.avatar;
  };

  const getAllSkill = async () => {
    const data = await commonServices.getSkill({ page: 1, num: 9999999 });
    console.log(data);
    setSkilList(
      data.data.data.map((i: any) => {
        return { label: i.name, value: i.id };
      })
    );
  };
  const getAllMajor = async () => {
    const data = await commonServices.getMajor({ page: 1, num: 9999999 });
    console.log(data);
    setMajorList(
      data.data.map((i: any) => {
        return { label: i.title_major, value: i.id };
      })
    );
  };

  useEffect(() => {
    getAllSkill();
    getAllMajor();
  }, []);

  const onFinish: any = async (values: any) => {
    setLoading(true);
    console.log(values);

    const dataSubmit = {
      ...values,
      avatar: values.avatar.file,
      intro: values.introduce?.level?.content,
      introduce: values.introduce?.level?.content,
      skill: values.skill.toString(),
      major: values.major.toString(),
    };
    console.log("nộp", dataSubmit, userType);
    const res = await commonServices.UpdateInfo(userType, dataSubmit);
    setLoading(false);

    if (res && res.result == 0) {
      openNotificationWithIcon(
        "success",
        "Cập nhật thành công",
        "Bạn đã cập nhật thành công, vui lòng hoàn thành bước tiếp theo."
      );
      setProcess(2);
    } else {
      openNotificationWithIcon(
        "error",
        "Cập nhật thất bại",
        "Có lỗi khi cập nhật vui lòng thử lại."
      );
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Spin spinning={loading} tip="Đang cập nhật...">
        <Card>
          <CardHeader>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                fontSize: "23px",
                fontWeight: 700,
              }}
            >
              <h1>Điền Thông Tin Cho Trang Cá Nhân</h1>
            </div>
          </CardHeader>
          <CardContent>
            {" "}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                fontSize: "23px",
                marginTop: 20,
                fontWeight: 700,
              }}
            >
              {" "}
              <Form
                {...formItemLayout}
                form={form}
                variant="filled"
                style={{ width: 700 }}
                onFinish={onFinish}
              >
                {userType == "client" ? (
                  <Form.Item
                    label="Tên doanh nghiệp(nếu bạn là doanh nghiệp)"
                    name="company_name"
                  >
                    <Input />
                  </Form.Item>
                ) : (
                  <></>
                )}
                {userType != "client" ? (
                  <Form.Item
                    label="Chuyên ngành"
                    name="major"
                    rules={[
                      {
                        required: true,
                        message: "Vui chọn ít nhất 1 chuyên ngành!",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      showSearch
                      filterOption={(input, option: any) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      placeholder="chuyên ngành của bãn"
                      //           onChange={(data,item:any) => {

                      //             setProvincesc(data);
                      //             const tmp = address;
                      //             tmp.t = item['label'];
                      //             setAddress(tmp)

                      // }}
                      options={majorList}
                    />
                  </Form.Item>
                ) : (
                  <></>
                )}
                {userType !== "client" ? (
                  <Form.Item
                    label="Kỹ năng của bạn"
                    name="skill"
                    rules={[
                      {
                        required: true,
                        message: "Vui chọn ít nhất 1 kỹ năng!",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      showSearch
                      filterOption={(input, option: any) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      placeholder="Các kỹ năng bạn có"
                      //           onChange={(data,item:any) => {

                      //             setProvincesc(data);
                      //             const tmp = address;
                      //             tmp.t = item['label'];
                      //             setAddress(tmp)

                      // }}
                      options={skilList}
                    />
                  </Form.Item>
                ) : (
                  <></>
                )}
                <Form.Item
                  label="Ảnh đại diện"
                  name="avatar"
                  rules={[
                    { required: true, message: "Vui chọn ảnh đại diện!" },
                  ]}
                >
                  <Upload
                    listType="picture-card"
                    maxCount={1}
                    beforeUpload={() => false}
                  >
                    <button
                      style={{ border: 0, background: "none" }}
                      type="button"
                    >
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>chọn ảnh</div>
                    </button>
                  </Upload>
                </Form.Item>

                <Form.Item
                  label="Giới thiệu về bạn"
                  name="introduce"
                  // rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cụ thể!' }]}
                >
                  <Editor
                    apiKey="fzcxmrnujn12zebeylcj8ku45qb2el9jt6zgbk37w0nlc36q"
                    init={{
                      plugins:
                        "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                      toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                      tinycomments_mode: "embedded",
                      tinycomments_author: "Author name",
                      mergetags_list: [
                        { value: "First.Name", title: "First Name" },
                        { value: "Email", title: "Email" },
                      ],
                      ai_request: (request: any, respondWith: any) =>
                        respondWith.string(() =>
                          Promise.reject("See docs to implement AI Assistant")
                        ),
                    }}
                    //initialValue="Nhập thông tin giới thiệu về bạn! Nội dung này sẽ được hiển thị trên trang cá nhân của bạn."
                    onEditorChange={(content: string) =>
                      form.setFieldsValue({ introduce: content })
                    }
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                  <Button
                    className="rounded-[16rem] bg-primary-color hover:bg-primary-color/80 text-white"
                    htmlType="submit"
                  >
                    Cập Nhật
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </CardContent>
        </Card>
      </Spin>
    </div>
  );
};
export default UpdateProfile;
