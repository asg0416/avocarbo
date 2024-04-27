import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { headers } from "next/headers";

const NavMenu = () => {
  const pathname = usePathname()

  const menuInfo = [
    { label: "About", url: "/" },
    { label: "News", url: "/news" },
    { label: "Meal Plan", url: "/meal-plan" },
    { label: "Contact Us", url: "/contact" },
  ];

  return (
    <div className="flex items-center gap-x-2">
      {menuInfo.map(({ label, url }) => {
        return (
          <Button
            key={label}
            variant="textBtn"
            className={cn(
              "text-base hover:text-lime-600",
              pathname === url && "text-green-700 font-semibold"
            )}
            asChild
          >
            <Link href={url}>{label}</Link>
          </Button>
        );
      })}
    </div>
  );
}
 
export default NavMenu;