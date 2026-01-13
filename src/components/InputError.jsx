import { CircleX } from 'lucide-react';

const InputError = () => {
    return (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
            <div className='flex gap-2'>
                <CircleX />
                <p className="font-semibold">Invalid Input</p>
            </div>
            <p className="text-sm mt-1">
            Please use only letters, numbers, and spaces.
            </p>
        </div>
    )
}

export default InputError;