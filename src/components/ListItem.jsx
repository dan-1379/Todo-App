import { CircleCheck, Circle, Ellipsis } from 'lucide-react';
import { iconMap } from './TodoModal';
import ItemOptionsModal from './ItemOptionsModal';
import { useState } from 'react';

const priorityMap = {
    high: {text: "High", color: "#b91c1c"},
    medium: {text: "Medium", color: "#b45309"},
    low: {text: "Low", color: "#15803d"}
}

function ListItem(props) {
    const priority = priorityMap[props.priority];
    const IconComponent = iconMap[props.icon] || CircleCheck;

    const [itemOptionsOpen, setItemOptionsOpen] = useState(false);

    const handleItemOptionsModal = () => {
        setItemOptionsOpen(!itemOptionsOpen);
    }

    return (
        <li style={{ backgroundColor: props.color, color: props.textColor }} className="flex items-center justify-between rounded-lg px-4 py-3 my-5 relative">
            <div className='flex gap-2 justify-center items-center'>
                <IconComponent size={20} className="shrink-0"/>

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
                        <p className='font-semibold text-md flex gap-2'>{props.name}</p> 
                        <p className='font-light text-xs'>{props.dateAdded}</p>
                    </div>
                </div>
            </div>

            <div className='flex gap-2'>
                <button className='cursor-pointer' onClick={() => handleItemOptionsModal()}><Ellipsis /></button>
            </div>

            {itemOptionsOpen && 
                <div className='absolute bg-white border top-10 right-0 border-slate-200 rounded-xl shadow-lg w-56 mt-2 p-4 z-10'>
                    <ItemOptionsModal 
                        onClose={() => handleItemOptionsModal()}
                        onEdit={props.onView}
                        onComplete={props.onComplete}
                        onDelete={props.onDelete}
                    />
                </div>
            }
        </li>
    )
}

export default ListItem