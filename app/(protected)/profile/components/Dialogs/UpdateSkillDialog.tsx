import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { Fragment, useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { AuthContext } from "@/app/providers/AuthProvider";
import { loginServices } from "@/app/services/authentication.services";
import { useToast } from "@/app/components/ui/use-toast";
import { cn } from "@/lib/utils";
import MultiSkillSelect from "@/app/components/Selects/SkillSelect";
import { FreelancerInfo } from "@/app/types/authentication.types";
import { Skill, SkillInProfile } from "@/app/types/common.types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { set } from "lodash";

const UpdateSkillDialog = () => {
  const [loading, setLoading] = useState(false);
  const { onCloseModal } = useContext(ProfileContext);
  const { user, setUser } = useContext(AuthContext);
  const { toast } = useToast();
  const [skills, setSkills] = useState<SkillInProfile[]>([]);

  useEffect(() => {
    if ((user as FreelancerInfo)?.skills) {
      setSkills((user as FreelancerInfo)?.skills);
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const convertParams = skills?.map((s) => ({
        skill_id: s.skill_id,
        point: 100,
      }));
      const res = await loginServices.updateFreelancerInfo({
        skills: convertParams as any,
      });
      if (res.data) {
        toast({
          title: "Cập nhật thành công",
          description: "Thông tin tài khoản đã được cập nhật",
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
          duration: 1000,
        });
        setUser?.(res.data);
        onCloseModal?.();
      }
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Đã có lỗi xảy ra",
        description: (error as Error)?.message,
        variant: "destructive",
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onCloseModal?.()}>
      <DialogContent className="max-w-[50%]">
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin</DialogTitle>
          <DialogDescription>
            {`Thay đổi thông tin tài khoản.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Kỹ năng</Label>
            <div className="col-span-3">
              <MultiSkillSelect
                onChange={(value: any) => {
                  if (value) {
                    const convertValue = value?.map((s: Skill) => ({
                      skill_id: s.id,
                      name: s.name,
                      point: 100,
                    }));
                    const selectedSkills = [...skills, ...convertValue]
                      ?.filter(
                        (s, index, seft) =>
                          index ===
                          seft.findIndex(
                            (t) =>
                              t.skill_id?.toString() === s.skill_id?.toString()
                          )
                      )
                      ?.map((i) => {
                        return {
                          skill_name: i.name || i.skill_name,
                          skill_id: i.skill_id,
                        };
                      });
                    setSkills(selectedSkills);
                  }
                }}
              />
            </div>
            <Label className="my-3 text-right">Kỹ năng đã chọn: </Label>
            <div className="col-span-3">
              {skills.length ? (
                <div className="flex gap-x-1 gap-y-2">
                  {skills.map((s) => (
                    <div
                      key={`selected-skill-${s.skill_id}`}
                      className="cursor-pointer flex items-center gap-x-1 border-solid 
                      border-transparent px-3 rounded-2xl h-8 text-sm font-medium 
                      leading-[31px] bg-[#108a00] hover:bg-[#14a800] text-white  !border-1 focus-visible:!ring-transparent focus-visible:!ring-offset-0"
                    >
                      {s.skill_name}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            className=" bg-primary-color hover:bg-primary-color hover:text-white"
            onClick={() => onCloseModal?.()}
          >
            Đóng
          </Button>
          <Button
            disabled={loading}
            type="submit"
            className="bg-primary-color hover:bg-primary-color"
            onClick={() => handleSubmit()}
          >
            {loading && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin inline-flex" />
            )}
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSkillDialog;
