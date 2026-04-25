import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CloudSnow, Trash, X } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ImageWidgetProps {
  value: string;
  id?: string;
  document_type?: string;
  user_id?: string;
}

const ImageWidget: React.FC<ImageWidgetProps> = ({
  value,
  id,
  document_type,
  user_id,
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
      toast.success("success")
      router.refresh();
    } catch (err) {
      // console.log(err);
      toast.error("failed")
      router.refresh();
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative w-[140px] h-[140px] rounded-md overflow-hidden">
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
      <Image
        width={140}
        height={140}
        className="aspect-square"
        alt="Image"
        src={value}
      />
    </div>
  );
};

export default ImageWidget;
