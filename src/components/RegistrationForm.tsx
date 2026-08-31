"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, UploadCloud, Loader2 } from "lucide-react";

type FormData = {
  generalEmail: string;
  teamName: string;
  collegeName: string;
  leaderName: string;
  leaderDept: string;
  leaderYear: string;
  leaderPhone: string;
  leaderEmail: string;
  m1Name: string;
  m1Dept: string;
  m1Year: string;
  m1Phone: string;
  m1Email: string;
  m2Name: string;
  m2Dept: string;
  m2Year: string;
  m2Phone: string;
  m2Email: string;
  m3Name: string;
  m3Dept: string;
  m3Year: string;
  m3Phone: string;
  m3Email: string;
  agreeToRules: boolean;
};

const initialFormData: FormData = {
  generalEmail: "",
  teamName: "",
  collegeName: "",
  leaderName: "",
  leaderDept: "",
  leaderYear: "",
  leaderPhone: "",
  leaderEmail: "",
  m1Name: "",
  m1Dept: "",
  m1Year: "",
  m1Phone: "",
  m1Email: "",
  m2Name: "",
  m2Dept: "",
  m2Year: "",
  m2Phone: "",
  m2Email: "",
  m3Name: "",
  m3Dept: "",
  m3Year: "",
  m3Phone: "",
  m3Email: "",
  agreeToRules: false,
};

