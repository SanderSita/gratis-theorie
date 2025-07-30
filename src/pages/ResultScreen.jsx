import React from "react";
import { useParams } from "react-router-dom";

export default function ResultScreen() {
  const { examId } = useParams();

  const examData = JSON.parse(localStorage.getItem(`exam_${examId}`)) || null;
  const { totalQuestions, correctAnswers, incorrectAnswers, timeTaken } = examData || {};
  const passed = correctAnswers >= totalQuestions * 0.8;

  const onRestart = () => {
    // clear exam data from localstorage
    localStorage.removeItem(`exam_${examId}`);
    window.location.href = `/examen/${examId}`;
  }

  const onReview = () => {
    // Logic to review the exam questions
    window.location.href = `/examen/${examId}`;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 font-sans">
      <div className="bg-white rounded-[18px] shadow-md p-10 max-w-md w-full text-center">
        {/* Header */}
        <div className="flex items-center justify-center mb-6 relative">
          <h2 className="m-0 font-semibold text-2xl text-gray-800">
            Examen Voltooid!
          </h2>
        </div>

        {/* Score */}
        <div className="text-xl font-medium text-orange-600 mb-2">
          Je score: {correctAnswers} / {totalQuestions}
        </div>
        <div className="text-gray-500 mb-6">
          {passed ? (
            "Gefeliciteerd, je bent geslaagd!"
          ) : (
            <>
              Helaas, je bent niet geslaagd. <br /> Probeer het opnieuw!
            </>
          )}
        </div>

        {/* Breakdown */}
        <div className="bg-gray-100 rounded-xl py-4 flex justify-around mb-6">
          <div>
            <div className="font-semibold text-gray-800">{correctAnswers}</div>
            <div className="text-sm text-gray-500">Goed</div>
          </div>
          <div>
            <div className="font-semibold text-gray-800">{incorrectAnswers}</div>
            <div className="text-sm text-gray-500">Fout</div>
          </div>
          <div>
            <div className="font-semibold text-gray-800">{timeTaken}</div>
            <div className="text-sm text-gray-500">Tijd</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg py-3 px-8 w-full transition-colors"
            onClick={onRestart}
          >
            Opnieuw {passed ? 'oefenen' : 'proberen'}
          </button>
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg py-3 px-8 w-full transition-colors"
            onClick={onReview}
          >
            Vragen bekijken
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-3">
          Bekijk je antwoorden of probeer het examen opnieuw.
        </div>
      </div>
    </div>
  );
}
