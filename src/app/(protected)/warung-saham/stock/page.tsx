import { Button } from "@/components/common/button";
import Search from "@/components/common/input/search";
import StockTable from "@/components/features/warung-saham/stock/components/StockTable";
import { SearchParams } from "@/types/common";
import Link from "next/link";
import React from "react";

interface StockPageProps {
  searchParams: SearchParams;
}

const StockPage: React.FC<StockPageProps> = async ({ searchParams }) => {
  const queryParams = await searchParams;

  const currentPage = Number(queryParams.index) || 1;
  const limit = Number(queryParams.limit) || 5;

  return (
    <div className="p-2 m-2">
      <div className="flex justify-between items-center w-full p-2">
        <h2 className="text-3xl">Stock</h2>
        <div className="flex gap-2">
          <Search queryKey="stockcode" />
          <Button size="lg">
            <Link
              href={{
                pathname: "insight/create",
              }}
            >
              Create
            </Link>
          </Button>
        </div>
      </div>
      <div className="pt-4">
        <StockTable currentIndex={currentPage} currentLimit={limit} />
      </div>
    </div>
  );
};

export default StockPage;
