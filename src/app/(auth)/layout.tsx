import AuthProvider from "@/providers/AuthProvider";
import NavBar from "../components/NavBar";

interface AuthLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <AuthProvider onDeauthRoute="/login">
      <div className="h-full w-full overflow-hidden bg-gray-50">
        <NavBar />
        {children}
      </div>
    </AuthProvider>
  );
};

export default AuthLayout;
