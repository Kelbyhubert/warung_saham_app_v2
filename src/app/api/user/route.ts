import { fetchUserListPage } from "@/services/user";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams;
    const currentPage = Number(searchParams.get('index')) || 1;
    const limit = Number(searchParams.get('limit')) || 5;
    const username = searchParams.get('username') || '';

    try {
        const res = await fetchUserListPage(currentPage,limit,username);
        const response = NextResponse
                                .json({
                                    status: 200,
                                    data: res,
                                    message: "Success Fetch"
                                },{status: 200});
        
        return response;
    } catch (error: any) {
        console.log(error);
        return NextResponse
                        .json({
                            status: 500,
                            message: "INTERNAL SERVER ERROR"
                        },{status: 500});
        
    }   

}