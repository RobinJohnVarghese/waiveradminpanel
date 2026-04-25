"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "react-hot-toast";

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const userLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

type FormData = z.infer<typeof userLoginSchema>;

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userLoginSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    // const signInResult =   await axios({
    //   method: "post",
    //   url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/staff/login/`,
    //   data: JSON.stringify({
    //     username: data.username,
    //     password: data.password,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => {       
    //     return response.data;
    //   })
    //   .catch((error) => {
    //     throw new Error(error.response.data.error);
    //   })
    const signInResult = await signIn("login", {
      username: data.username,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });
    setIsLoading(false);
    // console.log(signInResult)
    if (signInResult?.error) {
      // console.log(signInResult?.error)
      toast.error("Login failed")
    } else {
      toast.success("Login successful");
      router.push( "/");
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="username">username</Label>
            <Input
              id="username"
              placeholder="username"
              type="username"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              {...register("username")}
            />
            {errors?.username && (
              <p className="px- text-xs text-red-600">{errors.username.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px- text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
