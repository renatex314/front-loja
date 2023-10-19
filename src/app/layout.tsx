import { Roboto, Varela } from "next/font/google";
import { Tilt_Neon } from "next/font/google";
import { Pixelify_Sans } from "next/font/google";
import { Varela_Round } from "next/font/google";
import { M_PLUS_Rounded_1c } from "next/font/google";
import { Nunito } from "next/font/google";
import "./globals.css";
import FeedbackProvider from "@/providers/FeedbackProvider";
import QueryProvider from "@/providers/QueryProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import AppProvider from "@/providers/AppProvider";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const tiltNeon = Tilt_Neon({
  weight: "400",
  subsets: ["latin"],
});

const pixelify = Pixelify_Sans({
  weight: "400",
  subsets: ["latin"],
});

const varelaRound = Varela_Round({
  weight: "400",
  subsets: ["latin"],
});

const mPlusRounded1C = M_PLUS_Rounded_1c({
  weight: "500",
  subsets: ["latin"],
});

const nunito = Nunito({
  weight: "600",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet="UTF-8" />
        <title>Front-end loja</title>
      </head>
      <body className={nunito.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
