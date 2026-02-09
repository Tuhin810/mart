import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Search,
    Trash2,
    ExternalLink,
    Building2,
    MapPin,
    Globe,
    ArrowUpRight,
    Users,
    Package,
    X,
    Filter
} from 'lucide-react';
import { businessService } from '../../services/business.service';
import type { Business } from '../../types';

const Stores: React.FC = () => {
    const navigate = useNavigate();
    const [stores, setStores] = useState<Business[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    const [newName, setNewName] = useState('');

    useEffect(() => {
        loadStores();
    }, []);

    const loadStores = async () => {
        try {
            setLoading(true);
            const data = await businessService.getAllBusinesses();
            setStores(data || []);
        } catch {
            setStores([]);
        } finally {
            setLoading(false);
        }
    };

    const stats = [
        { label: 'Total Stores', value: stores.length.toString(), trend: 'Increased from last month', active: true, icon: Building2 },
        { label: 'Active Merchants', value: stores.length.toString(), trend: 'Increased from last month', active: false, icon: ArrowUpRight },
        { label: 'Global Nodes', value: '1', trend: 'Increased from last month', active: false, icon: Globe },
        { label: 'Pending Apps', value: '2', trend: 'On Analytics', active: false, icon: ArrowUpRight },
    ];

    return (
        <div className="space-y-8 pb-10 animate-in fade-in duration-500">
            {/* Page Header - Exactly like Dashboard */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Businesses</h1>
                    <p className="text-gray-400 text-sm mt-1 font-medium">Manage and monitor all active merchant nodes in the network.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowAdd(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#1F4D36] text-white rounded-full text-sm font-bold shadow-lg shadow-emerald-900/10 hover:opacity-90 transition-all hover:scale-105 active:scale-95"
                    >
                        <Plus size={18} />
                        Register Store
                    </button>
                    <button className="px-5 py-2.5 bg-white border border-gray-100 text-gray-900 rounded-full text-sm font-bold shadow-sm hover:bg-gray-50 transition-all border-gray-300">
                        Merchant Logs
                    </button>
                </div>
            </div>

            {/* Stats Row - Exactly like Dashboard */}
            <div className="grid grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className={`p-6 rounded-3xl relative overflow-hidden group transition-all duration-300 ${stat.active
                                ? 'bg-gradient-to-br from-[#1F4D36] to-[#143424] text-white shadow-xl shadow-emerald-900/20'
                                : 'bg-white border border-gray-50 shadow-sm hover:shadow-md'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-sm font-bold ${stat.active ? 'text-gray-200' : 'text-gray-900'}`}>{stat.label}</span>
                            <div className={`p-2 rounded-full ${stat.active ? 'bg-white/10 text-white' : 'bg-gray-50 text-gray-400'} border border-gray-100/10 group-hover:rotate-12 transition-transform`}>
                                <stat.icon size={16} />
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold mb-4 tracking-tight">{stat.value}</h2>
                        <div className="flex items-center gap-2">
                            {stat.active ? (
                                <div className="w-5 h-5 rounded bg-emerald-400/20 flex items-center justify-center">
                                    <ArrowUpRight size={12} className="text-emerald-400" />
                                </div>
                            ) : (
                                <div className="w-5 h-5 rounded bg-emerald-50 flex items-center justify-center">
                                    <ArrowUpRight size={12} className="text-emerald-500" />
                                </div>
                            )}
                            <span className={`text-[10px] font-bold ${stat.active ? 'text-gray-300' : 'text-gray-400'}`}>{stat.trend}</span>
                        </div>
                        {stat.active && (
                            <div className="absolute -right-2 -bottom-2 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
                        )}
                    </div>
                ))}
            </div>

            {/* Merchant List Section - Matching Dashboard Cards */}
            <div className="grid grid-cols-12 gap-6">
                {/* Search & Filters Card */}
                <div className="col-span-12 bg-white p-6 rounded-[32px] shadow-sm border border-gray-50 flex items-center justify-between">
                    <div className="relative group flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1F4D36] transition-colors" size={18} />
                        <input
                            placeholder="Search by store name, ID or merchant..."
                            className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-12 pr-6 text-sm font-medium shadow-none focus:ring-2 focus:ring-emerald-500/10 transition-all outline-none"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gray-50 text-gray-500 text-sm font-bold hover:bg-gray-100 transition-all">
                            <Filter size={18} />
                            Filters
                        </button>
                        <button className="px-4 py-3 rounded-2xl bg-gray-900 text-white text-sm font-bold hover:opacity-90 transition-all">
                            View Reports
                        </button>
                    </div>
                </div>

                {/* Main Content Area - Multi-column layout matching Dashboard */}
                <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-[32px] shadow-sm border border-gray-50">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="font-bold text-gray-900">Merchant Directory</h3>
                        <div className="flex gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Status: Live</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="h-20 bg-gray-50 rounded-[20px] animate-pulse" />
                            ))
                        ) : stores.length === 0 ? (
                            <div className="py-20 flex flex-col items-center justify-center text-center">
                                <Building2 size={48} className="text-gray-100 mb-4" />
                                <p className="text-gray-400 font-bold">No active merchants detected</p>
                            </div>
                        ) : (
                            stores.map(store => (
                                <div
                                    key={store.id}
                                    onClick={() => navigate(`/admin/${store.id}`)}
                                    className="flex items-center justify-between p-4 rounded-[24px] hover:bg-gray-50/80 border border-transparent hover:border-gray-100 transition-all group cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-[#1F4D36] flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-emerald-900/10 group-hover:scale-105 transition-transform">
                                            {store.name?.[0]?.toUpperCase()}
                                        </div>
                                        <div className="leading-tight">
                                            <p className="text-sm font-bold text-gray-900">{store.name}</p>
                                            <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight flex items-center gap-2">
                                                <MapPin size={10} className="text-emerald-500" />
                                                Node ID: {store.id?.slice(0, 8)}
                                                <span className="text-gray-200">•</span>
                                                Registered: System Core
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 pr-4">
                                        <div className="hidden sm:flex flex-col items-end">
                                            <span className="text-[11px] font-bold text-gray-900">Active Licenses</span>
                                            <span className="text-[10px] text-gray-400 font-bold">Priority Support</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (confirm('Permanently remove this merchant?')) {
                                                        businessService.deleteBusiness(store.id);
                                                        loadStores();
                                                    }
                                                }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <button className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white shadow-lg hover:scale-110 active:scale-95 transition-all">
                                                <ExternalLink size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Secondary Column matching Dashboard's structure */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Insights Card */}
                    <div className="bg-[#041E16] p-8 rounded-[32px] text-white relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl opacity-50 group-hover:bg-emerald-500/30 transition-colors" />
                        <div className="relative z-10">
                            <h3 className="font-bold text-xl mb-2">Merchant Insights</h3>
                            <p className="text-gray-400 text-xs font-medium mb-8">System-wide performance metrics for registered nodes.</p>

                            <div className="space-y-6">
                                {[
                                    { label: 'Network Uptime', val: '99.9%', color: 'bg-emerald-500' },
                                    { label: 'API Response', val: '42ms', color: 'bg-blue-500' },
                                    { label: 'Data Sync', val: 'Live', color: 'bg-amber-500' },
                                ].map((node, i) => (
                                    <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${node.color} animate-pulse`} />
                                            <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">{node.label}</span>
                                        </div>
                                        <span className="text-sm font-bold">{node.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Support Channels matching Reminders style */}
                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-50">
                        <h3 className="font-bold text-gray-900 mb-6">Support Channels</h3>
                        <div className="space-y-1">
                            <h4 className="text-lg font-bold text-[#1F4D36] leading-tight">Emergency Protocol</h4>
                            <p className="text-gray-400 text-xs mt-2 font-medium leading-relaxed">System-wide maintenance is scheduled for Feb 12th. Please notify merchants.</p>
                        </div>
                        <button className="w-full py-4 bg-[#1F4D36] text-white rounded-2xl flex items-center justify-center gap-3 font-bold hover:opacity-90 transition-all mt-10">
                            Broadcast Notification
                        </button>
                    </div>
                </div>
            </div>

            {/* Registration Modal - Polished */}
            {showAdd && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-6 animate-in zoom-in-95 duration-300">
                    <div className="bg-white rounded-[40px] w-full max-w-md p-10 shadow-2xl relative">
                        <button
                            onClick={() => setShowAdd(false)}
                            className="absolute top-8 right-8 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8">
                            <Building2 size={28} />
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2">New Store Registration</h3>
                        <p className="text-gray-400 text-sm mb-10 font-medium">Create a new business entity in the ecosystem.</p>

                        <form
                            onSubmit={async e => {
                                e.preventDefault();
                                await businessService.createBusiness('system', newName);
                                setNewName('');
                                setShowAdd(false);
                                loadStores();
                            }}
                            className="space-y-8"
                        >
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pl-1">Store Identity</label>
                                <input
                                    autoFocus
                                    required
                                    placeholder="Enter store name..."
                                    value={newName}
                                    onChange={e => setNewName(e.target.value)}
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500/20 focus:bg-white rounded-2xl py-4 px-6 font-bold text-gray-900 outline-none transition-all placeholder:font-medium"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-[#1F4D36] text-white rounded-2xl font-bold shadow-xl shadow-emerald-900/20 hover:opacity-95 transform active:scale-95 transition-all uppercase tracking-widest text-[11px]"
                            >
                                Confirm Registration
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stores;