import { CircleCheck, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const InputSuccess = ({ closeSuccess, textContent }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
    };

    useEffect(() => {    
        const timer = setTimeout(handleClose, 10000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`mb-4 rounded-lg border border-green-300 bg-green-50 p-4 text-green-700 
                        ${isClosing ? 'animate-close' : ''}`}
            
            onAnimationEnd={() => {
                if (isClosing) closeSuccess();
            }}
        >
            <div className='flex justify-between gap-2'>
                <div className='flex gap-2'>
                    <CircleCheck />
                    <p className="font-semibold">Success</p>  
                </div>
                <button className='cursor-pointer hover:text-green-400' onClick={handleClose}><X /></button>
            </div>
            <p className="text-sm text-left mt-1">
                {textContent}
            </p>
        </div>
    )
}

export default InputSuccess;