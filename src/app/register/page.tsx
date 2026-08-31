import RegistrationForm from "@/components/RegistrationForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Register | Code Hunt 3.0",
  description: "Register your team for Code Hunt 3.0",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto mb-12">
        <Link href="/" className="text-foreground/50 hover:text-accent-gold transition-colors flex items-center gap-2 mb-8 w-fit">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <div className="text-center space-y-4">
          <h1 className="font-display text-5xl md:text-7xl uppercase text-off-white tracking-tight">
            Register Your Team
          </h1>
          {/* Note: User requested payment upload, so I commented out the NO REGISTRATION FEE text to avoid confusion. */}
          {/* <p className="text-accent-gold font-bold uppercase tracking-widest">NO REGISTRATION FEE!</p> */}
          <p className="text-foreground/70">Fields marked with <span className="text-red-500">*</span> are mandatory.</p>
        </div>
      </div>
      <RegistrationForm />
    </div>
  );
}
