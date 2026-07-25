import { CircleX, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const InputError = ({ closeError }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
    };

    useEffect(() => {    
        const timer = setTimeout(handleClose, 10000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`mb-4 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700
                ${isClosing ? 'animate-close' : ''}`}

            onAnimationEnd={() => {
                if (isClosing) closeError();
            }}
        >
            <div className='flex justify-between gap-2'>
                <div className='flex gap-2'>
                    <CircleX />
                    <p className="font-semibold">Invalid Input</p>  
                </div>
                <button className='cursor-pointer hover:text-red-400' onClick={handleClose}><X /></button>
            </div>
            <p className="text-sm mt-1">
            Please use only letters, numbers, and spaces.
            </p>
        </div>
    )
}

export default InputError;