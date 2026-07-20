import { CircleX, X } from 'lucide-react';

const InputError = ({ closeError }) => {
    return (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
            <div className='flex justify-between gap-2'>
                <div className='flex gap-2'>
                    <CircleX />
                    <p className="font-semibold">Invalid Input</p>  
                </div>
                <button className='cursor-pointer hover:text-red-400' onClick={closeError}><X /></button>
            </div>
            <p className="text-sm mt-1">
            Please use only letters, numbers, and spaces.
            </p>
        </div>
    )
}

export default InputError;