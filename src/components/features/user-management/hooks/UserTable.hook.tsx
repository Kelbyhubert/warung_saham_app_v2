import { UserTableData } from "@/types/User";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface useFetchUsersProps {
    currentIndex : number
}

const useFetchUsers = ({currentIndex}: useFetchUsersProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
  
    const searchParamsString = searchParams.toString();

    const [users, setUsers] = React.useState<UserTableData[]>([]);
    const [totalPage, setTotalPage] = React.useState<number>(0);

    const onPageChange = (pageIndex: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('index',pageIndex.toString());
        router.replace(`${pathname}?${params.toString()}`)
      };
    
    const onLimitChange = (limit: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('limit',limit);
        router.replace(`${pathname}?${params.toString()}`)
    };
    
    const fetchUsersData = async() => {
        try {
        const response = await fetch(`http://localhost:5173/api/user?${searchParamsString}`, {
            method: 'GET',
            credentials: 'include'
        });

        if(response.ok){
            const result = await response.json();
            setUsers(result.data.data.content);

            // optimize
            if(result.data.data.totalPages !== totalPage){
                setTotalPage(result.data.data.totalPages);
            }

        }else{ 
            setUsers([]);
            setTotalPage(0);
        }
    
        } catch (error: any) {
            setUsers([]);
            setTotalPage(0);
        }
    }
    
    React.useEffect(() => {
        fetchUsersData();

        if((currentIndex > totalPage) && totalPage !== 0){
            onPageChange(totalPage);
        }
    },[searchParams,totalPage]);

    return { users, totalPage, onPageChange, onLimitChange };
}


export default useFetchUsers;