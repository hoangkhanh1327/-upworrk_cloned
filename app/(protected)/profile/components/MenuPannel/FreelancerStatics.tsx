import { Select } from "antd";
import { useState } from "react";
import { Chart } from "react-google-charts";
import RenderChart from "./RenderChart";
const FreelancerStatics = () => {
  const data1 = [
    ["Job", "Lượng người ứng tuyển", "Giá Thầu(wei)"],
    ["Công việc A", 1000, 11],
    ["Công việc B", 1170, 5000],
    ["Công việc C", 660, 100],
    ["Công việc D", 1030, 3],
  ];
  const options1 = {
    chart: {
      title: "Thống kê lượng người ứng tuyển",
      subtitle: "Số lượng người ứng tuyển trên từng công việc",
    },
  };
  const data2 = [
    ["Tình Trạng", "Số lượng"],
    ["Đang mở tuyển", 5],
    ["Đang thực hiện", 11],
    ["Đóng ứng tuyển", 2],
    ["Đã Hoàn Thành", 2],
  ];
  const options2 = {
    title: "Tình trạng các công việc của bạn",
  };
  const [param1, setParam1] = useState({});
  const dataRenderChart = [
    {
      chartType: "Bar",
      urlData: "/statics/abc",
      optionsView: (
        <div>
          <span style={{ fontWeight: 600 }}>chọn công việc</span>
          <Select
            defaultValue="lucy"
            onChange={(e) => {
              setParam1({ job_id: e });
            }}
            style={{ width: 120 }}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </div>
      ),
      dataOptionView: param1,
      options: {
        title: "Tình trạng các công việc của bạn",
      },
    },
  ];
  return (
    <div>
      {dataRenderChart.map((data: any) => {
        return (
          <>
            <RenderChart
              typeChart={data.chartType}
              optionsView={()=>data.optionsView}
              options={data.options}
              urlData={data.urlData}
              dataOptionsView={data.dataOptionsView}
            ></RenderChart>
          </>
        );
      })}
    </div>
  );
};
export default FreelancerStatics;
