import { array, z } from "zod";

const entrySchema = z.object({
    entryFrom: z.preprocess(
        (val) => {
            if(val === "") return undefined
            return Number(val);
        },
        z.number().gte(0)
    ),
    entryTo :z.preprocess(
        (val) => {
            if(val === "") return undefined
            return Number(val);
        },
        z.number().gte(0)
    )
});

export const rekomFormSchema = z.object({
    stock : z.object({
        stockCode : z.string(),
        company : z.string(),
        sector: z.string()
    }).nullable().refine(
        (value) => value !== null && value !== undefined,
        { message: "Choose Stocks!" }
    ),
    entry : entrySchema.superRefine(
        (obj,ctx) => {
            if(obj.entryFrom >= obj.entryTo){
                ctx.addIssue({
                    code : 'custom',
                    message : 'Entry From Must Lower Than Entry To'
                })
            }
        }
    ),
    stopLoss: z.preprocess(
        (val) => {
            if(val === "") return undefined
            return Number(val);
        },
        z.number().gte(0)
    ),
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
    (data) => data.entry.entryFrom > data.stopLoss,{
        message : "Must Lower than Entry",
        path :['stopLoss']
    }
);

export type RekomFormSchema = z.infer<typeof rekomFormSchema>;