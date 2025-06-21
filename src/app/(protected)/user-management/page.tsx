import Search from "@/components/common/input/search";
import UserTable from "@/components/features/user-management/components/UserTable";
import { SearchParams } from "@/types/common";
import Link from "next/link";

interface UserPageProps {
  searchParams: SearchParams;
}

const UserPage: React.FC<UserPageProps> = async ({ searchParams }) => {
  const queryParams = await searchParams;

  const currentPage = Number(queryParams.index) || 1;
  const limit = Number(queryParams.limit) || 5;

  return (
    <div className="p-2 m-2">
      <div className="flex justify-between items-center w-full p-2">
        <h2 className="text-3xl">User Management</h2>
        <div className="flex">
          <div className="flex justify-center items-center p-2">
            <Search queryKey="username" />
          </div>
          <Link
            className="border border-primary-400 rounded-md p-2 w-40 text-center m-2 bg-primary-400 text-white"
            href={{
              pathname: "user-management/create",
            }}
          >
            Create
          </Link>
        </div>
      </div>
      <div className="pt-4">
        <UserTable currentIndex={currentPage} currentLimit={limit} />
      </div>
    </div>
  );
};

export default UserPage;
