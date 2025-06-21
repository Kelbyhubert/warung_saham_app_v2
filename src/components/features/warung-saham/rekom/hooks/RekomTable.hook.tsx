import { RekomTableData } from "@/types/Rekom";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface UseFetchRekomsProps {
  currentIndex: number;
}

const useFetchRekoms = ({ currentIndex }: UseFetchRekomsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchParamsString = searchParams.toString();

  const [rekoms, setRekoms] = React.useState<RekomTableData[]>([]);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const onPageChange = (pageIndex: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("index", pageIndex.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const onLimitChange = (limit: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", limit);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const fetchRekomData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5173/api/rekom?${searchParamsString}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const result = await response.json();
        setRekoms(result.data.data.content);

        // optimize
        if (result.data.data.totalPages !== totalPage) {
          setTotalPage(result.data.data.totalPages);
        }
      } else {
        setRekoms([]);
        setTotalPage(0);
      }
    } catch (error: any) {
      setRekoms([]);
      setTotalPage(0);
    }
  };

  React.useEffect(() => {
    fetchRekomData();

    if (currentIndex > totalPage && totalPage !== 0) {
      onPageChange(totalPage);
    }
  }, [searchParams, totalPage]);

  return { rekoms, totalPage, onPageChange, onLimitChange };
};

export default useFetchRekoms;
