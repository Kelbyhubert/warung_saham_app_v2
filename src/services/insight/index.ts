import { SecureApiClient } from "@/lib/axios/SecureApiClient"
import axios from "axios";
import { HttpError } from "../error/http-errors";
import { InsightsResponse, InsightTableData } from "@/types/Insight";

export const fetchInsight = async (
    index: number, 
    size: number, 
    title: string = '', 
    createBy: string = '', 
    fromdDate: string = '', 
    endDate:string = ''
) : Promise<InsightsResponse> => {

    const config = {
        method: "GET",
        url: "/insight",
        params: {
            index: index - 1,
            size : size,
            title: title,
            createBy: createBy,
            fromDate: fromdDate,
            endDate: endDate,
        }
    }

    try{
        const res = await SecureApiClient(config);
        return res.data;
    }catch(error: any){
        if(axios.isAxiosError(error)){
            throw new HttpError(
                error.response?.status, 
                null, 
                error.response?.data.message, 
                error.response?.data.message
            );
        }else{
            console.log('tes');
            throw Error('Something Went Wrong');
        }
    }


}