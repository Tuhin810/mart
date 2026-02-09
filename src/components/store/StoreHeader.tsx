import React from 'react';
import { Menu, ShoppingBag } from 'lucide-react';

interface StoreHeaderProps {
    businessName: string;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({ businessName }) => {
    return (
        <header className="sticky top-0 z-[60] bg-white text-black border-b border-gray-100 px-6 py-4">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between">
                <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                    <Menu size={20} />
                </button>

                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-5 h-5 bg-black rotate-45 border border-black" />
                    <span className="text-xl font-bold tracking-tight lowercase">{businessName}.vstore</span>
                </div>

                <nav className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <a href="#about" className="hover:opacity-60 transition-opacity">About</a>
                        <a href="#faqs" className="hover:opacity-60 transition-opacity underline decoration-1 underline-offset-4">FAQs</a>
                    </div>
                    <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                        <ShoppingBag size={20} />
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default StoreHeader;
