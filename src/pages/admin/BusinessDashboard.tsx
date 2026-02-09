import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { productService } from '../../services/product.service';
import type { Product } from '../../types';
import {
    Plus,
    Package,
    Trash2,
    Edit,
    Search,
    DollarSign,
    Layers,
    ArrowLeft,
    Loader2,
    ChevronRight,
    Image as ImageIcon
} from 'lucide-react';
import { gsap } from 'gsap';

const BusinessDashboard: React.FC = () => {
    const { activeBusinessId } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        images: [] as string[]
    });

    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeBusinessId) {
            loadProducts();
        }
    }, [activeBusinessId]);

    useEffect(() => {
        if (!loading && gridRef.current) {
            gsap.fromTo(
                gridRef.current.children,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(1.2)' }
            );
        }
    }, [loading, isAdding]);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const data = await productService.getProducts(activeBusinessId!);
            setProducts(data);
        } catch (error) {
            console.error('Error loading products:', error);
        }
        setLoading(false);
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeBusinessId || !newProduct.name) return;

        try {
            await productService.addProduct(activeBusinessId, newProduct);
            setIsAdding(false);
            setNewProduct({ name: '', description: '', price: 0, stock: 0, category: '', images: [] });
            loadProducts();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-10 pb-20">
            {/* Context Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-[0.2em]">
                        <Layers size={14} /> Global Nexus / Core Inventory
                    </div>
                    <h1 className="text-4xl font-black tracking-tight">Product <span className="text-slate-500">Catalog</span></h1>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Filter stock..."
                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2 active:scale-95"
                    >
                        <Plus size={20} strokeWidth={3} /> <span className="hidden sm:inline">Add Unit</span>
                    </button>
                </div>
            </div>

            {isAdding && (
                <div className="glass p-10 rounded-[2.5rem] border-2 border-indigo-500/20 animate-in zoom-in-95 duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                        <Package size={200} />
                    </div>

                    <div className="flex justify-between items-center mb-8 relative z-10">
                        <h3 className="text-2xl font-bold flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
                                <Plus size={20} />
                            </div>
                            Provision New Asset
                        </h3>
                        <button onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-white transition-colors">
                            <ArrowLeft size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        <div className="md:col-span-2 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-500 tracking-widest ml-1">Asset Nomenclature</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Quantum Processor X1"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-500 tracking-widest ml-1">Technical Specification / Meta</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Provide detailed description and key features..."
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-500 tracking-widest ml-1">Valuation (USD)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" size={20} />
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-xl"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-500 tracking-widest ml-1">Inventory Quantum</label>
                                <input
                                    type="number"
                                    required
                                    value={newProduct.stock}
                                    onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-500 tracking-widest ml-1">Classification Category</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Hardware, Software"
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                                />
                            </div>

                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-3">
                                Commit to Registry <ChevronRight size={24} />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 glass rounded-[3rem] border border-slate-800 space-y-4">
                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                    <p className="text-slate-500 font-black tracking-widest uppercase text-xs animate-pulse">Accessing Secure Node...</p>
                </div>
            ) : (
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="glass group rounded-3xl border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-500 flex flex-col overflow-hidden">
                            <div className="aspect-square bg-slate-900 relative overflow-hidden flex items-center justify-center group-hover:bg-slate-800/50 transition-colors">
                                <ImageIcon className="text-slate-800 group-hover:text-indigo-500/20 transition-all duration-700" size={120} />
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/5 text-[10px] font-black tracking-widest uppercase">
                                    ID: {product.id.slice(0, 8)}
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex gap-2">
                                    <button className="flex-1 bg-white text-black py-2.5 rounded-xl text-xs font-black shadow-xl">QUICK EDIT</button>
                                    <button
                                        onClick={async (e) => {
                                            e.stopPropagation();
                                            if (confirm('Decommission this asset?')) {
                                                await productService.deleteProduct(activeBusinessId!, product.id);
                                                loadProducts();
                                            }
                                        }}
                                        className="bg-red-500/20 hover:bg-red-500 p-2.5 rounded-xl text-red-400 hover:text-white transition-all border border-red-500/20"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 space-y-4 flex-1 flex flex-col">
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] uppercase font-black text-indigo-400 tracking-widest">{product.category || 'Standard Node'}</span>
                                        <span className="text-xs font-bold text-slate-500">Stock: {product.stock}</span>
                                    </div>
                                    <h3 className="text-xl font-bold line-clamp-1 group-hover:text-white transition-colors">{product.name}</h3>
                                    <p className="text-sm text-slate-500 mt-2 line-clamp-2 font-medium leading-relaxed">{product.description}</p>
                                </div>

                                <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">Valuation</span>
                                        <span className="text-2xl font-black text-white">${product.price.toLocaleString()}</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-500 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-all">
                                        <Edit size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredProducts.length === 0 && !isAdding && (
                        <div className="col-span-full py-32 text-center glass rounded-[3rem] border-dashed border-2 border-slate-800">
                            <Layers className="mx-auto mb-6 opacity-20 text-slate-400" size={64} />
                            <h3 className="text-2xl font-bold mb-2 text-slate-300">Nexus Data Empty</h3>
                            <p className="max-w-md mx-auto text-slate-500 font-medium text-sm">No assets detected within this business node. Initialize your catalog by provisioning your first unit.</p>
                            <button
                                onClick={() => setIsAdding(true)}
                                className="mt-8 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white px-8 py-3 rounded-2xl font-bold transition-all border border-indigo-500/20"
                            >
                                Provision Asset
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BusinessDashboard;
