import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Search,
    Trash2,
    ExternalLink,
    Building2,
    MapPin,
    Globe
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

    return (
        <div className="max-w-[1400px] mx-auto px-6 pb-24 space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white border border-slate-200 rounded-2xl p-8">
                <div>
                    <h1 className="text-3xl font-semibold text-slate-900">Stores</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage all merchant businesses from a single control panel
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            placeholder="Search stores"
                            className="pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl 
                         focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                    </div>

                    <button
                        onClick={() => setShowAdd(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 
                       hover:bg-emerald-700 text-white rounded-xl 
                       text-sm font-medium transition"
                    >
                        <Plus size={16} />
                        New Store
                    </button>
                </div>
            </div>

            {/* Store Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading && (
                    <div className="col-span-full py-32 text-center text-slate-400">
                        Loading stores…
                    </div>
                )}

                {!loading && stores.length === 0 && (
                    <div className="col-span-full py-32 border border-dashed border-slate-300 rounded-2xl text-center">
                        <Building2 size={48} className="mx-auto text-slate-300 mb-4" />
                        <p className="text-slate-500 font-medium">
                            No stores created yet
                        </p>
                    </div>
                )}

                {stores.map(store => (
                    <div
                        key={store.id}
                        onClick={() => navigate(`/admin/${store.id}`)}
                        className="bg-white border border-slate-200 rounded-2xl p-6 
                       hover:border-emerald-400 hover:shadow-lg 
                       transition cursor-pointer flex flex-col"
                    >
                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 
                              flex items-center justify-center 
                              font-semibold text-emerald-700">
                                {store.name?.[0]?.toUpperCase()}
                            </div>

                            <span className="text-xs font-medium text-emerald-700 
                               bg-emerald-50 px-3 py-1 rounded-full">
                                Active
                            </span>
                        </div>

                        {/* Card Body */}
                        <div className="flex-1 space-y-4">
                            <h3 className="text-xl font-semibold text-slate-900">
                                {store.name || 'Untitled Store'}
                            </h3>

                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                <MapPin size={12} />
                                Global
                                <span className="text-slate-300">•</span>
                                <Globe size={12} />
                                {store.id?.slice(0, 8)}
                            </div>

                            <p className="text-sm text-slate-500 leading-relaxed">
                                Inventory, orders, staff, and analytics managed from a
                                unified dashboard.
                            </p>
                        </div>

                        {/* Card Footer */}
                        <div className="flex justify-between items-center pt-6 mt-6 border-t border-slate-100">
                            <div className="text-xs text-slate-400">
                                0 products • 0 orders
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={e => {
                                        e.stopPropagation();
                                        if (confirm('Delete this store?')) {
                                            businessService.deleteBusiness(store.id);
                                            loadStores();
                                        }
                                    }}
                                    className="p-2 rounded-lg text-slate-400 
                             hover:bg-red-50 hover:text-red-600 transition"
                                >
                                    <Trash2 size={16} />
                                </button>

                                <button
                                    className="p-2 rounded-lg bg-slate-900 
                             text-white hover:bg-emerald-600 transition"
                                >
                                    <ExternalLink size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Store Modal */}
            {showAdd && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm 
                        flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl">
                        <h3 className="text-xl font-semibold text-slate-900 mb-6">
                            Create New Store
                        </h3>

                        <form
                            onSubmit={async e => {
                                e.preventDefault();
                                await businessService.createBusiness('system', newName);
                                setNewName('');
                                setShowAdd(false);
                                loadStores();
                            }}
                            className="space-y-6"
                        >
                            <input
                                autoFocus
                                required
                                placeholder="Store name"
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 
                           rounded-xl focus:outline-none 
                           focus:ring-1 focus:ring-emerald-500"
                            />

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAdd(false)}
                                    className="px-4 py-2 text-sm text-slate-500 
                             hover:text-slate-900"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-emerald-600 
                             hover:bg-emerald-700 text-white 
                             rounded-xl text-sm font-medium"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stores;