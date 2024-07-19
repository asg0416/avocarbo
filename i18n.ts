import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { IntlErrorCode } from "next-intl";

// Can be imported from a shared config
export const locales = ["en", "ko"];
export const defaultLocale = "en";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        // Missing translations are expected and should only log an error
        console.log("온에러", error.code);
      }
    },
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter((part) => part != null).join(".");

      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return "MISSING_MESSAGE"
      } else {
        return "MISSING_MESSAGE"
      }
    },
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
