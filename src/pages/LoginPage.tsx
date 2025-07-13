import LeftPanel from "@/components/auth/left-panel";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login-bg.jpg')" }}
    >
      <div className="relative flex w-full max-w-6xl min-h-[600px] rounded-2xl overflow-hidden shadow-lg border-2 border-white">
        <LeftPanel type="login" />
        <LoginForm />
      </div>
    </div>
  );
}
