import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { User } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

interface ILoginForm {
  setUsername: (data: string) => void;
}

const LoginForm: React.FC<ILoginForm> = ({ setUsername }) => {
  const userNameRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="px-12 py-4 mt-8 overflow-x-hidden min-w-[500px] max-w-[570px] mx-auto border border-solid border-[#d5e0d5] rounded-2xl">
      <div className="px-8">
        <h4 className="text-[28px] mt-6 mb-6 leading-8 text-center font-semibold">
          Đăng nhập với ITWork
        </h4>

        <div>
          <div className="relative border-2 border-solid border-[#e4ebe4] rounded-lg mb-6">
            <User className="w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2" />
            <Input
              autoFocus
              ref={userNameRef}
              type="text"
              placeholder="Tên đăng nhập"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.keyCode === 13) {
                  userNameRef.current?.value &&
                    setUsername(userNameRef.current?.value);
                }
              }}
              className="w-full !border-0 focus-visible:!ring-transparent focus-visible:!ring-offset-0 pl-12 pr-4 !py-2 "
            />
          </div>

          <Button
            onClick={() => {
              userNameRef.current?.value &&
                setUsername(userNameRef.current?.value);
            }}
            className="block w-full bg-[#108a00] hover:bg-[#108a00]/80  rounded-[10rem] "
          >
            Tiếp tục với tên đăng nhập
          </Button>
        </div>

        <p className="w-full text-center border-b border-solid border-[#e0e0e0] leading-[.1em] font-light my-8">
          <span className="px-2.5 bg-white text-[#606060]">or</span>`
        </p>

        <div>
          <Button className='relative w-full border-transparent bg-[#4285f4] hover:bg-[#4285f4] text-white text-center h-10 p-0 flex items-center after:content-[""] after:w-[38px] after:h-[38px] before:content-[""] before:absolute before:bg-google before:bg-center before:bg-no-repeat before:w-[38px] before:h-[38px] before:rounded-full before:left-0.5 rounded-[10rem]'>
            <span className="text-base w-full">Tiếp tục với Google</span>
          </Button>
        </div>

        <div className="mb-10 pb-10 pt-3"></div>

        <div className='w-full bg-white text-[#5e6d55] overflow-hidden text-center font-light my-3 pb-3 before:relative before:right-2.5 before:-ml-[50%] before:bg-[#8f8e8e] before:content-[""] before:inline-block before:h-[1px] before:align-middle before:w-1/2 after:content-[""] after:left-[10px] after:-mr-[50%] after:bg-[#8f8e8e] after:inline-block after:h-[1px] after:relative after:align-middle after:w-1/2'>
          {`Bạn chưa có tài khoản IT Work?`}
        </div>

        <div className="text-center">
          <Link
            href={`/dang-ky`}
            className="text-[#108a00] hover:text-[#108a00] md:w-[218px] md:min-w-[218px] md:max-w-none text-center border-2 border-solid border-[#108a00] hover:bg-[#f7faf7] inline-flex items-center justify-center rounded-[10rem] text-base leading-10 mx-auto px-8 mt-3 mb-6 "
          >
            Đăng kí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
