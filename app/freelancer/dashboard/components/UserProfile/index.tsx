import React from "react";

const UserProfile = () => {
  return (
    <div
      className="span-3  ml-[100px] d-none d-lg-block the-sidebar flex flex-col justify-between h-full sticky top-0"
      style={{ background: "#f9f9f9;", borderRadius: "10px" }}
    >
      <div className="p-4">
        <div className="flex items-center justify-center">
          <div className="flex-3">
            <a>
              <img
                className="w-12 h-12 rounded-full"
                src="https://www.upwork.com/profile-portraits/c1WjIAHWPpCJFA-G_3trnlXAR-AShN84GTHJ59Ll-tte4aKLFALVnt39kYKf82JnWc"
              />
            </a>
          </div>
          <div className="flex-1">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-sm font-medium text-gray-500">aaaaa</p>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <a
            href="/"
            className=" font-bold"
            style={{
              color: "#108a00",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Chỉnh sửa profile
          </a>
        </div>
      </div>
     
    </div>
  );
};

export default UserProfile;
