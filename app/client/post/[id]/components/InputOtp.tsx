"use client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/providers/AuthProvider";
import { Button, notification } from "antd";
import { commonServices } from "@/app/services/common.services";
import Pusher from "pusher-js";
import Cookies from "js-cookie";
// import Link from "next/link";

type NotificationType = "success" | "info" | "warning" | "error";

const InputOtp = ({ setVerify }:any) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, msg: string) => {
    api[type]({
      message: "Thông Báo",
      description: msg,
    });
  };
    const [otp, setOtp] = useState<any>(["", "", "", ""]);
    const [trueOtp, setTrueOtp] = useState<{otp_code: string,expired:number}>({otp_code: '',expired:0});

  const inputStyle:any = {
    width: "50px",
    height: "50px",
    marginRight: "10px",
    textAlign: "center",
    fontSize: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    zIndex: 2000,
  };

  const lastInputStyle:any = {
    marginRight: "0",
  };

  const otpContainerStyle:any = {
    display: "flex",
      zIndex: 2000,
    margin: "50",
  };

  const handleChange = (index:number, value:string) => {
      const newOtp = [...otp];
      if (value.toString().length <=1) {
          newOtp[index] = value;
          setOtp(newOtp);
      }
  };

  const handleKeyDown = (e:any, index:number) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      // Nếu người dùng nhấn nút Backspace khi ô trống, chuyển con trỏ về ô trước đó
      document.getElementById(`otp_${index - 1}`)?.focus();
    } else if (index < 3 && otp[index] !== "" && otp[index + 1] === "") {
      // Nếu người dùng đã nhập số vào ô hiện tại và ô tiếp theo trống, chuyển con trỏ sang ô tiếp theo
      document.getElementById(`otp_${index + 1}`)?.focus();
    }
  };
  useEffect(() => {
      document.getElementById(`otp_0`)?.focus();
      commonServices.sendOtp();
    openNotificationWithIcon(
      "success",
      "Hệ thống đã gởi otp về mail của bạn, bạn vui lòng check mail."
    );
  }, []);

  const sendOtp = () => {
    commonServices.sendOtp();
    openNotificationWithIcon(
      "success",
      "Đã gởi otp về mail của bạn, bạn vui lòng check mail."
    );
  };
  const user = useContext(AuthContext);
  useEffect(() => {
    if (user.isAuthenticated) {
      handelPusher();
    }
  }, [user.isAuthenticated]);

  const handelPusher = async () => {
    const pusher = new Pusher("ef55c815a7f46a4c8f1a", {
      cluster: "ap1",
    });
    const user_type = Cookies.get("account_type");
    const user_id = user.user?.id;
    const channel = pusher.subscribe(`otp_code.${user_type}.${user_id}`);
    //Truyền dô mỗi tài khoản sẽ có 1 kênh lắng nghe
    console.log(`notify.${user_type}.${user_id}`);

    channel.bind("otp.new", function (data: {otp_code: string,expired:number}) {
      setTrueOtp(data);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
    };
    
    useEffect(() => {
      if (otp.join("").replace(/\s+/g, '').length == 4) {
        const currentTime = new Date().getTime()/1000;
        console.log(currentTime,trueOtp.expired);
        
            if (otp.join("") == trueOtp.otp_code&&currentTime<=trueOtp.expired) {
                openNotificationWithIcon(
                    "success",
                    "Xác thực thành công."
                );
                setVerify(true);
            } else {
              if (otp.join("") == trueOtp.otp_code&&currentTime > trueOtp.expired)
                  openNotificationWithIcon(
                    "error",
                    "Mã xác thực hết hạn sử dụng. Vui lòng chọn gởi lại OTP để nhận mã mới."
                );
              else
                openNotificationWithIcon(
                    "error",
                    "Mã xác thực không hợp lệ."
                  );
            }
        }
    },[otp])
  return (
    <div style={otpContainerStyle}>
      {contextHolder}
      {otp.map((value:string, index:number) => (
        <input
          key={index}
          id={`otp_${index}`}
          type="text"
          value={value}
          //maxLength="1"
          style={{ ...inputStyle, ...(index === 3 ? lastInputStyle : {}) }}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
      <Button style={{marginTop:9, marginLeft:20}} onClick={sendOtp}>Gởi lại OTP</Button>
    </div>
  );
};

export default InputOtp;
