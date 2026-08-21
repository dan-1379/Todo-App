import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

const CompletedConfetti = () => {
    const [isRecycling, setIsRecycling] = useState(true);
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const stopRecycling = setTimeout(() => {
            setIsRecycling(false);
        }, 5000);

        const removeConfetti = setTimeout(() => {
            setShowConfetti(false);
        }, 10000);

        return () => {
            clearTimeout(stopRecycling);
            clearTimeout(removeConfetti);
        }
    }, [])

    return (
        <div className="z-40">
            {showConfetti && (
                <ReactConfetti
                    recycle={isRecycling}
                    numberOfPieces={isRecycling ? 200 : 0}
                />
            )}
        </div>
    )
}

export default CompletedConfetti;