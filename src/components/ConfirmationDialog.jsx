import { X, TriangleAlert } from "lucide-react";
import { useState, useEffect } from "react";

const ConfirmationDialog = ({ headerText, confirmationText, itemForDeletion = "", onCancel, onConfirm, confirmLabel = "Delete" }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onCancel();
            }
        };
        
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onCancel]);

    useEffect(() => {
        const handleEnterKeyPress = (event) => {
            if (event.key === 'Enter') {
                onConfirm();
            }
        }

        window.addEventListener('keydown', handleEnterKeyPress);

        return () => {
            window.removeEventListener('keydown', handleEnterKeyPress);
        };
    }, [onConfirm]);
    
    return (
        <>
            <div className="bg-black/70 fixed inset-0 z-40" onClick={onCancel}></div>

            <div className="bg-white fixed z-50 flex flex-col w-100 max-w-[90vw] rounded-xl overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl">
                <div className="bg-red-500 flex flex-row justify-between items-center p-5 text-white">
                    <div className="flex items-center gap-2">
                        <TriangleAlert size={20} />
                        <h2 className="text-xl">{headerText}</h2>
                    </div>
                    <button className="cursor-pointer hover:text-red-200" onClick={onCancel}>
                        <X size={20}/>
                    </button>
                </div>

                <div className="px-5 py-4">
                    <p className="text-black">{confirmationText}</p>

                    {itemForDeletion && (
                        <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                            <p className="text-sm text-slate-800 font-medium truncate">
                                {itemForDeletion}
                            </p>
                        </div>
                    )}

                    <hr className="mb-3 mt-3 text-slate-300 w-full h-[1px]" />

                    <div className="flex gap-3 justify-end pb-1">
                        <button 
                            className="cursor-pointer bg-slate-100 text-black px-4 py-2 rounded-lg hover:bg-slate-200 active:scale-95 transition"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 active:scale-95 transition"
                            onClick={onConfirm}
                        >
                            {confirmLabel}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmationDialog;