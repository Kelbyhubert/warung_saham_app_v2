import { ApiClient } from "@/lib/axios/ApiClient";
import axios from "axios";
import { HttpError } from "../error/http-errors";

export const authenticate: any = async (username: string, password: string) => {
  try {
    const config = {
      method: "POST",
      url: "/auth/signin",
      data: {
        username: username,
        password: password,
      },
    };

    const res = await ApiClient(config);
    return res;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new HttpError(
        error.response?.status,
        null,
        error.response?.data.message,
        error.response?.data.message
      );
    } else {
      throw Error("Unexpected Error", error);
    }
  }
};

export const generateToken: any = async (refreshToken: string) => {
  try {
    const config = {
      method: "POST",
      url: "/auth/refresh-token",
      headers: {
        // 'Authorization': '',
        "Refresh-Token": refreshToken,
      },
    };

    const res = await ApiClient(config);
    return res;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new HttpError(
        error.response?.status,
        null,
        error.response?.data.message,
        error.response?.data.message
      );
    } else {
      console.log("tes");
      throw Error("Something went Wrong");
    }
  }
};
