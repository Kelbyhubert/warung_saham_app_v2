import { SecureApiClient } from "@/lib/axios/SecureApiClient";
import axios from "axios";
import { HttpError } from "../error/http-errors";
import { RekomDetails, RekomsResponse, RekomTableData } from "@/types/Rekom";
import { BasePaginationData } from "@/types/base/BasePagination";

export const fetchRekom = async (
  index: number,
  size: number,
  code: string = "",
  fromdDate: string = "",
  endDate: string = ""
): Promise<RekomsResponse<BasePaginationData<RekomTableData>>> => {
  const config = {
    method: "GET",
    url: "/rekom",
    params: {
      index: index - 1,
      size: size,
      code: code,
      fromDate: fromdDate,
      endDate: endDate,
    },
  };

  try {
    const res = await SecureApiClient(config);
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new HttpError(
        error.response?.status,
        null,
        error.response?.data.message,
        error.response?.data.message
      );
    } else {
      throw Error("Something Went Wrong");
    }
  }
};

export const fetchRekomDetails = async (
  id: number
): Promise<RekomsResponse<RekomDetails>> => {
  const config = {
    method: "GET",
    url: `/rekom/${id}`,
  };

  try {
    const res = await SecureApiClient(config);
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new HttpError(
        error.response?.status,
        null,
        error.response?.data.message,
        error.response?.data.message
      );
    } else {
      throw Error("Something Went Wrong");
    }
  }
};
