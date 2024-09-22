"use client";
import React from "react";
import { Loader, Search, X } from "lucide-react";
import useDebounce from "~/hooks/useDebounce";

const SearchBox = () => {
  const loading: boolean = false;
  const { debouncedValue, value, setValue } = useDebounce<string>("");
  console.log("🚀 ~ SearchBox:", value, debouncedValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fy-center mx-3 h-10 basis-4/12 items-stretch gap-2 rounded-full bg-[#f0f2f5]"
    >
      <Search className="ml-3" />
      <input
        name="search"
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        className="flex-1 bg-transparent pr-10 text-sm font-medium text-text outline-none"
        placeholder="Tìm truyện"
      />
      {value.length > 0 && (
        <>
          {loading ? (
            <div className="f-center h-10 w-10 animate-spin cursor-pointer">
              <Loader size={16} />
            </div>
          ) : (
            <button onClick={() => setValue("")} className="f-center h-10 w-10 cursor-pointer">
              <X size={16} />
            </button>
          )}
        </>
      )}
    </form>
  );
};

export default SearchBox;
