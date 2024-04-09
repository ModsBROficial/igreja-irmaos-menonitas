import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { UserAuthProvider } from "@/providers/userAuthProvider";
import Message from "@/components/Message";
import NavContextProvider from "@/providers/NavbarProvider";
import ModalContextProvider from "@/providers/ModalProvider";
import ModalSecondContextProvider from "@/providers/ModalSecondProvider";
import ModalThirdContextProvider from "@/providers/ModalThirdProvider";
import NextNProgress from 'nextjs-progressbar';

const font = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "700"]
});

export default function App({ Component, pageProps }: AppProps) {

  return (
    <div className={`w-screen h-screen overflow-y-hidden ${font.className}`}>
      <UserAuthProvider>
        <NavContextProvider>
          <ModalContextProvider>
            <ModalSecondContextProvider>
              <ModalThirdContextProvider>
                <Message />
                <NextNProgress color="#fff" startPosition={0.3} stopDelayMs={200} height={5} showOnShallow={true} />
                <Component {...pageProps} />
              </ModalThirdContextProvider>
            </ModalSecondContextProvider>
          </ModalContextProvider>
        </NavContextProvider>
      </UserAuthProvider>
    </div>
  )
}
