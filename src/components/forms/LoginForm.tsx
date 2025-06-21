"use client";
import { signIn } from "@/app/actions/auth/AuthAction";
import { useUser } from "@/context/User.context";
import { LoginFormSchema, LoginFormType } from "@/types/form/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shield } from "lucide-react";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
const LoginForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
  });

  const router = useRouter();
  const { user, setUser } = useUser();

  const submitHandler = handleSubmit(async (data) => {
    reset();
    let res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
      credentials: "include",
    });

    if (res.status === 307) {
      router.refresh();
      router.push("/dashboard");
      setUser({
        username: "Ricky",
      });
    } else {
      const result = await res.json();
      console.log(result);
    }

    // const result = await signIn(data.username,data.password);
  });

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h2>Admin Login</h2>
        <Shield />
        {errors.root?.serverError.type === "401" && (
          <small className="text-red-500">
            {errors.root.serverError.message}
          </small>
        )}
      </div>
      <form className="w-96" onSubmit={submitHandler}>
        <div className="flex flex-col w-full my-2">
          <label htmlFor="username">Username/Email</label>
          <input
            {...register("username")}
            className="p-2 h-8 border border-font-primary rounded-md focus:outline-none focus:border-2 focus:border-primary-600"
            name="username"
            id="username"
            type="text"
          />
          {errors.username && (
            <small className="text-red-500">{errors.username.message}</small>
          )}
        </div>
        <div className="flex flex-col w-full my-2">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            className="p-2 h-8 border border-font-primary rounded-md focus:outline-none focus:border-2 focus:border-primary-600"
            name="password"
            id="password"
            type="password"
          />
          {errors.password && (
            <small className="text-red-500">{errors.password.message}</small>
          )}
        </div>
        <div className="flex">
          <button
            className="p-1 w-4/5 items-center my-2 mx-auto text-base text-font-primary border border-primary-400 rounded-md"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
