const ResetButton = ({ resetTodos, textContent, colourModes }) => {
    return (
        <button 
            onClick={resetTodos} 
            className='cursor-pointer mb-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 active:scale-95 transition'
            style={{ backgroundColor: colourModes.removeButtonColour, color: colourModes.cardBgColour }}
        >
                {textContent}
        </button>
    )
};

export default ResetButton;