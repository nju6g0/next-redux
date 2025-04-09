"use client";
import Link from "next/link";
// import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/lib/constants/routes";

export default function SideNav() {
  // const router = useRouter();
  // console.log(router);
  const pathname = usePathname(); // 獲取當前頁面路徑
  // console.log(pathname);
  return (
    <nav className="w-xs bg-rose-50 flex flex-col items-end">
      我是側邊欄
      {ROUTES.map(({ key, routeName, path }) => (
        // <div key={key} className="px-[16px] py-[5px]">
        <Link href={path} key={key}>
          <div
            className={`px-8 py-4 border-b-2 border-white w-full text-right ${
              pathname === path ? "bg-rose-200" : ""
            }`}
          >
            {routeName}
          </div>
        </Link>
      ))}
    </nav>
  );
}
