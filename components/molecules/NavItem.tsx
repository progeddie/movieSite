import Link from "next/link";
import { ReactNode } from "react";
export default function NavItem({
    href,
    isActive = false,
    children,
}: {
    href: string;
    isActive?: boolean;
    children: ReactNode;
}) {
    return (
        <li
            className={`font-medium text-center rounded-sm px-6 ${isActive ? "bg-sky-500 text-white" : "border-slate-50"
                }`}
        >
            <Link href={href}>{children}</Link>
        </li>
    );
}
