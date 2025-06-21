"use client";

import Column from "@/components/common/column";
import LinkButton from "@/components/common/LinkButton";
import Pagination from "@/components/common/pagination";
import Table from "@/components/common/table";
import { StockTableData } from "@/types/Stock";
import { dateFormatV1 } from "@/utils/DateFormat";
import { Trash2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface StockTableProps {
  currentIndex: number;
  currentLimit: number;
}

const StockTable: React.FC<StockTableProps> = ({
  currentIndex,
  currentLimit,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stockCode = searchParams.get("stockcode") || "";

  const [stocks, setStocks] = React.useState<StockTableData[]>([]);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const actionTemplate = (data: StockTableData, index: number | undefined) => (
    <div className="flex justify-center items-center">
      <LinkButton name="Delete" url={`/warung-saham/stock/${data.id}`}>
        <Trash2 className="hover:text-primary-400" />
      </LinkButton>
    </div>
  );

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

  React.useEffect(() => {
    const fetchInsightData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5173/api/stock?index=${currentIndex}&limit=${currentLimit}&search=${stockCode}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const result = await response.json();
          setStocks(result.data.data.content);
          setTotalPage(result.data.data.totalPages);
        } else {
          setStocks([]);
          setTotalPage(0);
        }
      } catch (error: any) {
        setStocks([]);
        setTotalPage(0);
      }
    };
    fetchInsightData();

    if (currentIndex > totalPage && totalPage !== 0) {
      onPageChange(totalPage);
    }
  }, [currentIndex, currentLimit, stockCode]);

  return (
    <div>
      <Table<StockTableData> data={stocks} totalData={1}>
        <Column
          body={(_, index = 1) => (currentIndex - 1) * currentLimit + index + 1}
          header="NO"
        />
        <Column field="stockCode" header="Code" />
        <Column field="company" header="Company" />
        <Column field="sector" header="Sector" />
        <Column
          body={(data, index) => actionTemplate(data, index)}
          header="Action"
        />
      </Table>
      <Pagination
        currentPage={currentIndex}
        currentLimit={currentLimit.toString()}
        limits={[5, 10, 25]}
        totalPage={totalPage}
        onChangePage={onPageChange}
        onChangePageLimit={onLimitChange}
      />
    </div>
  );
};

export default StockTable;
