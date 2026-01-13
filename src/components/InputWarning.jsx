import { TriangleAlert } from 'lucide-react';

const InputWarning = () => {
    return (
        <div className="mb-4 rounded-lg border border-orange-300 bg-amber-50 p-4 text-amber-700">
            <div className='flex gap-2'>
                <TriangleAlert />
                <p className="font-semibold">Input Warning</p>
            </div>
            <p className="text-sm mt-1">
                Todo item cannot be blank. Please enter a value.
            </p>
        </div>
    )
}

export default InputWarning;