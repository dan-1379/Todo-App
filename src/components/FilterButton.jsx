import { Filter } from "lucide-react";

const FilterButton = ({ handleInput }) => {
    return (
        <button 
            onClick={handleInput} 
            className='flex gap-2 bg-slate-100 items-center cursor-pointer text-black px-4 py-2 rounded-lg active:scale-95 transition'
        >
                <Filter size={20}/>
                Filter
        </button>
    )
}

export default FilterButton;