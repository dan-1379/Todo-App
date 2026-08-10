import { CircleCheck, Circle, Ellipsis, NotebookPen } from 'lucide-react';
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

    const handleItemOptionsModal = (item) => {
        setItemOptionsOpen(!itemOptionsOpen);
    }

    const handleOnEdit = () => {
        setItemOptionsOpen(false);
        props.onView();
    }

    const handleOnView = () => {
        setItemOptionsOpen(false);
        props.onViewDetails();
    }

    const handleOnComplete = () => {
        setItemOptionsOpen(false);
        props.onComplete();
    }

    const handleOnDelete = () => {
        setItemOptionsOpen(false);
        props.onDelete();
    }

    const showPreviewText = (text, wordsPreview = 4) => {
        const splitText = text.split(" ");
        const previewText = splitText.slice(0, wordsPreview).join(" ");

        return splitText.length > wordsPreview ? previewText + "..." : text;
    }

    return (
        <li style={{ backgroundColor: props.color, color: props.textColor }} className="flex items-center justify-between rounded-lg px-4 py-3 my-5 relative">
            <div className='flex gap-2 justify-center items-center'>
                <div className="shrink-0 p-2 rounded-md"
                    style={{ backgroundColor: props.iconBg, color:props.iconColor }}>
                    <IconComponent size={20}/>
                </div>
                <div className='flex gap-1'>
                    <div>
                        {priority && (
                            <span 
                                className='inline-block rounded-full w-3 h-3'
                                style={{ backgroundColor: priority.color }}
                                title={priority.text}
                            />
                        )}
                    </div>

                    <div>
                        <p className='font-semibold text-md w-[90%] h-6 overflow-hidden whitespace-nowrap text-ellipsis' title={props.name}>{props.name ? showPreviewText(props.name) : "Todo"}</p> 
                        
                        <div className='flex gap-2 items-center'>
                            <p className='font-light text-xs flex gap-2'>{props.dateAdded}</p>
                            
                            {props.notes && 
                                <p className='flex gap-2 items-center'><span className='text-slate-400'>●</span> <NotebookPen size={12}/></p>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex gap-2'>
                {props.action != "Add" ?
                    <button type='button' className='cursor-pointer' onClick={() => handleItemOptionsModal()}><Ellipsis /></button>
                    :
                    <button type='button' className='cursor-pointer'><Ellipsis /></button>
                } 
            </div>

            {itemOptionsOpen && 
                <div className='absolute bg-white border top-10 right-0 border-slate-200 rounded-xl shadow-lg w-56 mt-2 p-4 z-10'>
                    <ItemOptionsModal 
                        onClose={() => handleItemOptionsModal()}
                        onEdit={handleOnEdit}
                        onView={handleOnView}
                        onComplete={handleOnComplete}
                        onDelete={handleOnDelete}
                    />
                </div>
            }
        </li>
    )
}

export default ListItem