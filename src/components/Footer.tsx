import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Truck, RefreshCw, Headphones, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { addToast } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSubscribed(true);
    addToast('Thank you! You are now subscribed to NEXORA tech bulletins.');
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800 transition-colors">
      
      {/* 4 Pillars of NEXORA Trust Banner */}
      <div className="border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight">100% Genuine Hardware</h4>
                <p className="text-xs text-slate-400 mt-1">Direct from official global brands with manufacturer warranty.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight">Express Insured Delivery</h4>
                <p className="text-xs text-slate-400 mt-1">Free pan-India priority transit for all orders above ₹4,999.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <RefreshCw className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight">7-Day Replacement Guarantee</h4>
                <p className="text-xs text-slate-400 mt-1">Zero-hassle replacement if damaged or defective on arrival.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight">Dedicated Tech Concierge</h4>
                <p className="text-xs text-slate-400 mt-1">Expert hardware advisors available 9 AM - 9 PM IST daily.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-lg">
                N
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-display">
                NEXORA
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              NEXORA is a premier electronics-only online marketplace designed for enthusiasts, creators, and power users. We provide verified authentic computers, smartphones, gaming consoles, and studio audio hardware across India.
            </p>
            
            {/* Newsletter Form */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                Subscribe to Hardware Bulletins
              </span>
              {isSubscribed ? (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs">
                  <Check className="w-4 h-4" />
                  <span>Subscribed! Check your inbox for exclusive release drops.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter work or personal email..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Catalog Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Electronics
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('catalog', 'laptops')} className="hover:text-white transition-colors">
                  Pro Laptops & Ultrabooks
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog', 'smartphones')} className="hover:text-white transition-colors">
                  Flagship 5G Smartphones
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog', 'audio')} className="hover:text-white transition-colors">
                  Studio Noise-Canceling Audio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog', 'gaming')} className="hover:text-white transition-colors">
                  PlayStation & Esports Rig
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog', 'monitors')} className="hover:text-white transition-colors">
                  4K OLED & Curved Monitors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog', 'components')} className="hover:text-white transition-colors">
                  GPUs & Internal SSDs
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('orders')} className="hover:text-white transition-colors">
                  Track Existing Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('account')} className="hover:text-white transition-colors">
                  Customer Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Concierge Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Warranty & Authenticity
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About NEXORA
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('deals')} className="hover:text-white transition-colors">
                  Seasonal Hardware Sales
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Corporate Inquiries
                </button>
              </li>
              <li>
                <span className="text-slate-500">Bangalore · Mumbai · New Delhi</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Secure Payments, Compliance & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} NEXORA Marketplace Technologies Inc. All rights reserved. “Technology, Upgraded.”
          </div>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400">Accepted Payments:</span>
            <span className="px-2 py-1 rounded bg-slate-800 text-[10px] font-bold text-slate-300">UPI</span>
            <span className="px-2 py-1 rounded bg-slate-800 text-[10px] font-bold text-slate-300">RuPay</span>
            <span className="px-2 py-1 rounded bg-slate-800 text-[10px] font-bold text-slate-300">Visa</span>
            <span className="px-2 py-1 rounded bg-slate-800 text-[10px] font-bold text-slate-300">Mastercard</span>
            <span className="px-2 py-1 rounded bg-slate-800 text-[10px] font-bold text-slate-300">Net Banking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
