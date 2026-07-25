import { Check, Trash, SquarePen, CircleCheck, Circle } from 'lucide-react';

function ListItem(props) {
    return (
        <li style={{ backgroundColor: props.color, color: props.textColor }} className="flex items-center justify-between rounded-lg px-4 py-3 my-5">
            <div className='flex gap-2 justify-center items-center'>
                <CircleCheck size={20}/>

                <div className='flex flex-col'>
                    <p className='font-semibold text-md'>{props.name}</p> 
                    <p className='font-light text-sm'>{props.dateAdded}</p>
                </div>
            </div>

            <div className='flex gap-0.5'>
                <button onClick={props.onView}  title="Edit Todo" className="cursor-pointer hover:scale-110 px-3 py-1 rounded-md duration-300 ease-in-out"><SquarePen size={20} /></button>
                <button onClick={props.onComplete} title="Complete Todo" className="cursor-pointer hover:scale-110 hover:bg-green-500 hover:text-white px-3 py-1 rounded-md duration-300 ease-in-out"><Check size={20} /></button>
                <button onClick={props.onDelete} title="Delete Todo" className="cursor-pointer hover:scale-105 hover:bg-red-500 hover:text-white px-3 py-1 rounded-md duration-300 ease-in-out"><Trash size={20} /></button>
            </div>
        </li>
    )
}

export default ListItem