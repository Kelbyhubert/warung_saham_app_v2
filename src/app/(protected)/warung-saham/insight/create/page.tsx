import InsightForm from "@/components/features/warung-saham/insight/components/InsightForm";
import React from "react";

const CreateInsightPage = () => {
  return (
    <div className="h-full p-4">
      <div className="w-full p-2">
        <h2 className="text-3xl">Create Insight</h2>
      </div>
      <div className="relative p-4">
        <InsightForm />
      </div>
    </div>
  );
};

export default CreateInsightPage;
