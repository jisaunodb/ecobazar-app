import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import toast from "react-hot-toast";
export const ContactPage = () => {
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      toast.success("Thank you for reaching out! Our team will respond within 24 hours.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1e3);
  };
  return <div className="flex flex-col gap-8 pb-12">
      <Breadcrumb items={[{ label: "Contact Us" }]} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {
    /* Contact Info Card */
  }
        <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-8 shadow-soft flex flex-col gap-6 justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Get In Touch</span>
            <h2 className="text-2xl font-black">We'd Love To Hear From You</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Have questions about an organic order, vendor registration, or farm partnerships? Drop us a message!
            </p>
          </div>

          <div className="flex flex-col gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-3 p-3 bg-slate-800/60 rounded-2xl">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>100 Organic Valley Way, San Francisco, CA 94107</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-800/60 rounded-2xl">
              <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>+1 (800) 555-ECOB / (555) 019-2834</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-800/60 rounded-2xl">
              <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>support@ecobazar.com</span>
            </div>
          </div>
        </div>

        {
    /* Contact Form */
  }
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-soft">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">Send Us A Message</h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
    label="Your Name"
    placeholder="Sarah Jenkins"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
  />
              <Input
    label="Your Email"
    type="email"
    placeholder="sarah@example.com"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  />
            </div>

            <Input
    label="Subject"
    placeholder="Order Query / Farm Inquiry"
    value={formData.subject}
    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
  />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Message
              </label>
              <textarea
    rows={5}
    placeholder="How can we assist you today?"
    value={formData.message}
    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
  />
            </div>

            <Button
    type="submit"
    size="lg"
    isLoading={isSending}
    className="mt-2"
    leftIcon={<Send className="w-4 h-4" />}
  >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>;
};
