import { Check, Trash, SquarePen, X } from 'lucide-react';
import { useEffect } from 'react';

const ItemOptionsModal = ({ onClose, onEdit, onComplete, onDelete }) => {
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
            <div className='flex justify-between mb-1 text-black'>
                <h3>Options</h3>
                <button className='cursor-pointer' onClick={onClose}><X size={20}/></button>
            </div>

            <hr className="mb-5 text-slate-300 w-full h-[1px]" />

            <div className='flex flex-col gap-1 text-black'>
                <button onClick={onEdit}  title="Edit Todo" className="w-full flex gap-10 p-3 cursor-pointer hover:scale-110 hover:bg-blue-500 hover:text-white rounded-md duration-300 ease-in-out"><SquarePen size={18} />Edit</button>
                <button onClick={onComplete} title="Complete Todo" className="w-full flex gap-10 p-3 cursor-pointer hover:scale-110 hover:bg-green-500 hover:text-white rounded-md duration-300 ease-in-out"><Check size={18} />Complete</button>
                <button onClick={onDelete} title="Delete Todo" className="w-full flex gap-10 p-3 cursor-pointer hover:scale-105 bg-red-500 text-white rounded-md duration-300 ease-in-out"><Trash size={18} />Delete</button>
            </div>
        </>
    )
}

export default ItemOptionsModal;