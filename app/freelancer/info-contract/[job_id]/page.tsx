"use client";
import AppThirdwebProvider from "@/app/providers/ThirdwebProvider";
import { useStateContext } from "@/context";
import { useContract } from "@thirdweb-dev/react";
import { useContext, useEffect, useState } from "react";
import Packer from "docxtemplater";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import Document from "react-doc-viewer";
import SignaturePad from "./SignaturePad";
import ImageModule from "docxtemplater-image-module";
import { title } from "process";
import { loginServices } from "@/app/services/authentication.services";
import { commonServices } from "@/app/services/common.services";
import FreelancerInfo from "@/app/client/show-freelancer-info/[freelancer_id]/page";
import { Modal, Button } from "antd";
interface IContractDetail {
  params: {
    job_id: string;
  };
}

const ContractDetail: React.FC<IContractDetail> = ({ params }) => {
  console.log("id", params.job_id);
  const contractId = process.env.ID_CONTRACT;
  const [contractInfo, setContractInfo] = useState({
    contract_id: -1,
    title: "",
    description: "",
    signature_freelancer: "",
    signature_client: "",
    bids: "0",
    status: 0,
    address_client: 0,
    address_freelancer: 0,
  });
  const { contract } = useContract(contractId);
  const [contractFile, setContractFile] = useState(null);
  const [imgSignature, setImgSignature] = useState(null);
  const getDataContract = async () => {
    try {
      const data = await contract?.call("getJobInfoByCurrentJobId", [
        params.job_id,
      ]);
      console.log("DATA", data);
      if (data) {
        setContractInfo({
          contract_id: data[0].toNumber(),
          title: data[1],
          description: data[2],
          signature_freelancer: data[3],
          signature_client: data[4],
          bids: data[5].toNumber(),
          status: data[6],
          address_client: data[7],
          address_freelancer: data[8],
        });
      }
    } catch (error) {
      ///
      console.log(error);
    }
  };

  /////Các hàm MODAL/////
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const handleOk = () => {
    ///sử lí lấy chữ kí
  };
  const handleCancel = () => {
    setOpen(false);
  };
  ///////////////////////
  const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
  const validBase64 =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  const base64Parser = (dataURL : string) => {
    if (typeof dataURL !== "string" || !base64Regex.test(dataURL)) {
      return false;
    }

    const stringBase64 = dataURL.replace(base64Regex, "");

    if (!validBase64.test(stringBase64)) {
      throw new Error(
        "Error parsing base64 data, your data contains invalid characters"
      );
    }

    // For nodejs, return a Buffer
    if (typeof Buffer !== "undefined" && Buffer.from) {
      return Buffer.from(stringBase64, "base64");
    }

    // For browsers, return a string (of binary content) :
    const binaryString = window.atob(stringBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes.buffer;
  };

  console.log("contract information", contractInfo);
  useEffect(() => {
    getDataContract();
  }, [contract]);

  ///LOad Template
  const loadFile = (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
      var data = new Uint8Array(xhr.response);
      var arr = new Array();
      for (var i = 0; i !== data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      callback(arr.join(""));
    };
    xhr.send();
  };
  // Fill data into the template and save as a Word file
  const generateDocument = () => {
    // Đường dẫn tới tệp mẫu DOCX
    const templateFilePath = "https://timviecits.id.vn/storage/mauhd.docx";

    // Load nội dung của tệp mẫu
    const xhr = new XMLHttpRequest();
    xhr.open("GET", templateFilePath, true);
    xhr.responseType = "arraybuffer";
    const imageData = {
      base64:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIJBywfp3IOswAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAkUlEQVQY052PMQqDQBREZ1f/d1kUm3SxkeAF/FdIjpOcw2vpKcRWCwsRPMFPsaIQSIoMr5pXDGNUFd9j8TOn7kRW71fvO5HTq6qqtnWtzh20IqE3YXtL0zyKwAROQLQ5l/c9gHjfKK6wMZjADE6s49Dver4/smEAc2CuqgwAYI5jU9NcxhHEy60sni986H9+vwG1yDHfK1jitgAAAABJRU5ErkJggg==", // Dữ liệu base64 của hình ảnh
      width: 200, // Độ rộng của hình ảnh (đơn vị pixel)
      height: 100, // Độ cao của hình ảnh (đơn vị pixel)
    };
    // Chuyển đổi hình ảnh base64 thành ArrayBuffer
    const base64ToArrayBuffer = (base64) => {
      const binaryString = window.atob(base64.split(",")[1]);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    };
    xhr.onload = function () {
      const data = new Uint8Array(xhr.response);
      const zip = new PizZip(data);
      let doc;
      try {
        doc = new Docxtemplater(zip);
        console.log("doc", doc);
      } catch (error) {
        console.log("erroooo_>", error);
        return;
      }

      const dateObject = new Date(job.nominee.updated_at);

      const year = dateObject.getFullYear();
      // Lấy tháng (trả về giá trị từ 0 - 11, với 0 là tháng 1)
      const month = dateObject.getMonth() + 1;
      // Lấy ngày trong tháng
      const day = dateObject.getDate();
      // Thiết lập dữ liệu cho mẫu
      console.log("jo", client);

      doc.setData({
        ngay: day,
        thang: month,
        nam: year,
        dia_diem: "Trang Web Tìm Việc IT Hot Nhất Việt Nam",
        company_name: client.company_name ?? "",
        client_address: client.address ?? "",
        client_numphone: client.phone_num ?? "",
        client_email: client.email ?? "",
        client_name: client.first_name + client.last_name ?? "",
        description: contractInfo.description ?? "",
        freelancer_address: freelancer.address ?? "",
        freelancer_email: freelancer.email ?? "",
        freelancer_numphone: freelancer.phone_num ?? "",
        freelancer_dob: freelancer.date_of_birth ?? "",
        freelancer_name: freelancer.first_name + freelancer.last_name ?? "",

        image: base64ToArrayBuffer(imageData.base64),
        // Thêm các dữ liệu khác tương ứng với mẫu của bạn
      });

      try {
        // Render dữ liệu vào tệp mẫu
        doc.render();
      } catch (error) {
        console.log("rendr", error);
        return;
      }

      // Lấy nội dung đã render
      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      console.log("==>", out);
      setContractFile(URL.createObjectURL(out));
    };
    xhr.send(null);
  };

  useEffect(() => {
    if (contractFile !== null) {
      window.open(contractFile, "_blank");
    }
  }, [contractFile]);
  const [client, setClient] = useState(null);
  const [freelancer, setFreelancer] = useState(null);
  const [job, setJob] = useState(null);

  const setInfoUserContract = async () => {
    try {
      const infoJob = (await commonServices.getInfoJob(67)).data;
      setJob(infoJob);
      console.log("info job", infoJob);

      const infoClient = (
        await commonServices.getInfoUser({
          id: infoJob.client_id,
          type: "client",
        })
      ).data.base_info;
      setClient(infoClient);
      const freeLancerInfo = (
        await commonServices.getInfoUser({
          id: infoJob.nominee.freelancer_id,
          type: "freelancer",
        })
      ).data.base_info;
      setFreelancer(freeLancerInfo);
      console.log(freeLancerInfo);
    } catch (error) {
      console.log("có lỗi khi thực hiện dữ liệu chưa đồng bộ");
    }

    // c
  };
  useEffect(() => {
    if (contractInfo.contract_id >= 0) {
      setInfoUserContract();
      //Bắt đầu gọi lấy thông tin Freelancer
      commonServices.getInfoUser;
      //Bắt đầu gọi lấy thông tin Client
    }
  }, [contractInfo]);

  return (
    <>
      <div
        style={{ display: "flex", height: "1200px", flexDirection: "column" }}
      >
        <div
          style={{
            width: "100%",
            height: 100,
            backgroundImage:
              'url("https://t4.ftcdn.net/jpg/02/32/92/55/360_F_232925587_st4gM8b3TJHtjjddCIUNyVyFJmZqMmn4.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          <span
            style={{
              marginTop: 35,
              color: "yellow",
              fontSize: "35px",
              fontFamily: "roboto",
              fontWeight: 800,
            }}
          >
            Thông Tin Hợp Đồng{" "}
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: 100,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 1000,
              height: 1000,
              backgroundImage:
                'url("https://img.freepik.com/free-photo/watercolor-paper-texture_1194-5417.jpg")',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              padding: "70px",
              fontFamily: "roboto",
              fontSize: 25,
            }}
          >
            <p className=" mb-4">
              <span className="font-semibold">Tên hợp đồng:</span>
              {" " + contractInfo.title}
            </p>
            <p className=" mb-4">
              <span className="font-semibold">Điều khoản hợp đồng:</span>
              {" " + contractInfo.description}
            </p>
            <p className=" mb-4">
              <span className="font-semibold">Lương:</span>
              {" " + contractInfo.bids}
            </p>
            <p className=" mb-4">
              <span className="font-semibold">Trạng thái:</span>
              <span
                style={{ color: contractInfo.status > 0 ? "green" : "red" }}
              >
                {" "}
                {contractInfo.status > 0 ? "đã kí" : "đang chờ ký"}{" "}
              </span>
            </p>
            <p className=" mb-4">
              <div className="font-semibold">Thông tin người thuê:</div>
              <p className="ml-9 mb-4">
                <span className="font-semibold">Họ tên: </span>
                {client ? client.first_name + client.last_name : ""}
              </p>
              <p className="ml-9 mb-4">
                <span className="font-semibold">Số Điện Thoại: </span>
                {client ? client.phone_num : ""}
              </p>
              <p className="ml-9 mb-4">
                <span className="font-semibold">Email: </span>
                {client ? client.email : ""}
              </p>
              <p className="ml-9 mb-4">
                <span className="font-semibold">Địa chỉ: </span>
                {client ? client.address : ""}
              </p>
              <p className="ml-9 mb-4">
                <span className="font-semibold">Tình trạng xác thực:</span>
                {client ? (
                  <span
                    style={{
                      color: client.is_completed_profile > 1 ? "green" : "red",
                    }}
                  >
                    {" "}
                    {client.is_completed_profile > 1
                      ? "đã xác thực"
                      : "chưa xác thực"}{" "}
                  </span>
                ) : (
                  ""
                )}
              </p>
            </p>
            <p className=" mb-4">
              <span className="font-semibold">Thông tin người nhận việc:</span>
              <p className="ml-9 mb-4">
                <span className="font-semibold">Họ tên: </span>
                {freelancer ? freelancer.first_name + freelancer.last_name : ""}
              </p>
              <p className="ml-9 mb-4">
                <span className="font-semibold">Số Điện Thoại: </span>
                {freelancer ? freelancer.phone_num : ""}
              </p>
              <p className="ml-9 mb-4">
                <span className="font-semibold">Email: </span>
                {freelancer ? freelancer.email : ""}
              </p>
              <p className="ml-9 mb-4">
                <span className="font-semibold">Địa chỉ: </span>
                {freelancer ? freelancer.address : ""}
              </p>
              <p className="ml-9 mb-4">
                <span className="font-semibold">Tình trạng xác thực:</span>
                {freelancer ? (
                  <span
                    style={{
                      color:
                        freelancer.is_completed_profile > 1 ? "green" : "red",
                    }}
                  >
                    {" "}
                    {freelancer.is_completed_profile > 1
                      ? "đã xác thực"
                      : "chưa xác thực"}{" "}
                  </span>
                ) : (
                  ""
                )}
              </p>
            </p>
            {/* {contractFile !== null ? (
        <Document documents={[{ uri: contractFile }]} />
      ) : (
        "" 
            )}*/}
            <div style={{ display: "flex", justifyContent: "end" }}>
              {contractInfo && job && client && freelancer ? (
                <Button
                  onClick={() => {
                    generateDocument();
                  }}
                >
                  Xuất Hợp đồng
                </Button>
              ) : (
                ""
              )}
              {contractInfo && contractInfo.status <= 0 ? (
                <Button
                  style={{ backgroundColor: "blue", marginLeft: 10 }}
                  type="primary"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Ký Hợp Đồng
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Hãy Ký Khi Đã Đọc Kỹ Điều Khoản Hợp Đồng"
        open={open}
        onCancel={hideModal}
        footer={[]}
      >
        <SignaturePad
          setImg={setImgSignature}
          closePopup={setOpen}
        ></SignaturePad>
      </Modal>
    </>
  );
};

export default ContractDetail;
