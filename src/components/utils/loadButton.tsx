"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HTMLAttributes } from "react";

const LoadButton = ({
  paramKey,
  amount,
  ...props
}: { paramKey: string; amount: number } & HTMLAttributes<HTMLButtonElement>) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleLoad = () => {
    const params = new URLSearchParams(searchParams);
    const items = Math.max(Number(params.get(paramKey)) || amount, 1);
    params.set(paramKey, String(items + amount));
    replace(`${pathname}?${params.toString()}`);
  };

  return <button {...props} onClick={handleLoad} />;
};

export default LoadButton;
