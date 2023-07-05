import { UserProvider } from "@auth0/nextjs-auth0/client";
import RootLayout from "@components/Layout";
import { RecoilRoot } from "recoil";

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: React.FC;
  pageProps: any;
}) {
  return (
    <RecoilRoot>
      <UserProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </UserProvider>
    </RecoilRoot>
  );
}
