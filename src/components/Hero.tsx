import React from 'react';
import { ArrowRight, Flame, ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  onShopClick: () => void;
  onDealsClick: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onDealsClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-8 pb-16 lg:py-20 transition-colors">
      
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200/80 dark:border-cyan-800/80 text-cyan-700 dark:text-cyan-300 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>2026 Flagship Electronics Season Now Live</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white font-display leading-[1.08] text-balance">
              The Future of Technology. Delivered.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover premium electronics, powerful devices and smart technology — all in one place. Handpicked flagship hardware backed by official manufacturer warranties.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onShopClick}
                className="px-7 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-cyan-600 dark:hover:bg-cyan-400 font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-cyan-500/20 flex items-center gap-2 group cursor-pointer"
              >
                <span>Shop Electronics</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onDealsClick}
                className="px-7 py-4 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-amber-500 hover:text-amber-500 font-bold text-sm rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                Explore Deals
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Truck className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Lock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Genuine Products</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <RotateCcw className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-900 group">
              <img
                src="/src/assets/images/hero_flagship_showcase_1791472454257.jpg"
                alt="NEXORA Flagship Hardware Showcase"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Highlight Card 1 */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-800 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    Flagship Trio Spotlight
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">
                    MacBook Pro M3 Max · Galaxy S25 Ultra · Sony WH-1000XM5
                  </p>
                </div>
                <button
                  onClick={onShopClick}
                  className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shrink-0"
                >
                  View Collection
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
