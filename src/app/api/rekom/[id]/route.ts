import { fetchRekomDetails } from "@/services/rekom";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, {params} : {params: Promise<{id: number}>}) => {
    const {id} = await params;
    try {
        const res = await fetchRekomDetails(id);
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