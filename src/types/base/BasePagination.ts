
export interface BasePaginationData<T> {
    content : T[]
    pageable: {
        sort: {
            empty: boolean,
            sorted: false,
            unsorted: true
        },
        offset: number,
        pageSize: number,
        pageNumber: number,
        paged: boolean,
        unpaged: boolean
    },
    last: boolean,
    totalPages: number,
    totalElements: number,
    first: boolean,
    size: number,
    number: number,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    numberOfElements: number,
    empty: boolean
}