const departments = [
  "AI & Machine Learning",
  "AI & Data Science",
  "Information Science",
  "Computer Science",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Other",
];

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [paymentImage, setPaymentImage] = useState<string | null>(null);
  const [paymentFileName, setPaymentFileName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be under 5MB.");
        return;
      }
      setPaymentFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToRules) {
      alert("You must agree to the Rules & Guidelines.");
      return;
    }
    if (!paymentImage) {
      alert("Please upload payment proof.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // Replace this URL with the Google Apps Script Web App URL after deployment
      const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";
      
      if (SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL") {
        throw new Error("Google Apps Script URL is not configured yet. Check implementation plan.");
      }

      const payload = {
        ...formData,
        paymentImageBase64: paymentImage.split(",")[1], // Remove data URL prefix
        paymentFileName: paymentFileName,
        mimeType: paymentImage.substring(paymentImage.indexOf(":") + 1, paymentImage.indexOf(";")),
      };

      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script unless properly configured with JSONP or specific headers
        headers: {
          "Content-Type": "text/plain", // Use text/plain for no-cors
        },
        body: JSON.stringify(payload),
      });

      // With no-cors, we can't reliably read the response status, assuming success if no throw
      setSubmitStatus("success");
      setFormData(initialFormData);
      setPaymentImage(null);
      setPaymentFileName("");
    } catch (error: any) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      setErrorMessage(error.message || "An error occurred while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <h2 className="font-display text-5xl text-accent-gold mb-6">Registration Complete!</h2>
          <p className="text-xl text-foreground/80 mb-8">
            Your team has been successfully registered for Code Hunt 3.0. We will contact you soon with further details.
          </p>
          <button
            onClick={() => setSubmitStatus("idle")}
            className="px-8 py-4 bg-transparent border-2 border-white/20 text-off-white font-bold text-lg rounded hover:border-accent-blue hover:text-accent-blue transition-all"
          >
            Register Another Team
          </button>
        </motion.div>
      </div>
    );
  }

  const InputField = ({ label, name, type = "text", required = false }: any) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold uppercase tracking-wider text-foreground/70">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={formData[name as keyof FormData] as string}
        onChange={handleChange}
        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-off-white focus:outline-none focus:border-accent-gold transition-colors"
      />
    </div>
  );

  const SelectField = ({ label, name, options, required = false }: any) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold uppercase tracking-wider text-foreground/70">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        required={required}
        value={formData[name as keyof FormData] as string}
        onChange={handleChange}
        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-off-white focus:outline-none focus:border-accent-gold transition-colors appearance-none"
      >
        <option value="" disabled className="text-gray-500 bg-background">Select {label.replace(" *", "")}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt} className="bg-background">{opt}</option>
        ))}
      </select>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-12 pb-20">
      
      {submitStatus === "error" && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-500 font-bold mb-8">
          {errorMessage || "There was an error submitting your registration. Please try again."}
        </div>
      )}

      {/* General Info */}
      <section className="space-y-6">
        <h3 className="text-2xl font-display text-accent-blue border-b border-white/10 pb-2">General Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Registration Email" name="generalEmail" type="email" required />
          <InputField label="Team Name" name="teamName" required />
          <InputField label="College Name" name="collegeName" required />
        </div>
      </section>

      {/* Team Leader */}
      <section className="space-y-6">
        <h3 className="text-2xl font-display text-accent-gold border-b border-white/10 pb-2">Team Leader Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Leader Name" name="leaderName" required />
          <SelectField label="Leader Department" name="leaderDept" options={departments} required />
          <SelectField label="Leader Year" name="leaderYear" options={years} required />
          <InputField label="Leader Phone" name="leaderPhone" type="tel" required />
          <InputField label="Leader Email" name="leaderEmail" type="email" required />
        </div>
      </section>

      {/* Member 1 */}
      <section className="space-y-6">
        <h3 className="text-2xl font-display text-off-white border-b border-white/10 pb-2">Member 1 (Required)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Member 1 Name" name="m1Name" required />
          <SelectField label="Member 1 Department" name="m1Dept" options={departments} required />
          <SelectField label="Member 1 Year" name="m1Year" options={years} required />
          <InputField label="Member 1 Phone" name="m1Phone" type="tel" required />
          <InputField label="Member 1 Email" name="m1Email" type="email" required />
        </div>
      </section>

      {/* Member 2 */}
      <section className="space-y-6 opacity-80 hover:opacity-100 transition-opacity">
        <h3 className="text-2xl font-display text-off-white border-b border-white/10 pb-2">Member 2 (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Member 2 Name" name="m2Name" />
          <SelectField label="Member 2 Department" name="m2Dept" options={departments} />
          <SelectField label="Member 2 Year" name="m2Year" options={years} />
          <InputField label="Member 2 Phone" name="m2Phone" type="tel" />
          <InputField label="Member 2 Email" name="m2Email" type="email" />
        </div>
      </section>

      {/* Member 3 */}
      <section className="space-y-6 opacity-80 hover:opacity-100 transition-opacity">
        <h3 className="text-2xl font-display text-off-white border-b border-white/10 pb-2">Member 3 (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Member 3 Name" name="m3Name" />
          <SelectField label="Member 3 Department" name="m3Dept" options={departments} />
          <SelectField label="Member 3 Year" name="m3Year" options={years} />
          <InputField label="Member 3 Phone" name="m3Phone" type="tel" />
          <InputField label="Member 3 Email" name="m3Email" type="email" />
        </div>
      </section>

      {/* Payment Upload */}
      <section className="space-y-6">
        <h3 className="text-2xl font-display text-accent-blue border-b border-white/10 pb-2">Payment Proof</h3>
        <p className="text-sm text-foreground/70 mb-4">Please upload a screenshot of your payment after scanning the QR code.</p>
        
        <div className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center relative hover:bg-white/5 transition-colors cursor-pointer group">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            required
          />
          {paymentImage ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded overflow-hidden mb-2 relative">
                <img src={paymentImage} alt="Payment Proof" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-bold text-accent-gold">{paymentFileName}</span>
              <span className="text-xs text-foreground/50 group-hover:text-foreground/80 transition-colors">Click to change file</span>
            </div>
          ) : (
            <>
              <UploadCloud size={40} className="text-foreground/40 mb-4 group-hover:text-accent-gold transition-colors" />
              <span className="text-lg font-bold mb-1">Click to upload or drag and drop</span>
              <span className="text-sm text-foreground/50">PNG, JPG up to 5MB</span>
            </>
          )}
        </div>
      </section>

      {/* Rules & Submit */}
      <section className="space-y-8 pt-8">
        <label className="flex items-start gap-4 cursor-pointer group">
          <div className="relative flex items-center justify-center mt-1">
            <input
              type="checkbox"
              name="agreeToRules"
              checked={formData.agreeToRules}
              onChange={handleChange}
              className="appearance-none w-6 h-6 border-2 border-white/20 rounded bg-white/5 checked:bg-accent-gold checked:border-accent-gold transition-all cursor-pointer"
              required
            />
            {formData.agreeToRules && (
              <svg className="absolute w-4 h-4 text-background pointer-events-none" viewBox="0 0 14 14" fill="none">
                <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor"/>
              </svg>
            )}
          </div>
          <span className="text-foreground/80 group-hover:text-off-white transition-colors">
            I confirm that all team members agree to the{" "}
            <a href="/#rules" target="_blank" className="text-accent-gold hover:underline font-bold">
              Rules & Guidelines
            </a>{" "}
            of Code Hunt.
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group w-full flex items-center justify-center gap-2 px-8 py-5 bg-accent-gold text-background font-bold text-xl rounded hover:bg-accent-gold/90 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Processing Registration...
            </>
          ) : (
            <>
              INITIALIZE REGISTRATION
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </section>
    </form>
  );
}
