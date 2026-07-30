import { CircleCheck } from "lucide-react";

const CompletedTodoItem = ({ item, timeStarted, timeCompleted, timeStampStarted, timeStampCompleted, colourModes }) => {
     const formatDuration = (ms) => {
        if (!ms || ms < 0) return "—";

        const minutes = Math.floor(ms / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d ${hours % 24}h`;
        if (hours > 0) return `${hours}h ${minutes % 60}m`;
        if (minutes > 0) return `${minutes}m`;
        return "<1m";
    }

     const timeTaken = formatDuration(timeStampCompleted - timeStampStarted);

    return (
        <li className='rounded-lg px-4 py-3 my-5 flex justify-between border-l-5 border-slate-300'
            style={{backgroundColor: colourModes.completedTodoColour, color: colourModes.completedTodoFontHeadingColor }}
        >
            <div className='flex gap-2 justify-center items-center'>
                <CircleCheck size={20} className="text-slate-400" style={{ color: colourModes.completedTodoFontHeadingColor }}/>

                <div className='flex flex-col'>
                    <p className='font-semibold text-md' style={{ color: colourModes.completedTodoFontHeadingColor }}>{item}</p> 
                    <p className='flex items-center text-sm text-slate-500' style={{ color: colourModes.completedTodoFontTextColor }}>{timeStarted} - {timeCompleted}</p>
                </div>
            </div>

            <div>
                <p>{timeTaken}</p>
            </div>
        </li>
    )
}

export default CompletedTodoItem;