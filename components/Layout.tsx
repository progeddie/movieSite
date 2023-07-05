import "@styles/globals.css";
import { ReactNode, MouseEvent } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Nav from "@components/organisms/Nav";
import NavItem from "@components/molecules/NavItem";
import { useUser } from "@auth0/nextjs-auth0/client";
import CommonLoading from "@components/atoms/CommonLoading";
import { useRecoilValue } from "recoil";
import { chachePageState } from "@global/listState";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const { user, error, isLoading } = useUser();
  if (isLoading) {
    return (
      <div className="max-h-screen p-10">
        <CommonLoading type="balls" color="#ffffff" />
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  // 기존클릭 리스트 호출
  const page = useRecoilValue(chachePageState);
  const router = useRouter();

  return (
    <div className="body">
      <div className="py-1">
        {user ? (
          <div className="flex flex-row justify-between bg-black text-white max-w-full">
            <div className="cursor-pointer border-2 rounded-md border-slate-100 p-2 ml-2 font-extrabold my-1">
              <Link href="/api/auth/logout">LOG OUT</Link>
            </div>
            <div className="p-3">{user.nickname}님 환영합니다.</div>
          </div>
        ) : (
          <div className="flex flex-row justify-between bg-black text-white max-w-full">
            <div className="cursor-pointer border-2 rounded-md border-slate-100 p-2 ml-2 font-extrabold my-1">
              <Link href="/api/auth/login">LOG IN</Link>
            </div>
          </div>
        )}
      </div>
      <Nav>
        {router.pathname === "/" ||
          router.pathname === "/TopRate" ||
          router.pathname === "/MyPick" ? (
          <div className="flex flex-row">
            <NavItem href="/" isActive={router.pathname === "/" ? true : false}>
              NEW RELEASE
            </NavItem>
            <NavItem
              href="/TopRate"
              isActive={router.pathname === "/TopRate" ? true : false}
            >
              TOP RATE
            </NavItem>
            <NavItem
              href="/MyPick"
              isActive={router.pathname === "/MyPick" ? true : false}
            >
              MY PICK
            </NavItem>
          </div>
        ) : (
          <div className="flex flex-row mb-1">
            <NavItem href={page} isActive={true}>
              <div className="p-4 font-extrabold mb-1">&lt; BACK</div>
            </NavItem>
          </div>
        )}
      </Nav>

      <div>{children}</div>
    </div>
  );
}