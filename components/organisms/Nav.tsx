import { ReactNode } from "react";

export default function Nav({ children }: { children: ReactNode }) {
  return (
    <nav>
      <ul className="grid justify-center">{children}</ul>
    </nav>
  );
}