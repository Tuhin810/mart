import React from 'react';
import { ChevronDown, Search } from 'lucide-react';

const FilterBar: React.FC = () => {
    const categories = ['Men', 'Women', 'Children', 'Brands'];

    return (
        <div className="bg-white border-b border-gray-100 px-6 py-3 sticky top-[72px] z-[50]">
            <div className="max-w-[1440px] mx-auto flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <Dropdown label="Categories" />
                    <Dropdown label="New Product" />
                </div>

                <div className="flex-1 min-w-[200px] relative group">
                    <input
                        type="text"
                        placeholder="search..."
                        className="w-full bg-gray-50 border-none rounded-full py-2 pl-4 pr-10 text-sm focus:ring-1 focus:ring-black outline-none transition-all"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={16} />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className="px-5 py-2 rounded-full border border-gray-200 text-sm font-medium hover:bg-black hover:text-white transition-all whitespace-nowrap"
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Dropdown = ({ label }: { label: string }) => (
    <button className="flex items-center gap-4 px-4 py-2 border border-gray-200 rounded-md text-sm font-medium hover:border-black transition-colors">
        {label} <ChevronDown size={14} />
    </button>
);

export default FilterBar;
