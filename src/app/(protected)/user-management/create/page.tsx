import UserForm from "@/components/features/user-management/components/UserForm";
import React from "react";

const NewUserPage = () => {
  return (
    <div className="p-2 m-2">
      <div className="w-full p-2">
        <h2 className="text-3xl">Create New User</h2>
      </div>
      <div className="p-4">
        <UserForm />
      </div>
    </div>
  );
};

export default NewUserPage;
