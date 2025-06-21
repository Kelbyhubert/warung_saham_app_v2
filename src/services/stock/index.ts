import { SecureApiClient } from "@/lib/axios/SecureApiClient";
import axios from "axios";
import { HttpError } from "../error/http-errors";
import { StockData, StocksResponse, StockTableData } from "@/types/Stock";
import { BasePaginationData } from "@/types/base/BasePagination";

export const fetchStockPage = async (
  index: number,
  size: number,
  search: string = ""
): Promise<StocksResponse<BasePaginationData<StockTableData>>> => {
  const config = {
    method: "GET",
    url: "/stock/pageable",
    params: {
      index: index - 1,
      size: size,
      search: search,
      filter: "",
    },
  };

  try {
    const res = await SecureApiClient(config);

    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new HttpError(
        error.response?.status,
        error.response?.data,
        error.response?.data.message,
        error.response?.data.message
      );
    } else {
      throw Error("Something Went Wrong");
    }
  }
};

export const getStockList = async (
  stockCode: string
): Promise<StocksResponse<StockData[]>> => {
  try {
    const config = {
      method: "GET",
      url: `/stock/list?stockCodeContain=${stockCode}`,
    };

    const res = await SecureApiClient(config);
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new HttpError(
        error.response?.status,
        error.response?.data,
        error.response?.data.message,
        error.response?.data.message
      );
    } else {
      throw Error("Something Went Wrong");
    }
  }
};
