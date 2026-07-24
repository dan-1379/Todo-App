import { Settings } from "lucide-react";

const Header = ({ openSettings, colorModes }) => {
    return (
        <div className='p-5 flex justify-between items-center' style={{ backgroundColor: colorModes.headingBgColour, color: colorModes.fontHeadingColour }}>
            <h1 className='text-2xl md:text-3xl font-bold'>Todolistful</h1>
            <button className='cursor-pointer' onClick={openSettings}><Settings /></button>
        </div>
    )
}

export default Header;