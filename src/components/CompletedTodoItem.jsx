import { CircleCheck } from "lucide-react";
import { formatDuration } from "../utils/dateFormat";
import { showPreviewText } from "../utils/textFormat";


const CompletedTodoItem = ({ item, timeStarted, timeCompleted, timeStampStarted, timeStampCompleted, colourModes }) => {
    const timeTaken = formatDuration(timeStampCompleted - timeStampStarted);

    return (
        <li className='rounded-lg px-4 py-3 my-5 flex justify-between border-l-5 border-slate-300'
            style={{backgroundColor: colourModes.completedTodoColour, color: colourModes.completedTodoFontHeadingColor }}
        >
            <div className='flex gap-2 justify-center items-center'>
                <div className="shrink-0 p-2 rounded-md">
                    <CircleCheck size={20} className="text-slate-400" style={{ color: colourModes.completedTodoFontHeadingColor }}/>
                </div>

                <div className='flex flex-col'>
                    <p className='font-semibold text-md w-[95%] h-6 overflow-hidden' style={{ color: colourModes.completedTodoFontHeadingColor }}>{showPreviewText(item)}</p> 
                    <p className='flex items-center text-sm text-slate-500' style={{ color: colourModes.completedTodoFontTextColor }}>{timeStarted} - {timeCompleted}</p>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <p>{timeTaken}</p>
            </div>
        </li>
    )
}

export default CompletedTodoItem;