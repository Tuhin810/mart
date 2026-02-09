import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { businessService } from '../../services/business.service';
import { productService } from '../../services/product.service';
import type { Business, Product } from '../../types';
import { ShoppingCart, Package, Heart, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { gsap } from 'gsap';

const Storefront: React.FC = () => {
    const { businessId } = useParams<{ businessId: string }>();
    const [business, setBusiness] = useState<Business | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [cartCount, setCartCount] = useState(0);

    const headerRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const productsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (businessId) {
            loadStoreData();
        }
    }, [businessId]);

    useEffect(() => {
        if (!loading && business) {
            const tl = gsap.timeline();
            if (headerRef.current) {
                tl.from(headerRef.current, { y: -100, opacity: 0, duration: 1, ease: 'power4.out' });
            }
            if (heroRef.current) {
                tl.from(heroRef.current.children, {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out'
                }, '-=0.5');
            }
            if (productsRef.current) {
                gsap.from(productsRef.current.children, {
                    y: 60,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    scrollTrigger: productsRef.current,
                    ease: 'power3.out'
                });
            }
        }
    }, [loading, business]);

    const loadStoreData = async () => {
        setLoading(true);
        try {
            const bData = await businessService.getBusiness(businessId!);
            const pData = await productService.getProducts(businessId!);
            setBusiness(bData);
            setProducts(pData);
        } catch (error) {
            console.error('Error loading store:', error);
        }
        setLoading(false);
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="w-12 h-12 border-4 border-slate-950 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Entering Storeframe...</p>
        </div>
    );

    if (!business) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6">
            <h1 className="text-9xl font-black text-slate-100 absolute select-none">404</h1>
            <div className="relative z-10 space-y-4">
                <h2 className="text-3xl font-bold">Store Not Found</h2>
                <p className="text-slate-500 max-w-sm">The business node you're looking for doesn't exist or has been decommissioned.</p>
                <button onClick={() => window.history.back()} className="bg-slate-950 text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105">Go Back</button>
            </div>
        </div>
    );

    const style = {
        '--primary': business.themeSettings.primaryColor,
        '--secondary': business.themeSettings.secondaryColor,
        'fontFamily': business.themeSettings.fontFamily || 'Inter, sans-serif'
    } as React.CSSProperties;

    return (
        <div className="min-h-screen bg-[#fafafa] selection:bg-[var(--primary)] selection:text-white" style={style}>
            {/* Dynamic Header */}
            <header ref={headerRef} className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-black shadow-lg shadow-[var(--primary)]/20">
                            {business.name[0]}
                        </div>
                        <h1 className="text-2xl font-black tracking-tighter text-slate-900">
                            {business.name}
                        </h1>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500">
                        <a href="#" className="text-slate-900 border-b-2 border-[var(--primary)] pb-1">Shop</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Featured</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Catalog</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Inquiry</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="p-3 hover:bg-slate-50 rounded-2xl relative transition-all group active:scale-95">
                            <ShoppingCart className="text-slate-900 group-hover:scale-110 transition-transform" size={24} />
                            {cartCount > 0 && (
                                <span className="absolute top-2 right-2 bg-[var(--primary)] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-bold animate-in zoom-in">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section ref={heroRef} className="relative py-32 px-6 overflow-hidden bg-white">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[var(--primary)]/5 to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
                    <span className="inline-block px-4 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs font-black tracking-widest uppercase mb-4">
                        Premium Node Collection 2026
                    </span>
                    <h2 className="text-6xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter">
                        Experience <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                            {business.name}
                        </span>
                    </h2>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                        Precision crafted assets curated for the modern decentralized marketplace ecosystem. Higher standards, deeper value.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <button className="bg-slate-950 text-white px-10 py-4 rounded-full font-black hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-slate-950/20">
                            Explore Assets
                        </button>
                        <button className="bg-white text-slate-950 border border-slate-200 px-10 py-4 rounded-full font-black hover:bg-slate-50 transition-all">
                            View Roadmap
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Bar */}
            <div className="bg-slate-50 border-y border-slate-100 py-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: ShieldCheck, label: 'Secure Chain Payments' },
                        { icon: Truck, label: 'Express Infrastructure' },
                        { icon: RotateCcw, label: '30-Day Node Sync' },
                        { icon: Star, label: 'Enterprise Proven' }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[var(--primary)] shadow-sm border border-slate-100">
                                <item.icon size={20} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-wider text-slate-600">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            <main className="max-w-7xl mx-auto px-6 py-24">
                <div className="flex justify-between items-end mb-16">
                    <div className="space-y-1">
                        <span className="text-xs font-black uppercase text-[var(--primary)] tracking-[0.3em]">The Inventory</span>
                        <h3 className="text-4xl font-black text-slate-950 tracking-tighter">Current Assets</h3>
                    </div>
                    <div className="flex bg-white rounded-full p-1 border border-slate-200">
                        {['All', 'Trending', 'New', 'Featured'].map(tab => (
                            <button key={tab} className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${tab === 'All' ? 'bg-slate-950 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}>{tab}</button>
                        ))}
                    </div>
                </div>

                <div ref={productsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {products.length === 0 ? (
                        <div className="col-span-full py-40 text-center glass rounded-[3rem] border-dashed border-2 border-slate-200">
                            <Package className="mx-auto mb-6 opacity-10" size={80} />
                            <h4 className="text-2xl font-bold text-slate-300">Catalog Offline</h4>
                            <p className="text-slate-400 mt-2">Incoming data nodes are being initialized.</p>
                        </div>
                    ) : (
                        products.map((product) => (
                            <div key={product.id} className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-[var(--primary)]/30 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]">
                                <div className="aspect-[4/5] bg-slate-50 relative overflow-hidden flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                                    <Package size={80} className="text-slate-100 group-hover:text-[var(--primary)]/10 transition-all duration-700" />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border border-slate-100">
                                            {product.category || 'Asset'}
                                        </span>
                                    </div>
                                    <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm text-slate-300 hover:text-red-500 transition-colors">
                                        <Heart size={18} />
                                    </button>

                                    <div className="absolute inset-x-4 bottom-4 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                                        <button
                                            onClick={() => setCartCount(prev => prev + 1)}
                                            className="w-full bg-slate-950 text-white py-3 rounded-2xl font-black text-xs tracking-widest transition-all hover:bg-slate-800 shadow-xl active:scale-95"
                                        >
                                            ACQUIRE UNIT
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6 space-y-3 flex-1 flex flex-col">
                                    <div className="flex-1">
                                        <h4 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-[var(--primary)] transition-colors line-clamp-1">{product.name}</h4>
                                        <p className="text-sm text-slate-400 font-medium line-clamp-2 mt-1 leading-relaxed">{product.description}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-300 uppercase leading-none mb-1">Valuation</span>
                                            <span className="text-2xl font-black text-slate-950 leading-none">${product.price.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded-lg">
                                            <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                            <span className="text-[10px] font-black text-yellow-700">4.9</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            {/* Newsletter */}
            <section className="bg-slate-950 py-32 px-6">
                <div className="max-w-4xl mx-auto glass rounded-[4rem] p-12 md:p-20 text-center space-y-8 border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <h3 className="text-4xl font-black text-white tracking-tighter">Stay Synthesized</h3>
                    <p className="text-slate-400 max-w-lg mx-auto font-medium">Be the first to know when new assets are provisioned into the global nexus ecosystem.</p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10">
                        <input type="email" placeholder="Enter your proxy mail..." className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all text-white font-medium" />
                        <button className="bg-[var(--primary)] text-white px-8 py-4 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[var(--primary)]/30">Connect</button>
                    </div>
                </div>
            </section>

            <footer className="bg-white border-t border-slate-100 py-20 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center text-white font-black text-xs">
                            {business.name[0]}
                        </div>
                        <span className="text-lg font-black tracking-tighter text-slate-900">{business.name}</span>
                    </div>

                    <div className="flex gap-10 text-xs font-black uppercase tracking-widest text-slate-400">
                        <a href="#" className="hover:text-slate-900 transition-colors">Privacy Node</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Terms of Ops</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Support Portal</a>
                    </div>

                    <p className="text-slate-400 text-xs font-bold">&copy; 2026 {business.name}. Powered by Antigravity Mart Engine.</p>
                </div>
            </footer>
        </div>
    );
};

export default Storefront;
