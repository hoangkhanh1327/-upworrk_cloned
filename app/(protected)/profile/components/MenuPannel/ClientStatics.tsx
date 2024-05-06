import { Select } from "antd";
import { Chart } from "react-google-charts";
const ClientStatics = () => {
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
  return (
    <div>
      <div style={{display:"block",height:"400px"}}>
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={data1}
          options={options1}
        />
      </div>
      <div style={{display:"block",height:"400px"}}>
              <Chart
          chartType="PieChart"
          data={data2}
          options={options2}
          width={"100%"}
          height={"400px"}
              />
          </div>
          <div style={{ display: "block", height: "400px" }}>
          <Select
      defaultValue="lucy"
      style={{ width: 120 }}
      options={[
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Yiminghe', label: 'yiminghe' },
        { value: 'disabled', label: 'Disabled', disabled: true },
      ]}
    />
              <Chart
          chartType="PieChart"
          data={data2}
          options={options2}
          width={"100%"}
          height={"400px"}
              />
      </div>
    </div>
  );
};
export default ClientStatics;
