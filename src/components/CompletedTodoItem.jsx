import { Check } from "lucide-react";

const CompletedTodoItem = (props) => {
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

     const timeTaken = formatDuration(props.timeStampCompleted - props.timeStampStarted);

    return (
        <li className='bg-slate-100 rounded-lg px-4 py-3 my-5 text-slate-800 flex justify-between border-l-5 border-slate-300'>
            <div className='flex gap-2 justify-center items-center'>
                <Check size={20} className="text-slate-400"/>

                <div className='flex flex-col'>
                    <p className='font-semibold text-md'>{props.item}</p> 
                    <p className='flex items-center text-sm text-slate-500'>{props.timeStarted} - {props.timeCompleted}</p>
                </div>
            </div>

            <div>
                <p>{timeTaken}</p>
            </div>
        </li>
    )
}

export default CompletedTodoItem;