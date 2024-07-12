import { Poppins } from "next/font/google";
import TopNavbar from "../components/TopNavbar.jsx"
import BottomNavbar from "../components/BottomNavbar.jsx"
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata = {
  title: "Recapp.",
  description:
    "an application to recap data from rubber goods • create by Axara"
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
