import { createSession } from "@/lib/sessions/Sessions";
import { authenticate } from "@/services/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const {username,password} = await req.json();

    try {
        const res = await authenticate(username,password);
        const data = res.data.data;
        // await createSession(data.token,data.expiredDate, data.refreshToken);
        const response = NextResponse
        .json({
            status: 307,
            message: "LOGIN SUCCESS"
    },{status: 307});

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
    } catch (error: any) {
        console.log(error);
        if(error.status === 401){
            return NextResponse
                            .json({
                                status: error.status,
                                message: error.errorMessage
                            },{status: error.status});
        }else{
            return NextResponse
                            .json({
                                status: 500,
                                message: "INTERNAL SERVER ERROR"
                            },{status: 500});
        }
    }   

}