import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export const useAsyncRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [resolveRouteChanged, setResolveRouteChanged] = useState<
    (() => void) | null
  >(null);

  useEffect(() => {
    resolveRouteChanged?.();
  }, [pathname]);

  const asyncRouter = useMemo(() => {
    const push = async (href: string) => {
      router.push(href);

      await new Promise<void>((resolve) => {
        // wait for the route change to complete
        setResolveRouteChanged(resolve);
      });
    };

    return { ...router, push };
  }, [router]);

  return asyncRouter;
};
