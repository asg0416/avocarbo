"use client"

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();

  const navInfo = [
    { url: "/server", title: "Server" },
    { url: "/client", title: "Client" },
    { url: "/admin", title: "Admin" },
    { url: "/settings", title: "Settings" },
  ];

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        {navInfo.map(({ url, title }) => {
          return (
            <Button
              key={url}
              asChild
              variant={pathname === url ? "default" : "outline"}
            >
              <Link href={url}>{title}</Link>
            </Button>
          );
        })}
      </div>
      <UserButton/>
    </nav>
  );
};

export default Navbar;
