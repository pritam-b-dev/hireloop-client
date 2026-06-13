import AuthNav from "../../components/AuthNav";

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthNav />
      <main className="grow flex items-center justify-center">{children}</main>
    </div>
  );
}
