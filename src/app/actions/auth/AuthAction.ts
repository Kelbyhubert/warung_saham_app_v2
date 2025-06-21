"use server";

import { createSessionV1 } from "@/lib/sessions/Sessions";
import { authenticate, generateToken } from "@/services/auth";
import { redirect, RedirectType } from "next/navigation";

export const signIn = async (username: string, password: string) => {
  try {
    const res = await authenticate(username, password);
    const data = res.data.data;
    createSessionV1(data.token, data.expiredDate, data.refreshToken);
  } catch (error: any) {
    console.log(error);
    if (error.status === 401) {
      return {
        message: "INTERNAL SYSTEM ERROR",
      };
    } else {
      return {
        message: "INTERNAL SYSTEM ERROR",
      };
    }
  }

  return redirect("/", RedirectType.push);
};

export const rotateToken = async (rToken: string) => {
  try {
    const res = await generateToken(rToken);
    const data = res.data.data;
    createSessionV1(data.accessToken, data.expiredDate, data.refreshToken);

    return {
      code: 200,
      message: "Success",
    };
  } catch (e: any) {
    console.log(e);
    if (e.status === 401) {
      return {
        status: e.status,
        message: e.errorMessage,
      };
    } else {
      return {
        status: 500,
        message: "INTERNAL SERVER ERROR",
      };
    }
  }
};
