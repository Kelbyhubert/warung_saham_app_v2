import { SecureApiClient } from "@/lib/axios/SecureApiClient"
import axios from "axios";
import { HttpError } from "../error/http-errors";
import { StocksResponse } from "@/types/Stock";

export const fetchUserListPage = async (
    index: number, 
    size: number, 
    username: string = '', 
) : Promise<StocksResponse> => {

    const config = {
        method: "GET",
        url: "/user",
        params: {
            pageIndex: index - 1,
            size : size,
            username : username,
        }
    }

    try{
        const res = await SecureApiClient(config);

        return res.data;
    }catch(error: any){
        if(axios.isAxiosError(error)){
            throw new HttpError(
                error.response?.status, 
                error.response?.data, 
                error.response?.data.message, 
                error.response?.data.message
            );
        }else{
            throw Error('Something Went Wrong');
        }
    }


}