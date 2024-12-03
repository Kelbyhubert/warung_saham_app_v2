import { BasePaginationData } from "./base/BasePagination"
import { BaseTableData } from "./base/BaseTableData"

export interface InsightsResponse{
    status: number
    data: BasePaginationData<InsightTableData>
}

export interface InsightTableData extends BaseTableData {
    title: string
    createBy: string
    createDate: Date
    updateBy: string | null
    updateDate: string | null
}