import { BaseTableData } from "./base/BaseTableData";
import { StockData } from "./Stock";


export interface RekomsResponse<T> {
    status : number
    data : T
}

export interface RekomTableData extends BaseTableData{
    stockCode: string
    createBy: string
    rekomDate: Date 
    entryFrom: number
    entryTo: number
    target: string
    stopLoss: number
    rekomType: string 
}

export interface RekomDetails {
    id : number
    stock : StockData
    description : string
    rekomDate? : Date 
    entryFrom: number
    entryTo: number
    stopLoss: number
    rekomType? : string
    target: TargetTableData[]
}

export interface TargetTableData extends BaseTableData{
    targetFrom: number
    targetTo: number
    orders: number
    status: number
}