import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import RegisterModal from "@/components/modals/registermodal";
import ToasterProvider from "@/providers/toasterprovider";
import LoginModal from "@/components/modals/loginmodal";
import getCurrentUser from "@/actions/getCurrentUser";
import RentModal from "@/components/modals/rentmodal";
import SearchModal from "@/components/modals/searchmodal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Traveller",
  description: "Seu melhor amigo na hora de viajar!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getCurrentUser()

  return (
    <html lang="pt-br">
      <body className={nunito.className}>
        <ToasterProvider />
        <LoginModal />
        <RentModal />
        <RegisterModal />
        <SearchModal />
        <Navbar currentUser={currentUser}/>
        <div className='pb-20 pt-28'>
        {children}
        </div>
      </body>
    </html>
  );
}
