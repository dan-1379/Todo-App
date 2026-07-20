import { Check, Trash, Eye } from 'lucide-react';

function ListItem(props) {


    return (
        <li style={{ backgroundColor: props.color, color: props.textColor }} className="flex items-center justify-between rounded-lg px-4 py-3 my-5">
            <p>{props.name}</p>

            <div className='flex gap-1'>
                <button onClick={props.onView} className="cursor-pointer hover:bg-blue-600 hover:text-white px-3 py-1 rounded-md duration-300 ease-in-out"><Eye size={20} /></button>
                <button onClick={props.onComplete} className="cursor-pointer hover:bg-green-600 hover:text-white px-3 py-1 rounded-md duration-300 ease-in-out"><Check size={20} /></button>
                <button onClick={props.onDelete} className="cursor-pointer hover:bg-red-600 hover:text-white px-3 py-1 rounded-md duration-300 ease-in-out"><Trash size={20} /></button>
            </div>
        </li>
    )
}

export default ListItem