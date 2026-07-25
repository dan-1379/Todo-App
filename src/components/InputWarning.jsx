import { TriangleAlert, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const InputWarning = ({ closeError }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
    };

    useEffect(() => {    
        const timer = setTimeout(handleClose, 10000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`mb-4 rounded-lg border border-orange-300 bg-amber-50 p-4 text-amber-700 
                ${isClosing ? 'animate-close' : ''}`}

            onAnimationEnd={() => {
                if (isClosing) closeError();
            }}
        >
            <div className='flex justify-between gap-2'>
                <div className='flex gap-2'>
                    <TriangleAlert />
                    <p className="font-semibold">Input Warning</p>
                </div>
                <button className='cursor-pointer hover:text-amber-400' onClick={handleClose}><X /></button>
            </div>
            <p className="text-sm mt-1">
                Todo item cannot be blank. Please enter a value.
            </p>
        </div>
    )
}

export default InputWarning;