import { fetchInsight } from "@/services/insight";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

    const searchParams = req.nextUrl.searchParams;
    const currentPage = Number(searchParams.get('index'));
    const limit = Number(searchParams.get('limit'));
    const title = searchParams.get('title') || '';
    const startDate = searchParams.get('startdate') || '';
    const endDate = searchParams.get('enddate') || '';
    const createBy = searchParams.get('createby') || ''

    try {
        const res = await fetchInsight(currentPage,limit,title,createBy,startDate,endDate);
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