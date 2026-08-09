import { Check, Trash, SquarePen, Eye, X } from 'lucide-react';
import { useEffect } from 'react';

const ItemOptionsModal = ({ onClose, onView, onEdit, onComplete, onDelete }) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onclose();
            }
        };
        
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);
    
    return (
        <>
            <div className='flex justify-between mb-1 text-black items-center'>
                <h3>Options</h3>
                <button className='cursor-pointer hover:bg-slate-100 rounded-lg p-1' onClick={onClose}><X size={15}/></button>
            </div>

            <hr className="mb-5 text-slate-300 w-full h-[1px]" />

            <div className='flex flex-col gap-0.5 text-black'>
                <button onClick={onView} title="View Todo" className="w-full items-center flex gap-10 p-3 cursor-pointer hover:bg-slate-200 rounded-md duration-300 ease-in-out"><Eye size={18} />View</button>
                <button onClick={onEdit}  title="Edit Todo" className="w-full items-center flex gap-10 p-3 cursor-pointer hover:bg-slate-200 rounded-md duration-300 ease-in-out"><SquarePen size={18} />Edit</button>
                <button onClick={onComplete} title="Complete Todo" className="w-full items-center flex gap-10 p-3 cursor-pointer hover:bg-slate-200 rounded-md duration-300 ease-in-out"><Check size={18} />Complete</button>
                
                <hr className="mb-2 text-slate-300 w-full h-[1px]" />
                <button onClick={onDelete} title="Delete Todo" className="w-full items-center flex gap-10 p-3 cursor-pointer hover:bg-red-600 bg-red-500 text-white rounded-md duration-300 ease-in-out"><Trash size={18} />Delete</button>
            </div>
        </>
    )
}

export default ItemOptionsModal;