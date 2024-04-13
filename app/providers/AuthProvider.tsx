"use client";

import { FC, createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ClientInfo, FreelancerInfo } from "@/app/types/authentication.types";
import BaseService from "@/app/services/BaseService";
import { loginServices } from "@/app/services/authentication.services";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "../components/ui/use-toast";
import { cn } from "@/lib/utils";

interface IAuthContext {
  isAuthenticated: boolean;
  user: ClientInfo | FreelancerInfo | null;
  login: (email: string, password: string) => void;

  logout: () => void;
  setUser?: (data: ClientInfo | FreelancerInfo) => void;
  loading: boolean;
}

interface IAuthProvider {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  loading: false,
  user: null,

  login: (email, password) => {},
  logout: () => {},
});

const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useState<ClientInfo | FreelancerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    async function loadUserFromToken() {
      const token = Cookies.get("token");
      const accountType = Cookies.get("account_type");
      if (token) {
        BaseService.defaults.headers.Authorization = `Bearer ${token}`;
        if (accountType === "client") {
          const { data } = await loginServices.getUserInfo();
          if (data) {
            setUser(data);
            if (data.is_completed_profile?.toString() === "0") {
              if (pathname === "/dang-nhap") {
                router.replace("/profile/remind");
              } else {
                router.push("/profile/remind");
              }
            }
          }
        }
        if (accountType === "freelancer") {
          const { data } = await loginServices.getFreelancerInfo();
          if (data) {
            setUser(data);
            if (data.is_completed_profile?.toString() === "0") {
              if (pathname === "/dang-nhap") {
                router.replace("/profile/remind");
              } else {
                router.push("/profile/remind");
              }
            }
          }
        }
      } else {
        if (pathname.includes("/dang-nhap")) {
        } else {
          router.push("/");
        }
      }
      setLoading(false);
    }
    loadUserFromToken();
  }, []);

  useEffect(() => {
    if (pathname === "/" && user) {
      const accountType = Cookies.get("account_type");
      router.replace(
        accountType === "client" ? "/client/dashboard" : "/freelancer/dashboard"
      );
    }
  }, [pathname, user, router]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const res = await loginServices.login({
      email,
      password,
    });
    // console.log(authenData, 'authenData')
    if (res.result === 0) {
      const authenData = res.data;
      if (res.data) {
        toast({
          title: "Thành công",
          description: "Đăng nhập thành công",
        //   type: "success",
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-white bg-green-500"
          ),
          duration: 2000,
        });
      }
      if (authenData && authenData.access_token) {
        BaseService.defaults.headers.Authorization = `Bearer ${authenData.access_token}`;
        Cookies.set("token", authenData.access_token, {
          expires: authenData.expires_in || 60,
        });
        Cookies.set("account_type", authenData.user_type, {
          expires: authenData.expires_in || 60,
        });
        if (authenData.user_type === "client") {
          const { data } = await loginServices.getUserInfo();
          setUser(data);
          if (data.is_completed_profile?.toString() === "0") {
            if (pathname === "/dang-nhap") {
              router.replace("/profile/remind");
            } else {
              router.push("/profile/remind");
            }
          } else {
            router.push("/client/dashboard");
          }
        } else if (authenData.user_type === "freelancer") {
          const { data } = await loginServices.getFreelancerInfo();
          setUser(data);

          if (data.is_completed_profile?.toString() === "0") {
            if (pathname === "/dang-nhap") {
              router.replace("/profile/remind");
            } else {
              router.push("/profile/remind");
            }
          } else {
            router.push("/freelancer/dashboard");
          }
        }
        setLoading(false);
      }
    } else if(res.result === -1) {
      toast({
        title: "Thất bại",
        description: res.message,
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-white bg-red-500"
        ),
        duration: 2000,
      });
      setLoading(false);
    } else {
        toast({
            title: "Thất bại",
            description: "Đăng nhập thất bại",
            className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 text-white bg-red-500"
            ),
            duration: 2000,
        });
        setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    delete BaseService.defaults.headers.Authorization;
    window.location.pathname = "/dang-nhap";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
