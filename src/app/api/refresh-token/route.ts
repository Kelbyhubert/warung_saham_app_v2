import { generateToken } from "@/services/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req : NextRequest) => {
    console.log("Start Refresh Token Route : " + req.cookies.getAll())
    const refreshToken = (await cookies()).get("refreshToken")?.value
    try{
        const res = await generateToken(refreshToken);
        const data = res.data.data;
        // createSession(data.accessToken,data.expirationDate,data.refreshToken);
        const response = NextResponse.json({
            status: 200,
            message: "Success",
            newToken: data.accessToken
        },{status: 200});

        response.cookies.set('token', data.token, {
            httpOnly: true,  // Secure cookie
            secure: false,
            sameSite: 'strict',
            expires: data.expiredDate,
            path: '/',  // Path where cookie is available
        });

        response.cookies.set('refreshToken', data.refreshToken, {
            httpOnly: true,  // Secure cookie
            secure: false,
            sameSite: 'strict',
            path: '/',  // Path where cookie is available
        });

        return response;
        
    }catch(e: any){
        console.log(e);
        if(e.status === 401){
            return NextResponse.json({
                status: e.status,
                message: e.errorMessage
            },{status: e.status})
        }else{
            return NextResponse.json({
                status: 500,
                message: "INTERNAL SERVER ERROR"
            },{status: 500})
        }
    }


}