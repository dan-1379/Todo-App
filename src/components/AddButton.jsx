const AddButton = ({ handleInput, textContent, colourModes }) => {
    return (
        <button 
            onClick={handleInput} 
            className='cursor-pointer w-full md:w-auto text-white px-4 py-2 rounded-lg active:scale-95 transition'
            style={{ backgroundColor: colourModes.addButtonColour, color: colourModes.cardBgColour }}>
                {textContent}
        </button>
    )
}

export default AddButton;