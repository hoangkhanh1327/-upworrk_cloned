import { Button } from "@/app/components/ui/button";
import { NotificationContext } from "@/app/providers/NotificationProvider";
import { commonServices } from "@/app/services/common.services";
import { Input, Modal, Rate, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useContext, useEffect, useState } from "react";

interface IProps {
  user_id: string;
  job_id: string;
}

const FeeBack: React.FC<IProps> = ({ user_id, job_id }) => {
  const desc = ["quá tệ", "tệ", "bình thường", "tốt", "tuyệt vời"];
  const [loading, setLoading] = useState(false);
  const [valueRate, setValueRate] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openNotificationWithIcon } = useContext(NotificationContext);
  const [comments, setComments] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    setLoading(true);
    const result = await commonServices.feedback({
      user_id: user_id,
      job_id: job_id,
      rate: valueRate,
      comment: comments&&'',
    });
    console.log("kết quả");

    setLoading(false);
    if (result && result.result == 0) {
      openNotificationWithIcon(
        "success",
        "Thành công",
        "Thao tác thực hiện thành công"
      );
      return;
    }

    if (result && result.result != 0) {
      openNotificationWithIcon("error", "Thất Bại", result.message);
    } else {
      openNotificationWithIcon("error", "Thất Bại", "Có lỗi khi thực hiện.");
    }
  };
  const [recommend, setRecommend] = useState("");
  useEffect(() => {
    const reText:any = {
      "0": "Tôi thực sự không hài lòng",
      "0.5": "Tôi không hài lòng",
      "1": "Thực sự quá tệ",
      "1.5": "Quá tệ",
      "2": "Rất không hài lòng",
      "2.5": "Không hài lòng lắm",
      "3": "Cần cải thiện",
      "3.5": "Vừa phải",
      "4": "Tốt",
      "4.5": "Rất tốt",
      "5": "Tuyệt vời",
  };

     setComments(reText[valueRate.toString()]);

  }, [valueRate]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        width: "100%",
        // height: "100%",
        display: "flex",
        justifyItems: "center",
        borderRadius: "25px",
      }}
    >
      {loading ? <Spin fullscreen></Spin> : <></>}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          borderTopLeftRadius: "25px",
          borderBottomLeftRadius: "25px",
        }}
      >
        <div
          style={{
            width: "30%",
            background: "#e8e8dba1",
            display: "flex",
            justifyContent: "center",
            borderTopLeftRadius: "25px",
            borderBottomLeftRadius: "25px",
          }}
        >
          <div>
            {/* <h1 style={{textAlign:'center',padding:20, fontSize:25, fontWeight:600}}>Công việc đã hoàn thành vui lòng feedback</h1> */}
            <img
              width={"100%"}
              style={{ padding: "59px" }}
              src="https://timviecits.id.vn/storage/donejob.gif"
            ></img>
          </div>
        </div>
        <div
          style={{
            width: "30%",
            background: "#e8e8dba1",
            paddingTop: 70,
            paddingBottom: 70,
            paddingLeft: 30,
            paddingRight: 30,
            borderTopRightRadius: "25px",
            borderBottomRightRadius: "25px",
          }}
        >
          <h1 style={{ textAlign: "center", fontSize: 20 }}>
            Bạn có trải nghiệm như nào đối với Freelancer trong công việc này.
          </h1>
          <div
            style={{ display: "flex", justifyContent: "center", padding: 50 }}
          >
            <Rate
              onChange={setValueRate}
              value={valueRate}
              style={{ fontSize: 35 }}
              allowHalf
              tooltips={desc}
            />
          </div>
          <TextArea
            onChange={(e: any) => {
              console.log(e);
              setComments(e.target.innerText);
            }}
            placeholder="Vui lòng nhập cảm nhận của bạn...."
            style={{ height: 100, marginBottom: "20" }}
          />
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => {
                showModal();
              }}
            >
              Gởi Đánh giá
            </Button>
          </div>
        </div>
      </div>
      <Modal
        title="Xác nhận nội dung đánh giá"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Điểm số: <b>{valueRate}</b>
        </p>
        <p>
          Nội dung: <b>{comments}</b>
        </p>
      </Modal>
    </div>
  );
};

export default FeeBack;
