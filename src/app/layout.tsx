import Providers from "@/providers/providers";
import "dayjs/locale/pt-br";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import "./styles/index.css";

const inter = Inter({ subsets: ["latin"] });

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
export const metadata: Metadata = {
  title: "Agendaê",
  description: "Agendamento rápido e fácil para você e sua empresa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
