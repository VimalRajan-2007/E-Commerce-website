import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { addToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      addToast('Please fill all required inquiry fields', 'error');
      return;
    }
    setIsSubmitted(true);
    addToast('Your support inquiry has been logged! Our hardware concierge will respond shortly.');
  };

  const faqs = [
    {
      q: 'How does NEXORA guarantee genuine electronic hardware?',
      a: 'All inventory is procured exclusively via direct relationships with authorized national distributors (Apple India, Samsung India, Sony India, etc.). Every serial number is scanned and matched with manufacturer warranty registries prior to dispatch.',
    },
    {
      q: 'What is the standard delivery timeline for high-value orders?',
      a: 'Metro areas (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai) receive express fulfillment within 24 to 48 hours. Non-metro regions receive deliveries within 2 to 4 business days via insured air cargo.',
    },
    {
      q: 'What if my package arrives damaged or DOA (Dead on Arrival)?',
      a: 'Every shipment is covered by our 7-Day Replacement Guarantee. Simply open a ticket via your customer dashboard with unboxing photos, and an immediate swap will be scheduled with door pick-up at zero additional expense.',
    },
    {
      q: 'Are No-Cost EMI and corporate GST invoices available?',
      a: 'Yes. All checkout orders support No-Cost EMI across major banks (HDFC, ICICI, SBI, Axis), and downloadable GST tax invoices are generated automatically inside your account portal upon dispatch.',
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Hardware Concierge & Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
            We're Here to Help
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Have questions regarding specifications compatibility, shipping schedules, or corporate procurement? Reach out to our dedicated support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Channels */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-6">
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
                Official Support Channels
              </h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-950 flex items-center justify-center text-cyan-500 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Toll-Free Phone Support</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      1800-419-NEXORA
                    </span>
                    <span className="text-slate-500 block text-[11px] mt-0.5">
                      (1800 419 6396)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-500 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Email Concierge</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      support@nexora.io
                    </span>
                    <span className="text-slate-500 block text-[11px] mt-0.5">
                      Average response time: &lt; 2 hours
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-500 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Operational Hours</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      9:00 AM – 9:00 PM IST
                    </span>
                    <span className="text-slate-500 block text-[11px] mt-0.5">
                      Monday through Sunday (All 7 Days)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-500 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Headquarters & Tech Hub</span>
                    <p className="font-medium text-slate-800 dark:text-slate-200 text-xs leading-relaxed mt-0.5">
                      NEXORA Marketplace Technologies, 7th Floor, Outer Ring Road, Indiranagar / Devarabeesanahalli, Bengaluru, Karnataka 560103
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
              Send a Direct Message
            </h2>

            {isSubmitted ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Message Logged Successfully
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                  A support ticket has been created for your inquiry. One of our engineers will reply to {email} within 2 business hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-500 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Mercer"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl border-slate-200 dark:border-slate-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex.mercer@nexora.io"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl border-slate-200 dark:border-slate-700"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-500 block mb-1">Order ID (Optional)</label>
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="e.g. NX-2026-89412"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="text-slate-500 block mb-1">Your Message or Technical Question *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe how we can assist you..."
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl border-slate-200 dark:border-slate-700"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-cyan-600 dark:hover:bg-cyan-400 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {faq.q}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
