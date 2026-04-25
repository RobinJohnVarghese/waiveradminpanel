import Link from "next/link";
import Image from "next/image";
import { UserAccountNav } from "./user-accont-nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="p-4 border-b h-14 flex justify-end items-center bg-[#001529] shadow-sm">
      <Image
        src="/images/assets/waiver-logo.png"
        alt="Waiver"
        height={40}
        width={120}
        className="object-contain hidden lg:block"
      />
      <div className="flex gap-x-2 ml-auto">
        <UserAccountNav
          user={{
            name: session?.user?.name,
            email: session?.user?.email,
          }}
        />
      </div>
    </div>
  );
};
