import { Check, Trash, SquarePen, CircleCheck, Circle } from 'lucide-react';

const priorityMap = {
    high: {text: "High", color: "#b91c1c"},
    medium: {text: "Medium", color: "#b45309"},
    low: {text: "Low", color: "#15803d"}
}

function ListItem(props) {
    const priority = priorityMap[props.priority];

    return (
        <li style={{ backgroundColor: props.color, color: props.textColor }} className="flex items-center justify-between rounded-lg px-4 py-3 my-5">
            <div className='flex gap-2 justify-center items-center'>
                <CircleCheck size={20}/>

                <div className='flex gap-1'>
                    <div>
                        {priority && (
                            <span 
                                className='inline-block rounded-full'
                                style={{ backgroundColor: priority.color, width: '8px', height: '8px' }}
                                title={priority.text}
                            />
                        )}
                    </div>

                    <div>
                        <p className='font-semibold text-md flex gap-2 '>{props.name}</p> 
                        <p className='font-light text-xs'>{props.dateAdded}</p>
                    </div>
                </div>
            </div>

            <div className='flex gap-2'>
                <button onClick={props.onView}  title="Edit Todo" className="cursor-pointer hover:scale-110 px-3 py-1 rounded-md duration-300 ease-in-out"><SquarePen size={18} /></button>
                <button onClick={props.onComplete} title="Complete Todo" className="cursor-pointer hover:scale-110 hover:bg-green-500 hover:text-white px-3 py-1 rounded-md duration-300 ease-in-out"><Check size={18} /></button>
                <button onClick={props.onDelete} title="Delete Todo" className="cursor-pointer hover:scale-105 hover:bg-red-500 hover:text-white px-3 py-1 rounded-md duration-300 ease-in-out"><Trash size={18} /></button>
            </div>
        </li>
    )
}

export default ListItem