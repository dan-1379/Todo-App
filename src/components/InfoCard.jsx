import { Info } from "lucide-react";

const InfoCard = ({ textContent, colourModes }) => {
    return (
        <div className='flex gap-2 mt-5 mb-5 border-l-2 w-full p-2 items-center' 
             style={{ backgroundColor: colourModes.bgColour, borderLeftColor: colourModes.infoColour }}>
            <Info style={{ color: colourModes.infoColour }}/>
            <p style={{ color: colourModes.automaticTodoFontColor }}>{textContent}</p>
        </div>
    )
}

export default InfoCard;