import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Providers } from "@/components/providers";
import { ChatBot } from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "Next.js Auth App",
  description: "A Next.js application with authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navigation />
          <main>{children}</main>
          <ChatBot />
        </Providers>
      </body>
    </html>
  );
}
