import { CircleCheck, X } from 'lucide-react';

const InputSuccess = ({ closeSuccess, textContent }) => {
    return (
        <div className="mb-4 rounded-lg border border-green-300 bg-green-50 p-4 text-green-700">
            <div className='flex justify-between gap-2'>
                <div className='flex gap-2'>
                    <CircleCheck />
                    <p className="font-semibold">Success</p>  
                </div>
                <button className='cursor-pointer hover:text-green-400' onClick={closeSuccess}><X /></button>
            </div>
            <p className="text-sm mt-1">
                {textContent}
            </p>
        </div>
    )
}

export default InputSuccess;