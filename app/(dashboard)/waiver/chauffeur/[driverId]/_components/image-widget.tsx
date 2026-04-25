import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CloudSnow, Trash, X } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ImageWidgetProps {
  value: string;
  id?: string;
  document_type?: string;
  user_id?: string;
  ratio: "portrait" | "horizontal" | "square";
}

const ImageWidget: React.FC<ImageWidgetProps> = ({
  value,
  id,
  document_type,
  user_id,
  ratio,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFileDelete = async (e: React.MouseEvent<HTMLElement>) => {
    const data = {
      document_type: document_type,
      user_id: user_id,
    };
    try {
      await axios.put(
        `${process.env.BACKEND_URL}/api/v1/staff/reject-document/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${session.data?.accessToken}`,
          },
        }
      );
      toast.success("success");
      router.refresh();
    } catch (err) {
      toast.error("failed");
      // console.log(err);
      router.refresh();
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative h-fit w-fit rounded-md overflow-hidden">
          <div className="z-10 absolute top-0 right-0">
            <Button
              type="button"
              onClick={(e) => handleFileDelete(e)}
              variant="destructive"
              size="icon"
              className="rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Image width={140} height={140} alt="Image" src={value} />
        </div>
      </DialogTrigger>
      <DialogContent className="w-full border-0 bg-transparent p-0">
        <div
          className={cn(
            "relative overflow-clip rounded-md bg-transparent shadow-md",
            ratio == "square"
              ? "h-[50vh] w-[50vw]"
              : ratio == "portrait"
              ? "h-[calc(100vh-50px)] w-full"
              : "h-[70vh] w-[90vw]"
          )}
        >
          <Image
            src={value}
            fill
            alt={"image"}
            className="h-full w-full object-fit"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageWidget;
