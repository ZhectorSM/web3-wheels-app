import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Providers from "./providers";


const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans"
});

export const metadata = {
  title: "web3 wheels",
  description: "travel smarter"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
