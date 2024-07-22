import { Poppins } from "next/font/google";
import TopNavbar from "../components/TopNavbar.jsx";
import BottomNavbar from "../components/BottomNavbar.jsx";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata = {
  title: "Recapp.",
  description: "Recap app for goods management.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    { name: "Bayu Aprio Pamungkas" },
    {
      name: "Bayu Aprio Pamungkas",
      url: "https://www.github.com/oortsky/"
    }
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <TopNavbar />
        {children}
        <BottomNavbar />
      </body>
    </html>
  );
}
