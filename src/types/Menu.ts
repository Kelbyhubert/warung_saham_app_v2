export interface Menu {
    id: number,
    name: string,
    url: string | null,
    subMenu: Menu[] | null,
}
