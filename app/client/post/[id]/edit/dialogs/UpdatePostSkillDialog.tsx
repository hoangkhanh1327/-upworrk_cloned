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
import { useContext, useEffect, useState } from "react";
import { useToast } from "@/app/components/ui/use-toast";
import { cn } from "@/lib/utils";
import MultiSkillSelect from "@/app/components/Selects/SkillSelect";
import { Skill, SkillInProfile } from "@/app/types/common.types";
import { EditPostContext } from "../context/EditPostContext";
import { clientServices } from "@/app/services/client.services";

const UpdatePostSkillDialog = () => {
  const { onCloseModal, post, handleGetPostDetail } =
    useContext(EditPostContext);
  const { toast } = useToast();
  const [skills, setSkills] = useState<
    {
      skill_id: string | number;
      skill_name: string;
      point: string | number;
    }[]
  >([]);

  useEffect(() => {
    if (post?.skills) {
      setSkills(
        post?.skills?.map((s) => ({
          skill_id: s.skill_id,
          skill_name: s.skill_name,
          point: 100,
        }))
      );
    }
  }, [post]);

  const handleSubmit = async () => {
    try {
      if (!post) return;
      const convertParams = skills?.map((s) => ({
        skill_id: s.skill_id,
        point: 100,
      }));
      const res = await clientServices.updatePost({
        id: post.id,
        skills: convertParams as any,
      });
      if (res.data) {
        toast({
          title: "Cập nhật thành công",
          description: "Thông tin bài viết đã được cập nhật",
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
          duration: 1000,
        });
        handleGetPostDetail?.(post?.id?.toString());
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
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onCloseModal?.()}>
      <DialogContent className="max-w-[70%]">
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
                          point: 100,
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
                      className="cursor-pointer flex items-center gap-x-1 border-2 border-solid border-transparent px-3 rounded-2xl h-8 text-sm font-medium leading-[31px] bg-[#108a00] hover:bg-[#14a800] text-white"
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
            type="submit"
            className="bg-primary-color hover:bg-primary-color"
            onClick={() => handleSubmit()}
          >
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePostSkillDialog;
