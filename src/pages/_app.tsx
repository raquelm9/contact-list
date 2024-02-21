import { ContactsProvider } from "@/components/contacts/ContactsProvider";
import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContactsProvider>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="max-w-3xl w-full px-4">
          <Component {...pageProps} />
        </div>
      </div>
    </ContactsProvider>
  );
}
