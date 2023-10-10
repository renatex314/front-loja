"use client";

import { ptBR } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers";
import FeedbackProvider from "../FeedbackProvider";
import QueryProvider from "../QueryProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ThemeProvider, createTheme } from "@mui/material";
import "moment/locale/pt-br";

const theme = createTheme({}, ptBR);

interface AppProviderProps {
  children: React.ReactNode | React.ReactNode[];
}
const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <FeedbackProvider>
      <QueryProvider>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt-br">
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </LocalizationProvider>
      </QueryProvider>
    </FeedbackProvider>
  );
};

export default AppProvider;
