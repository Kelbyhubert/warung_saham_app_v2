import { fetchRekom } from "@/services/rekom";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

    const searchParams = req.nextUrl.searchParams;
    const currentPage = Number(searchParams.get('index')) || 1;
    const limit = Number(searchParams.get('limit')) || 5;
    const code = searchParams.get('code') || '';
    const startDate = searchParams.get('startdate') || '';
    const endDate = searchParams.get('enddate') || '';

    try {
        const res = await fetchRekom(currentPage,limit,code,startDate,endDate);
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