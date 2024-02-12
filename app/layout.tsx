import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Modal from "@/components/shared/modal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Traveller",
  description: "Seu melhor amigo na hora de viajar!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={nunito.className}>
        <Modal isOpen title="Modal" actionLabel="Action" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
