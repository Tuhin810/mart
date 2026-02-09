import { auth } from '../services/firebase';
import {
    LayoutGrid,
    Users,
    Settings,
    LogOut,
    Bell,
    Search,
    Package,
    MessageSquare,
    HelpCircle,
    BarChart3
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    interface MenuItem {
        icon: any;
        label: string;
        path: string;
        badge?: string;
    }

    const menuItems: MenuItem[] = [
        { icon: LayoutGrid, label: 'Dashboard', path: '/super-admin' },
        { icon: Package, label: 'Businesses', path: '/super-admin/businesses' },
        { icon: Users, label: 'Users', path: '/super-admin/users' },
        { icon: BarChart3, label: 'Analytics', path: '/super-admin/analytics' },
    ];

    const generalItems = [
        { icon: Settings, label: 'Settings', path: '/super-admin/settings' },
        { icon: HelpCircle, label: 'Help & Support', path: '/super-admin/help' },
    ];

    return (
        <div className="flex min-h-screen bg-[#F3F4F6] text-slate-900 font-sans">
            {/* Sidebar */}
            <aside className="w-[280px] bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen p-6">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-10 pl-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        </div>
                    </div>
                    <span className="text-xl font-bold tracking-tight">Donezo</span>
                </div>

                {/* Navigation */}
                <div className="flex-1 space-y-8 overflow-y-auto no-scrollbar">
                    {/* Menu Group */}
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 pl-4 uppercase">Menu</p>
                        <nav className="space-y-1">
                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all
                                            ${isActive
                                                ? 'bg-[#1F4D36] text-white shadow-lg'
                                                : 'text-gray-500 hover:text-[#1F4D36] hover:bg-gray-50'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-400'} />
                                            {item.label}
                                        </div>
                                        {item.badge && (
                                            <span className={`px-1.5 py-0.5 text-[10px] rounded bg-gray-900 text-white`}>
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* General Group */}
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 pl-4 uppercase">General</p>
                        <nav className="space-y-1">
                            {generalItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                                            ${isActive
                                                ? 'bg-[#1F4D36] text-white'
                                                : 'text-gray-500 hover:text-[#1F4D36] hover:bg-gray-50'}`}
                                    >
                                        <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-400'} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                            <button
                                onClick={() => auth.signOut()}
                                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all"
                            >
                                <LogOut size={20} className="text-gray-400 group-hover:text-red-600" />
                                Logout
                            </button>
                        </nav>
                    </div>
                </div>

                {/* App Download Card */}
                <div className="mt-6">
                    <div className="bg-[#041E16] rounded-2xl p-4 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/20 rounded-full -mr-10 -mt-10 blur-2xl" />
                        <div className="relative z-10">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center mb-3">
                                <Package size={16} className="text-white" />
                            </div>
                            <h4 className="text-white text-sm font-bold leading-tight mb-1">Download our<br />Mobile App</h4>
                            <p className="text-gray-400 text-[10px] mb-4">Get easy in another way</p>
                            <button className="w-full py-2 bg-[#1F4D36] text-white text-[11px] font-bold rounded-lg hover:bg-emerald-600 transition-colors">
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col p-8 overflow-y-auto h-screen">
                {/* Header */}
                <header className="flex items-center justify-between mb-8">
                    {/* Search Bar */}
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search task"
                            className="w-full bg-white border-none rounded-[20px] py-4 pl-14 pr-12 text-sm shadow-sm focus:ring-2 focus:ring-emerald-500/10 transition-all placeholder:text-gray-400"
                        />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-300">
                            <span className="text-[10px] font-bold tracking-tighter">⌘</span>
                            <span className="text-[10px] font-bold tracking-tighter">F</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-5">
                        <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-[#1F4D36] shadow-sm hover:shadow-md transition-all relative group">
                            <MessageSquare size={18} />
                            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white scale-0 group-hover:scale-100 transition-transform" />
                        </button>
                        <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-[#1F4D36] shadow-sm hover:shadow-md transition-all relative group">
                            <Bell size={18} />
                            <span className="absolute top-3.5 right-4 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white" />
                        </button>

                        {/* User Profile */}
                        <div className="flex items-center gap-4 pl-3 ml-2">
                            <div className="text-right leading-tight">
                                <p className="text-[15px] font-bold text-gray-900">Totok Michael</p>
                                <p className="text-[11px] text-gray-400 mt-0.5">tmichael20@mail.com</p>
                            </div>
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md ring-1 ring-gray-100 p-0.5">
                                <img
                                    src="https://i.pravatar.cc/150?u=totok"
                                    alt="User Avatar"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Viewport */}
                <div className="flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;