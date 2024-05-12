import { DM_Sans } from "next/font/google";

import "./globals.css";
import Header from "../components/Header";
import Web3Providers from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans"
});

export const metadata = {
  title: "Web3 Wheels",
  description: "travel smarter"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <Web3Providers>
          <Header />
          {children}
          <ToastContainer />
        </Web3Providers>
      </body>
    </html>
  );
}
