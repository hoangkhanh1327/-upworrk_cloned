"use client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/providers/AuthProvider";
// import Link from "next/link";




const PolicyViews: React.FC<any> = ({ setDisabledPolicy }) => {
  const [loading, setLoading] = useState(false);
  const user = useContext(AuthContext);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
    const [accepted, setAccepted] = useState(false);

    // Kiểm tra xem người dùng đã scroll đến cuối cùng của trang hay chưa
    useEffect(() => {
        const handleScroll = () => {
            
            const element:any = document.getElementById('policy-f');
            console.log("==>", (element?.scrollHeight - element?.scrollTop),element?.clientHeight);
            const isBottom = (element?.scrollHeight - element?.scrollTop) >= element?.clientHeight;
            setDisabledPolicy(!isBottom);
            if (isBottom) element?.removeEventListener('scroll', handleScroll);
                
        };

        const policyf = document.getElementById('policy-f');
        policyf?.addEventListener('scroll', handleScroll);
        
        return () => {
            policyf?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // useEffect(() => {
    //     setDisabledPolicy(scrolledToBottom)
    // },[scrolledToBottom])
  return (
      <div>
          <div id="policy-f" className="contract-container" style={{ maxHeight: '200px',marginTop:'15px',marginBottom:'5px', overflowY: 'scroll' }}>
          <h2 style={{ marginBottom: '10px', textAlign:'center',fontWeight: 'bold' }}>ĐIỀU KHOẢN HỢP ĐỒNG</h2>
            <p>
                <span style={{ fontWeight: 'bold' }}>1. Phạm vi Công Việc</span><br />
                <span style={{ paddingLeft: '20px' }}>1.1. Freelancer đồng ý cung cấp các dịch vụ như đã thỏa thuận giữa hai bên. Công việc cụ thể bao gồm (liệt kê các công việc cụ thể mà freelancer sẽ thực hiện).</span><br />
                <span style={{ paddingLeft: '20px' }}>1.2. Freelancer cam kết hoàn thành công việc đúng hạn và đáp ứng đầy đủ các yêu cầu được mô tả trong tài liệu yêu cầu hoặc hợp đồng.</span><br />
                <span style={{ fontWeight: 'bold' }}>2. Thanh Toán và Giá Cả</span><br />
                <span style={{ paddingLeft: '20px' }}>2.1. Giá cả và phương thức thanh toán đã được thỏa thuận giữa hai bên. Freelancer cam kết rằng các dịch vụ đã thực hiện sẽ được thanh toán theo thỏa thuận.</span><br />
                <span style={{ paddingLeft: '20px' }}>2.2. Thời điểm thanh toán và phương thức thanh toán cụ thể sẽ được xác định trong hợp đồng hoặc thông qua các thỏa thuận bổ sung.</span><br />
                <span style={{ fontWeight: 'bold' }}>3. Bản Quyền và Sở Hữu Trí Tuệ</span><br />
                <span style={{ paddingLeft: '20px' }}>3.1. Tất cả các quyền sở hữu trí tuệ đối với sản phẩm cuối cùng của dự án sẽ thuộc về Người Thuê hoặc bên được ủy quyền bởi Người Thuê.</span><br />
                <span style={{ paddingLeft: '20px' }}>3.2. Freelancer cam kết rằng tất cả các công việc và nội dung tạo ra trong quá trình dự án không vi phạm bất kỳ quyền sở hữu trí tuệ nào của bên thứ ba.</span><br />
                <span style={{ fontWeight: 'bold' }}>4. Bảo Mật và Bảo Vệ Thông Tin</span><br />
                <span style={{ paddingLeft: '20px' }}>4.1. Cả hai bên đều cam kết giữ bí mật mọi thông tin liên quan đến dự án và không tiết lộ thông tin này cho bất kỳ bên thứ ba nào mà không có sự đồng ý trước bằng văn bản của bên kia.</span><br />
                <span style={{ paddingLeft: '20px' }}>4.2. Freelancer cam kết rằng mọi thông tin của Người Thuê mà anh ta được tiết lộ trong quá trình dự án sẽ được giữ bí mật và chỉ được sử dụng cho mục đích của dự án.</span><br />
                <span style={{ fontWeight: 'bold' }}>5. Chấm Dứt Hợp Đồng</span><br />
                <span style={{ paddingLeft: '20px' }}>5.1. Hợp đồng này có thể được chấm dứt bởi bất kỳ bên nào thông qua thông báo bằng văn bản cho bên kia với ít nhất (số ngày) ngày thông báo trước.</span><br />
                <span style={{ paddingLeft: '20px' }}>5.2. Trong trường hợp hợp đồng bị chấm dứt trước khi công việc hoàn thành, Freelancer sẽ chỉ nhận được thanh toán cho phần của công việc đã hoàn thành và được chấp nhận.</span><br />
                <span style={{ fontWeight: 'bold' }}>6. Luật Pháp Áp Dụng và Giải Quyết Tranh Chấp</span><br />
                <span style={{ paddingLeft: '20px' }}>6.1. Hợp đồng này sẽ được hiểu và thực thi theo luật pháp của (quốc gia/jurisdiction).</span><br />
                <span style={{ paddingLeft: '20px' }}>6.2. Bất kỳ tranh chấp nào phát sinh từ hoặc liên quan đến hợp đồng này sẽ được giải quyết thông qua trọng tài hoặc qua tòa án theo quy định của (quốc gia/jurisdiction).</span><br />
                <span style={{ fontWeight: 'bold' }}>7. Hiệu Lực và Sửa Đổi</span><br />
                <span style={{ paddingLeft: '20px' }}>7.1. Hợp đồng này có hiệu lực kể từ ngày ký và sẽ được áp dụng cho tất cả các dự án được thực hiện giữa hai bên.</span><br />
                <span style={{ paddingLeft: '20px' }}>7.2. Bất kỳ sửa đổi hoặc thay đổi nào đối với hợp đồng này phải được thực hiện bằng văn bản và được ký bởi cả hai bên.</span><br />
            </p>

            
        </div>
      </div>
  );
};

export default PolicyViews;
