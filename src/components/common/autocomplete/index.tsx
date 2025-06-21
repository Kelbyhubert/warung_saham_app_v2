"use client";

import React from "react";
import TextField from "../input/textfield";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

interface AutoCompleteProps extends React.InputHTMLAttributes<HTMLDivElement> {
  label: string;
  selectValue: any;
  options: any[];
  error?: FieldError;
  onSelect: (option: any) => void;
  getOptionLabel: (option: any) => string;
  onInputChange?: (inputValue: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  selectValue,
  label,
  options,
  onSelect,
  getOptionLabel,
  onInputChange,
  error,
  className,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");

  const filterList = options.filter((option) =>
    getOptionLabel(option).toLowerCase().includes(inputValue.toLowerCase())
  );
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onInputChange !== undefined) {
      onInputChange(e.target.value);
    }
  };

  const chooseHandler = (option: any) => {
    setInputValue(getOptionLabel(option));
    if (onInputChange !== undefined) {
      onInputChange(getOptionLabel(option));
    }
    onSelect(option);
    setOpen(false);
  };

  const onBlurHandler = () => {
    const isValid = options.some(
      (option) => getOptionLabel(option) === inputValue
    );
    if (!isValid) {
      setInputValue("");
      onSelect(null);
    }
    setOpen(false);
  };

  const Option = (option: any, index: number) => (
    <li
      className="hover:bg-primary"
      key={index}
      onMouseDown={() => chooseHandler(option)}
    >
      {getOptionLabel(option)}
    </li>
  );

  React.useEffect(() => {
    setInputValue(selectValue !== null ? getOptionLabel(selectValue) : "");
  }, [selectValue]);

  return (
    <div className={cn("relative", className)}>
      <TextField
        label={label}
        value={inputValue}
        error={error}
        onChange={(e) => inputHandler(e)}
        onFocus={() => setOpen(true)}
        onBlur={() => onBlurHandler()}
      />
      {inputValue !== "" && open && (
        <div className="absolute bg-slate-100 w-full z-50 mt-1 border border-primary rounded-md">
          {filterList.length > 0 ? (
            <ul>{filterList.map((data, index) => Option(data, index))}</ul>
          ) : (
            <p>No Data</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
