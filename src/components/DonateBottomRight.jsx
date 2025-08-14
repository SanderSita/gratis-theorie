import DonateSection from "./DonateSection";
import React, { useState } from "react";

export default function DonateBottomRight() {
    const [showPopup, setShowPopup] = useState(false);

    const showPopupUI = () => {
        setShowPopup(true);
    }

    return (
        <>
            {showPopup && <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>}
            <div className="fixed bottom-0 right-0 p-8 z-50">
                <button onClick={showPopupUI} className="flex gap-2 bg-green-500  hover:bg-green-600 text-sm transition text-white px-6 py-4 rounded-xl shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-piggy-bank-icon lucide-piggy-bank my-auto"><path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"/><path d="M16 10h.01"/><path d="M2 8v1a2 2 0 0 0 2 2h1"/></svg>
                    <span>Doneer</span>
                </button>
            </div>
            {showPopup && 
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <DonateSection onClose={() => setShowPopup(false)} />
                </div>
            }
        </>
    )
}