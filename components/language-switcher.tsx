"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { GlobeIcon } from "@radix-ui/react-icons";

const languages = [
  { code: "en", name: "English" },
  { code: "ko", name: "한국어" },
];

export default function LanguageSwitcher() {
  const t = useTranslations("btn")
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();

  const switchLanguage = (newLocale: string) => {
    const segments = pathname.split("/");
    const currentLocaleIndex = segments.findIndex((seg) => seg === locale);
    if (currentLocaleIndex !== -1) {
      segments[currentLocaleIndex] = newLocale;
    } else {
      segments.splice(1, 0, newLocale); // 로케일을 경로에 추가 (기본 위치)
    }
    const queryString = searchParams ? "?" + searchParams : "";
    const newPath = segments.join("/");
    const url = newPath + queryString

    router.push(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <GlobeIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t("toggle-language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={locale === lang.code ? "bg-accent" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
