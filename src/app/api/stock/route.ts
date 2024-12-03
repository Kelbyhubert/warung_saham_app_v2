import { fetchStockPage } from "@/services/stock";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

    const searchParams = req.nextUrl.searchParams;
    const currentPage = Number(searchParams.get('index'));
    const limit = Number(searchParams.get('limit'));
    const search = searchParams.get('search') || '';

    try {
        const res = await fetchStockPage(currentPage,limit,search);
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