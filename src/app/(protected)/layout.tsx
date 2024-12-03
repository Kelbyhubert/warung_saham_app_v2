import { Inter } from "next/font/google";
import "../../../globals.css";
import SideBar from "@/components/navigation/sidebar"
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <aside className="flex-initial w-64 h-screen fixed">
            <SideBar/>
          </aside>
          <div className="ml-[17rem] m-2 relative w-full rounded-md shadow-xl">
            {children}
          </div>
        </div>
        <div id="modal-root"/>
      </body>
    </html>
  );
}
