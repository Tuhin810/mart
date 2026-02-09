import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';

const StoreHero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-content', {
                y: 60, opacity: 0, duration: 1.2, ease: 'power4.out', delay: 0.2
            });
            gsap.from('.hero-image', {
                scale: 1.1, opacity: 0, duration: 1.5, ease: 'power2.out'
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="px-6 py-8">
            <div className="max-w-[1440px] mx-auto relative rounded-[40px] overflow-hidden bg-[#e5e7e9] min-h-[500px] md:h-[650px] flex items-center group">
                {/* Mock background image/color with cutout effect */}
                <div className="absolute inset-0 hero-image bg-[url('https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-black/5" />

                {/* Content Wrapper */}
                <div className="relative z-10 px-12 md:px-24 w-full hero-content">
                    <div className="max-w-2xl space-y-8">
                        <h1 className="text-6xl md:text-8xl font-medium tracking-tight leading-[1.1] text-white">
                            We are digital meets fashions
                        </h1>

                        <p className="flex items-center gap-3 text-white/90 font-medium">
                            <ArrowUpRight size={20} className="rotate-[135deg]" />
                            Show your vstore pride. get high-quality<br />
                            swag directly from the vstore foundation.
                        </p>

                        <div className="flex items-center gap-4">
                            <button className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-black hover:text-white transition-all group/btn">
                                Start shopping
                                <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover/btn:border-white/20 transition-colors">
                                    <ArrowUpRight size={18} />
                                </div>
                            </button>
                            <button className="text-white font-bold underline underline-offset-8 decoration-2 px-4 py-2 hover:opacity-70 transition-opacity">
                                Top collections
                            </button>
                        </div>
                    </div>

                    <div className="absolute right-12 bottom-12 flex items-center gap-10 text-white/60 text-xs font-bold uppercase tracking-[0.2em] md:block hidden">
                        <p className="text-right">Transforming into stylish<br />& functional pieces</p>
                    </div>
                </div>

                {/* Carousel Nav */}
                <div className="absolute top-12 right-12 flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default StoreHero;
