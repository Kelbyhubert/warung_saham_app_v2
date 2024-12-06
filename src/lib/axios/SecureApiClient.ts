import axios from "axios";
import { config } from "./Config";
import { cookies } from "next/headers";
import {createSessionV1 } from "../sessions/Sessions";
import { generateToken } from "@/services/auth";

export const SecureApiClient = axios.create(config);


SecureApiClient.interceptors.request.use(
    async(config : any) => {
        if(!config._retry){
            let token = (await cookies()).get("token")?.value || '';
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

SecureApiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if(error.response.status === 401 && !originalRequest._retry){
            console.log("================== start Refresh =====================");
            originalRequest._retry = true;
            const refreshToken = (await cookies()).get("refreshToken")?.value || '';
            const refreshResponse = await generateToken(refreshToken);
            if(refreshResponse.status === 200){
                try{
                    const data = refreshResponse.data;
                    createSessionV1(data.data.accessToken,data.data.expiredDate,data.data.refreshToken);
                    originalRequest.headers.Authorization = 'Bearer ' + data.data.accessToken;
                    console.log("================== end Refresh =====================");
                    return SecureApiClient(originalRequest);

                }catch(error){
                    console.log(error)
                    return Promise.reject(error);
                }
            }else{
                console.log('tes');
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

