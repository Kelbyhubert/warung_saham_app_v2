import { BasePaginationData } from "./base/BasePagination"
import { BaseTableData } from "./base/BaseTableData"

export interface StocksResponse<T> {
    status : number
    data : T
}

export interface StockTableData extends BaseTableData , StockData {}

export interface StockData {
    stockCode: string
    company: string
    sector: string
}