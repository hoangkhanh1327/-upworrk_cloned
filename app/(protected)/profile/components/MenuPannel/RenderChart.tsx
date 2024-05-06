import { commonServices } from "@/app/services/common.services";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
const RenderChart = ({ typeChart, optionsView, options, urlData, dataOptionsView }:any) => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const result = await commonServices.getDataChart(urlData, dataOptionsView);
        setData(result);
    }
    useEffect(() => { 
        fetchData();
    },[])
  return (
    <div>
        <div style={{ display: "block", height: "400px" }}>
           {optionsView}
        <Chart
          chartType={typeChart}
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};
export default RenderChart;
