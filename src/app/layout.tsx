import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel, Crimson_Text } from "next/font/google";
import { GameConfigProvider } from "@/contexts/GameContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-fantasy",
})

const crismonText = Crimson_Text({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400"
})

export const metadata: Metadata = {
  title: "TCG Quiz - Battle of Developers",
  description: "Um jogo de cartas para apresentar a equipe de desenvolvimento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${crismonText.variable} ${cinzel.variable} antialiased`}
      >
        <GameConfigProvider>
          {children}
        </GameConfigProvider>
      </body>
    </html>
  );
}
