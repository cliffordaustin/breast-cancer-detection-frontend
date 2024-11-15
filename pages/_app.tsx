import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { Open_Sans } from "next/font/google";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { MantineProvider } from "@mantine/core";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { useRouter } from "next/router";

const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["500", "700", "800", "500", "600"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && nprogress.start();
    const handleComplete = () => nprogress.complete();

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.asPath]);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: open_sans.style.fontFamily,
      }}
    >
      <NavigationProgress />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <main className={open_sans.className}>
            <Component {...pageProps} />
          </main>
        </Hydrate>
      </QueryClientProvider>
    </MantineProvider>
  );
}
