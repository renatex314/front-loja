import { Roboto } from "next/font/google";
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
      <body className={roboto.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
