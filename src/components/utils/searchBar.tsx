"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HTMLAttributes } from "react";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = ({
  paramKey,
  ...props
}: { paramKey: string } & HTMLAttributes<HTMLInputElement>) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((search) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set(paramKey, search);
    } else {
      params.delete(paramKey);
    }
    replace(`${pathname}?${params.toString()}`);
  });

  return (
    <input
      {...props}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search..."
      defaultValue={searchParams.get(paramKey)?.toString()}
    />
  );
};

export default SearchBar;
