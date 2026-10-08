import React from 'react';
import { ShieldCheck, Truck, Lock, RotateCcw, Headphones } from 'lucide-react';

export const WhyNexora: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '100% Genuine Products',
      description: 'Zero refurbished grey market stock. Every unit is brand new, sealed, and traceable to official national distributors.',
    },
    {
      icon: Truck,
      title: 'Fast & Insured Delivery',
      description: 'Tamper-evident transit boxes with tamper seals and real-time live GPS tracking across all major Indian cities.',
    },
    {
      icon: Lock,
      title: 'Bank-Grade Security',
      description: '256-bit encrypted transactions supporting instant UPI QR, RuPay, cards, zero-cost EMI, and Cash on Delivery.',
    },
    {
      icon: RotateCcw,
      title: '7-Day Replacement Guarantee',
      description: 'Instant hassle-free door pick-up and replacement if your package exhibits any manufacturer flaw on arrival.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Tech Concierge',
      description: 'Hardware specialists on standby to assist with compatibility inquiries, configuration, and setup assistance.',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            The NEXORA Advantage
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">
            Engineered For Serious Hardware Buyers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            We built NEXORA to eliminate the friction, counterfeit anxiety, and poor support common in generic e-commerce platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
