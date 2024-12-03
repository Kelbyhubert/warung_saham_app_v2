import axios from "axios";
import { config } from "./Config";
import { cookies, headers } from "next/headers";
import { createSession, createSessionV1, getSession } from "../sessions/Sessions";
import { rotateToken } from "@/app/actions/auth/AuthAction";
import { ApiClient } from "./ApiClient";
import { generateToken } from "@/services/auth";

export const SecureApiClient = axios.create(config);

let tokenCache : string | undefined | null = null;
let tokenExpiredDate = Date.now();

const getAccessToken = async () => {
    console.debug("Expired Date :" + new Date(tokenExpiredDate));
    if(tokenCache && Date.now() < tokenExpiredDate){
        console.debug("Cache token")
        return tokenCache;
    }
    
    // // // const session = await auth();
    // // const token = session?.accessToken;

    // // if(token){
    // //     tokenCache = token;
    // //     tokenExpiredDate = session.expiredDate;
    // // }
    
    // return token;
}

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

