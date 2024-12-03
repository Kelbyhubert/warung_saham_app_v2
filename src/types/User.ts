import { BasePaginationData } from "./base/BasePagination";
import { BaseTableData } from "./base/BaseTableData";

export interface UsersResponse {
    status : number,
    data : BasePaginationData<UserTableData>
}

export interface UserTableData extends BaseTableData {
    userId : string
    username: string
    email : string
    name: string
    phoneNumber: string
}