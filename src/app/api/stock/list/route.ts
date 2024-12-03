import { getStockList } from "@/services/stock";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

    const searchParams = req.nextUrl.searchParams;
    const stockCode = searchParams.get('stockCode') || '';

    try {
        const res = await getStockList(stockCode);
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