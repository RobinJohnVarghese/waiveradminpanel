import { UserLoginForm } from "@/components/user-login-form";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

//Todo: use buttonvariants

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-row items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-left">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login
          </h1>
          <p className="text-sm text-muted-foreground">Enter your credentials</p>
        </div>
        <UserLoginForm />
      </div>
      <div className="hidden h-full md:w-1/2 lg:w-1/2 lg:block relative overflow-hidden bg-cover bg-[50%] bg-no-repeat">
        <Image
          className="h-full w-full"
          src="/images/login-cover.png"
          alt=""
          width={1289}
          height={1024}
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-50" />
      </div>
    </div>
  );
}
