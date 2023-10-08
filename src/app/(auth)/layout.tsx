import AuthProvider from "@/providers/AuthProvider";

interface AuthLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <AuthProvider onDeauthRoute="/login">{children}</AuthProvider>;
};

export default AuthLayout;
