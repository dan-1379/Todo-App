import { useState } from "react";

const FilterModal = ({ handleInput }) => {
    const [filterOption, setFilterOption] = useState(null);

     const handleChange = (value) => {
        setFilterOption(value);
        handleInput(value);
    }

        
    return (
        <div className="absolute bg-white border border-slate-200 rounded-xl shadow-lg w-56 mt-2 p-4 z-20">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Filter by priority</h3>

            <label htmlFor="high" className="flex items-center gap-3 rounded-lg px-2 py-2 cursor-pointer hover:bg-slate-50 transition">
                <input 
                    type="radio" 
                    name="priority" 
                    id="high"
                    value="high"
                    onChange={(e) => handleChange(e.target.value)}
                    className="size-4 accent-red-600 cursor-pointer"
                />
                <span className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#b91c1c' }} />
                    High
                </span>
            </label>

            <label htmlFor="medium" className="flex items-center gap-3 rounded-lg px-2 py-2 cursor-pointer hover:bg-slate-50 transition">
                <input 
                    type="radio" 
                    name="priority" 
                    id="medium" 
                    value="medium"
                    onChange={(e) => handleChange(e.target.value)}
                    className="size-4 accent-amber-600 cursor-pointer"
                />
                <span className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#b45309' }} />
                    Medium
                </span>
            </label>

            <label htmlFor="low" className="flex items-center gap-3 rounded-lg px-2 py-2 cursor-pointer hover:bg-slate-50 transition">
                <input 
                    type="radio" 
                    name="priority" 
                    id="low" 
                    value="low"
                    onChange={(e) => handleChange(e.target.value)}
                    className="size-4 accent-green-700 cursor-pointer"
                />
                <span className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#15803d' }} />
                    Low
                </span>
            </label>

            {filterOption &&
                <>
                    <hr className="my-2 border-slate-200" />

                    <button 
                        type="submit"
                        onClick={() => handleChange(null)}
                        className="cursor-pointer bg-slate-100 text-slate-700 text-sm font-medium rounded-lg px-3 py-2 hover:bg-slate-200 active:scale-95 transition"
                    >
                        Clear filter
                    </button>
                </>
            }
        </div>
    )
}

export default FilterModal;