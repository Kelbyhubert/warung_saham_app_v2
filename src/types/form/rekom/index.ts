import { array, z, ZodType } from "zod";
import { TargetTableData } from "../../Rekom";

export interface RekomFormData {
    stock : object | undefined | null
    entryFrom: number,
    entryTo :  number,
    stopLoss : number,
    description : string,
    target : TargetTableData[],
}

export const RekomFormSchema : ZodType<RekomFormData> = z.object({
    stock : z.object({}).passthrough().nullable().refine(
        (value) => value !== null && value !== undefined,
        { message: "Choose Stocks!" }
    ),
    entryFrom: z.number().min(0,"Entry Cannot Minus"),
    entryTo :z.number().min(0,"Entry Cannot Minus"),
    stopLoss: z.number(),
    description :z.string(),
    target : array(z.object({
        id : z.number(),
        orders : z.number(),
        targetFrom : z.number(),
        targetTo : z.number(),
        status : z.number()
    })).min(0).max(5)
})
.refine(
    (data) => data.entryFrom < data.entryTo,{
        message : "Entry From Cannot Higher than Entry To",
        path :['entryFrom']
    }
)
.refine(
    (data) => data.entryFrom < data.entryTo,{
        message : "Entry From Cannot Higher than Entry To",
        path :['entryTo']
    }
)