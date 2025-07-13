import LeftPanel from "@/components/auth/left-panel";
import SignUpForm from "@/components/auth/signup-form";

export default function SignUpPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login-bg.jpg')" }}
    >
      <div className="relative flex w-full max-w-6xl min-h-[600px] rounded-2xl overflow-hidden shadow-lg border-2 border-white">
        <LeftPanel type="signup" />
        <SignUpForm />
      </div>
    </div>
  );
}
