import { z, ZodType } from "zod";

export interface targetFormData {
    orders : number,
    targetFrom : number,
    targetTo : number,
}

export const AddTargetSchema : ZodType<targetFormData> = z.object({
    orders : z.number(),
    targetFrom : z.number().min(0),
    targetTo : z.number().min(0),
});