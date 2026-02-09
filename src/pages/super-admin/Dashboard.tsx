import { useState } from 'react';
import {
    Plus,
    Download,
    ArrowUpRight,
    Play,
    Calendar,
    CheckCircle2,
    Clock,
    MoreHorizontal,
    Video,
    UserPlus,
    Clock4,
    Pause,
    Square
} from 'lucide-react';

const Dashboard: React.FC = () => {
    const stats = [
        { label: 'Total Projects', value: '24', trend: 'Increased from last month', active: true, icon: ArrowUpRight },
        { label: 'Ended Projects', value: '10', trend: 'Increased from last month', active: false, icon: ArrowUpRight },
        { label: 'Running Projects', value: '12', trend: 'Increased from last month', active: false, icon: ArrowUpRight },
        { label: 'Pending Project', value: '2', trend: 'On Discuss', active: false, icon: ArrowUpRight },
    ];

    const team = [
        { name: 'Alexandra Deff', role: 'Github Project Repository', status: 'Completed', color: 'bg-emerald-100 text-emerald-600', avatar: 'https://i.pravatar.cc/150?u=alex' },
        { name: 'Edwin Adenike', role: 'Integrate User Authentication System', status: 'In Progress', color: 'bg-orange-100 text-orange-600', avatar: 'https://i.pravatar.cc/150?u=edwin' },
        { name: 'Isaac Oluwatemilorun', role: 'Develop Search and Filter Functionality', status: 'Pending', color: 'bg-red-100 text-red-400', avatar: 'https://i.pravatar.cc/150?u=isaac' },
        { name: 'David Oshodi', role: 'Responsive Layout for Homepage', status: 'In Progress', color: 'bg-orange-100 text-orange-600', avatar: 'https://i.pravatar.cc/150?u=david' },
    ];

    const projects = [
        { title: 'Develop API Endpoints', date: 'Nov 24, 2024', iconColor: 'text-blue-600' },
        { title: 'Onboarding Flow', date: 'Nov 28, 2024', iconColor: 'text-emerald-600' },
        { title: 'Build Dashboard', date: 'Nov 30, 2024', iconColor: 'text-purple-600' },
        { title: 'Optimize Page Load', date: 'Dec 5, 2024', iconColor: 'text-amber-500' },
        { title: 'Cross-Browser Testing', date: 'Dec 8, 2024', iconColor: 'text-indigo-600' },
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Page Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-400 text-sm mt-1 font-medium">Plan, prioritize, and accomplish your tasks with ease.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1F4D36] text-white rounded-full text-sm font-bold shadow-lg shadow-emerald-900/10 hover:opacity-90 transition-all">
                        <Plus size={18} />
                        Add Project
                    </button>
                    <button className="px-5 py-2.5 bg-white border border-gray-100 text-gray-900 rounded-full text-sm font-bold shadow-sm hover:bg-gray-50 transition-all border-gray-300">
                        Import Data
                    </button>
                </div>
            </div>

            {/* Stats Row */}
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

            {/* Middle Section */}
            <div className="grid grid-cols-12 gap-6">
                {/* Project Analytics Card */}
                <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[32px] shadow-sm border border-gray-50">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="font-bold text-gray-900">Project Analytics</h3>
                    </div>
                    {/* Simplified Bar Chart */}
                    <div className="flex items-end justify-between h-48 gap-2">
                        {[
                            { day: 'S', height: '60%', stripe: true },
                            { day: 'M', height: '80%', solid: true, color: 'bg-emerald-700' },
                            { day: 'T', height: '100%', solid: true, color: 'bg-emerald-400', tag: '74%' },
                            { day: 'W', height: '90%', solid: true, color: 'bg-[#113C2B]' },
                            { day: 'T', height: '70%', stripe: true },
                            { day: 'F', height: '60%', stripe: true },
                            { day: 'S', height: '80%', stripe: true },
                        ].map((bar, i) => (
                            <div key={i} className="flex flex-col items-center flex-1 gap-4">
                                <div className="w-full relative group flex justify-center h-40 items-end">
                                    {bar.tag && (
                                        <div className="absolute -top-6 bg-gray-50 text-[10px] font-bold px-1.5 py-0.5 rounded border border-gray-100 text-gray-400">
                                            {bar.tag}
                                        </div>
                                    )}
                                    <div
                                        className={`w-full rounded-2xl transition-all duration-500 ${bar.height} ${bar.solid ? bar.color : 'bg-gray-100'
                                            }`}
                                        style={{ height: bar.height }}
                                    >
                                        {bar.stripe && (
                                            <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,#d1d5db_8px,#d1d5db_10px)] opacity-50 rounded-2xl" />
                                        )}
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-gray-300">{bar.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reminders Card */}
                <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[32px] shadow-sm border border-gray-50 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-6">Reminders</h3>
                        <div className="space-y-1">
                            <h4 className="text-xl font-bold text-[#1F4D36] leading-tight">Meeting with Arc Company</h4>
                            <p className="text-gray-400 text-xs mt-2 font-medium">Time : 02.00 pm - 04.00 pm</p>
                        </div>
                    </div>
                    <button className="w-full py-4 bg-[#1F4D36] text-white rounded-2xl flex items-center justify-center gap-3 font-bold hover:opacity-90 transition-all mt-10">
                        <Video size={20} />
                        Start Meeting
                    </button>
                </div>

                {/* Project List Card */}
                <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[32px] shadow-sm border border-gray-50">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-bold text-gray-900">Project</h3>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-100 text-[11px] font-bold text-gray-600 hover:bg-gray-50 transition-all">
                            <Plus size={14} />
                            New
                        </button>
                    </div>
                    <div className="space-y-6">
                        {projects.map((proj, i) => (
                            <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center ${proj.iconColor} group-hover:scale-110 transition-transform`}>
                                    <div className="w-4 h-4 rounded-sm border-2 border-current rotate-45 flex items-center justify-center">
                                        <div className="w-1 h-1 bg-current rounded-full" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-900 truncate">{proj.title}</p>
                                    <p className="text-[10px] text-gray-400 font-medium">Due date: {proj.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-12 gap-6">
                {/* Team Collaboration Card */}
                <div className="col-span-12 lg:col-span-5 bg-white p-8 rounded-[32px] shadow-sm border border-gray-50">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-bold text-gray-900">Team Collaboration</h3>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-100 text-[11px] font-bold text-gray-600 hover:bg-gray-50">
                            <Plus size={14} />
                            Add Member
                        </button>
                    </div>
                    <div className="space-y-7">
                        {team.map((member, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <img src={member.avatar} alt="" className="w-10 h-10 rounded-full bg-gray-100 p-0.5 border border-gray-50" />
                                    <div className="leading-tight">
                                        <p className="text-sm font-bold text-gray-900">{member.name}</p>
                                        <p className="text-gray-400 text-[10px] font-medium mt-1">Working on <span className="text-gray-600 font-bold">{member.role}</span></p>
                                    </div>
                                </div>
                                <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${member.color}`}>
                                    {member.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Project Progress Card */}
                <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[32px] shadow-sm border border-gray-50 flex flex-col items-center">
                    <h3 className="self-start font-bold text-gray-900 mb-6 font-sans">Project Progress</h3>

                    {/* Donut Chart Simulation */}
                    <div className="relative flex items-center justify-center mb-8">
                        <svg className="w-44 h-44 -rotate-90">
                            <circle cx="88" cy="88" r="70" stroke="#F3F4F6" strokeWidth="18" fill="none" />
                            <circle cx="88" cy="88" r="70" stroke="#064E3B" strokeWidth="18" fill="none" strokeDasharray="440" strokeDashoffset="260" strokeLinecap="round" />
                            {/* Texture overlay simulation */}
                            <circle cx="88" cy="88" r="70" stroke="white" strokeWidth="18" fill="none" strokeDasharray="1 5" className="opacity-20" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-gray-900">41%</span>
                            <span className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">Project Ended</span>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 w-full">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#1F4D36]" />
                            <span className="text-[10px] font-bold text-gray-400">Completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-950/40" />
                            <span className="text-[10px] font-bold text-gray-400">In Progress</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-gray-100" />
                            <span className="text-[10px] font-bold text-gray-400">Pending</span>
                        </div>
                    </div>
                </div>

                {/* Time Tracker Card */}
                <div className="col-span-12 lg:col-span-3 bg-white p-2 rounded-[32px] border border-gray-50 shadow-sm relative overflow-hidden group">
                    {/* Dark Wavy Pattern Background */}
                    <div className="absolute inset-0 bg-[#062419] rounded-[30px]" />
                    <div className="absolute inset-0 overflow-hidden opacity-30">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            {[1, 2, 3, 4, 5].map((idx) => (
                                <path
                                    key={idx}
                                    d={`M0 ${20 * idx} Q25 ${20 * idx + 10} 50 ${20 * idx} T100 ${20 * idx}`}
                                    fill="none"
                                    stroke="#10B981"
                                    strokeWidth="0.5"
                                    className="animate-pulse"
                                    style={{ animationDelay: `${idx * 0.2}s` }}
                                />
                            ))}
                        </svg>
                    </div>

                    <div className="relative z-10 p-6 flex flex-col items-center justify-center h-full text-white">
                        <h4 className="text-sm font-bold text-gray-400/80 mb-6 uppercase tracking-widest">Time Tracker</h4>
                        <div className="text-5xl font-bold mb-10 tracking-wider">01:24:08</div>
                        <div className="flex gap-4">
                            <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#1F4D36] shadow-xl hover:scale-110 active:scale-95 transition-all">
                                <Pause size={20} fill="currentColor" />
                            </button>
                            <button className="w-12 h-12 rounded-full bg-red-500/90 border-4 border-white/20 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all">
                                <Square size={16} fill="currentColor" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
