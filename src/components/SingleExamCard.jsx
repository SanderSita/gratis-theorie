import { CheckCircleIcon, ClipboardListIcon, PlayIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react';
import { ClockIcon } from 'lucide-react';

export function SingleExamCard({ exam }) {

    const getCurrentlyStarted = () => {
        const startedAt = exam.startedAt;
        if (!startedAt) return false;
        const now = new Date();
        const timeDiff = now - startedAt;
        const minutesDiff = Math.floor(timeDiff / 1000 / 60);
        return minutesDiff < 40; // Check if started within the last 40 minutes
    }

    const currentlyStarted = getCurrentlyStarted()

    const goToExam = () => {
        if (!currentlyStarted || exam.completed) localStorage.removeItem('exam_' + exam.id); // Clear any previous exam data
        window.location.assign('/examen/' + exam.id)
    };

    const [startTime, setStartTime] = useState(exam.startedAt);
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            if (!startTime) return;
            const end = new Date(startTime).getTime() + 40 * 60 * 1000; // 40 minutes later
            const now = new Date().getTime();
            const diff = end - now;

            if (diff <= 0) {
                clearInterval(interval);
                setTimeLeft("");
            } else {
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col">
            <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{exam.title}</h3>
                    {exam.completed && (
                        <div className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full flex items-center">
                            <CheckCircleIcon size={16} className="mr-1" />
                            <span>Voltooid</span>
                        </div>
                    )}
                    {timeLeft && !exam.completed && 
                        <div className="flex items-center gap-2">
                            <ClockIcon className="w-5 h-5 text-orange-500" />
                            <span>
                            {timeLeft}
                            </span>
                        </div>
                    }
                </div>

                {exam.completed && (
                    <div className="mb-4">
                        <p className="text-gray-600">
                        <span className="font-medium">Score:</span> {exam.score}
                        </p>
                    </div>
                )}
                
                {/* Push buttons to bottom */}
                <div className="mt-auto flex justify-end gap-3 pt-4">
                {exam.completed && (
                    <button onClick={() => window.location.assign(`/examen/${exam.id}/resultaat`)} className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors">
                        <ClipboardListIcon size={18} className="mr-2" />
                        Bekijk Resultaten
                    </button>
                )}
                <button onClick={() => goToExam()} className="bg-[#FF7A30] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#e66e29] transition-colors flex items-center">
                    <PlayIcon size={18} className="mr-2" />
                    {currentlyStarted && !exam.completed ? 'Ga Verder' : 'Start Examen'}
                </button>
                </div>
            </div>
        </div>
    );
}