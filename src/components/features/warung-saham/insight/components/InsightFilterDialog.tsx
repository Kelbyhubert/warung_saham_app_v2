"use client";
import { Dialog } from "@/components/common/dialog";
import DialogAction from "@/components/common/dialog/action";
import DialogContent from "@/components/common/dialog/content";
import DialogHeader from "@/components/common/dialog/header";
import DateInput from "@/components/common/input/date";
import TextField from "@/components/common/input/textfield";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React from "react";

const InsightFilterDialog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");

  const titleInputRef = React.useRef<HTMLInputElement>(null);
  const createByInputRef = React.useRef<HTMLInputElement>(null);

  function onCloseHandler() {
    const params = new URLSearchParams(searchParams);
    params.delete("filterModal");
    router.replace(`${pathname}?${params.toString()}`);
  }

  function submitHandler() {
    const params = new URLSearchParams(searchParams);
    if (titleInputRef.current?.value !== "") {
      params.set("title", titleInputRef.current?.value || "");
    } else {
      params.delete("title");
    }

    if (createByInputRef.current?.value !== "") {
      params.set("createby", createByInputRef.current?.value || "");
    } else {
      params.delete("createby");
    }

    if (startDate !== "") {
      params.set("startdate", startDate);
    } else {
      params.delete("startdate");
    }

    if (endDate !== "") {
      params.set("enddate", endDate);
    } else {
      params.delete("enddate");
    }

    params.delete("filterModal");
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Dialog onClose={onCloseHandler}>
      <DialogHeader closeHandler={onCloseHandler}>
        <p>Insight Filter</p>
      </DialogHeader>
      <DialogContent>
        <TextField label="Title" ref={titleInputRef} />
        <DateInput
          type="range"
          label="Date Range"
          dateValue={startDate}
          endDateValue={endDate}
          onChangeDateValue={setStartDate}
          onChangeEndDateValue={setEndDate}
        />
        <TextField label="Create By" ref={createByInputRef} />
      </DialogContent>
      <DialogAction>
        <button
          onClick={submitHandler}
          className="w-full p-1 m-1 border text-white bg-primary-400 border-primary-400 rounded-md"
        >
          Confirm
        </button>
        <button
          onClick={onCloseHandler}
          className="w-full p-1 m-1 border border-primary-400 rounded-md"
        >
          Cancel
        </button>
      </DialogAction>
    </Dialog>
  );
};

export default InsightFilterDialog;
