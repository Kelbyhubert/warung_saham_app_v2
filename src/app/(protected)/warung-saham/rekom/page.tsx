import { Button } from "@/components/common/button";
import RekomFilterDialog from "@/components/features/warung-saham/rekom/components/RekomFilterDialog";
import RekomTable from "@/components/features/warung-saham/rekom/components/RekomTable";
import { SearchParams } from "@/types/common";
import Link from "next/link";
import React from "react";

interface InsightPageProps {
  searchParams: SearchParams;
}

const RekomPage: React.FC<InsightPageProps> = async ({ searchParams }) => {
  const queryParams = await searchParams;

  const currentPage = Number(queryParams.index) || 1;
  const limit = Number(queryParams.limit) || 5;
  const filterModal = Boolean(queryParams.filterModal) || false;

  return (
    <>
      <div className="p-2 m-2">
        <div className="flex justify-between items-center w-full p-2">
          <h2 className="text-3xl">Stock Recomendation</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="lg" asChild>
              <Link
                href={{
                  query: {
                    ...queryParams,
                    filterModal: true,
                  },
                }}
              >
                Filter
              </Link>
            </Button>
            <Button size="lg">
              <Link
                href={{
                  pathname: "rekom/create",
                }}
              >
                Create
              </Link>
            </Button>
          </div>
        </div>
        <div className="pt-4">
          <RekomTable currentIndex={currentPage} currentLimit={limit} />
        </div>
      </div>
      {filterModal && <RekomFilterDialog />}
    </>
  );
};

export default RekomPage;
