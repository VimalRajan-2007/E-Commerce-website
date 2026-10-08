import React from 'react';
import { ShieldCheck, Cpu, Zap, HeartHandshake, Award, Truck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            About NEXORA
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight text-balance">
            Technology, Upgraded.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A technology-focused digital marketplace built to make premium electronics easier to discover, compare and purchase.
          </p>
        </div>

        {/* Narrative Card */}
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            The Purpose Behind NEXORA
          </h2>
          <p>
            Modern technology retail has become cluttered with grey-market imports, deceptive counterfeit peripherals, and opaque specification sheets. At NEXORA, our premise is simple: build an electronics-only marketplace designed exclusively for people who take hardware seriously.
          </p>
          <p>
            Whether you are compiling multi-million line codebases on an Apple M3 Max workstation, editing 8K RAW cinema footage, or competing at the highest tier of esports gaming, you deserve authentic, factory-sealed hardware with zero compromises.
          </p>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950 flex items-center justify-center text-cyan-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              100% Genuine Guarantee
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every serial number is logged and certified with authorized Indian brand distribution partners.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-500">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Deep Tech Specifications
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We catalog real hardware benchmarks, thermal designs, screen nit ratings, and bandwidth limits instead of generic marketing copy.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-500">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Insured Air Logistics
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Priority sealed transport containers with tamper tape prevent transit damage and guarantee rapid delivery.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
