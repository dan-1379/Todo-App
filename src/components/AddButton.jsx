import { Plus } from "lucide-react";

const AddButton = ({ handleInput, textContent, colourModes }) => {
    return (
        <button 
            onClick={handleInput} 
            className='flex gap-2 items-center cursor-pointer text-white px-4 py-2 rounded-lg active:scale-95 transition'
            style={{ backgroundColor: colourModes.addButtonColour, color: colourModes.cardBgColour }}>
                <Plus size={20}/>
                {textContent}
        </button>
    )
}

export default AddButton;