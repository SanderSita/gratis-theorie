import React from "react";

export function FinishConfirm({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-xs w-full">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Examen afronden?
        </h3>
        <p className="text-gray-600 mb-6">
          Weet je het zeker? Je kunt je antwoorden niet meer wijzigen.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors"
          >
            Terug
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-medium transition-colors"
          >
            Afronden
          </button>
        </div>
      </div>
    </div>
  );
}
