import { CircleCheck, X } from "lucide-react";
import { useState } from "react";
import CompletedConfetti from "./CompletedConfetti";

const SuccessModal = ({ tasksClearedCount, closeModal, totalTime }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleModalClose = () => {
        setIsClosing(true);

        setTimeout(() => {
            closeModal();
        }, 200);
    }

    return (
        <>
            <div
                className={`bg-black/70 fixed inset-0 z-40 ${isClosing ? 'animate-[fade-out_0.2s_ease-out_forwards]' : 'animate-[fade-in_0.2s_ease-out_forwards]'}`}
                onClick={handleModalClose}
            ></div>

            {!isClosing && <CompletedConfetti />}

            <div className={`bg-white fixed z-50 flex flex-col self-center m-[2em] rounded-xl w-[90%] sm:w-100 p-8 ml-auto mr-auto inset-x-0 top-1/3 ${isClosing ? 'animate-[fade-out-scale_0.2s_ease-out_forwards]' : 'animate-[fade-in-scale_0.2s_ease-out_forwards]'}`}>
                <button
                    className="cursor-pointer absolute top-3 right-3 size-8 text-slate-500 rounded-md hover:bg-slate-200 duration-300 text-center ease-in-out flex items-center justify-center"
                    onClick={handleModalClose}
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col gap-2 justify-center items-center text-center pt-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                        <CircleCheck size={32} className="text-green-600" />
                    </div>

                    <h2 className="font-bold text-xl text-slate-700">All done!</h2>
                    <p className="text-slate-500 text-sm">You've completed every todo on your list.</p>
                    <p className="text-slate-400 text-xs mb-4">
                        {tasksClearedCount} {tasksClearedCount === 1 ? "task" : "tasks"} cleared today in {totalTime}
                    </p>

                    <button
                        onClick={handleModalClose}
                        className="w-full cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition"
                    >
                        Nice, keep going
                    </button>
                </div>
            </div>
        </>
    )
}

export default SuccessModal;