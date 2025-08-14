import React, { useState } from "react";

const defaultAmounts = {
  "5": "https://donate.stripe.com/aFa8wQ7MHadCd7mcMA8IU00",
  "10": "https://donate.stripe.com/fZudRaaYT4Ti4AQh2Q8IU01",
  "20": "https://donate.stripe.com/4gM6oI0kf85u5EU8wk8IU02"
};

export default function DonateSection( { onClose }) {
    const [selected, setSelected] = useState("10");

    const handleAmountClick = amount => {
        setSelected(amount);
    };

    const pay = async amount => {  
      window.open(defaultAmounts[amount], "_blank");
    }
  return (

    <div className="bg-white md:w-auto w-5/6 rounded-2xl md:max-w-sm mx-auto shadow-lg p-8 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex gap-2 items-center font-semibold text-lg text-center text-black">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>
        Steun onze website
        {onClose &&
          <svg onClick={() => onClose()} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x-icon lucide-x ml-auto hover:cursor-pointer"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        }
      </div>
      <p className="text-sm text-gray-500 mt-2 mb-4">Wilt u ons helpen deze website in de lucht te houden? Overweeg dan een donatie te doen om ons werk te steunen.</p>
      <p className="text-sm font-semibold my-4">Kies een hoeveelheid:</p>
      <div className="flex justify-center gap-4 mb-4">
        {Object.keys(defaultAmounts).map(amount => (
          <button
            key={amount}
            onClick={() => handleAmountClick(amount)}
            className={`min-w-[64px] py-3 rounded-md text-base border
              ${selected === amount ? "bg-black text-white shadow" : "bg-white text-black border-[#e5e5e8]"}
              transition`}
          >
            €{amount}
          </button>
        ))}
      </div>
      <button
        className="w-full bg-green-500  hover:bg-green-600 text-white rounded-xl px-4 py-2 text-sm transition"
        onClick={() => pay(selected)}
      >
        Verder
      </button>
      <p className="text-xs text-center text-gray-500 mt-4">U wordt doorgestuurd naar een beveiligde betaalpagina om uw donatie te voltooien.</p>
    </div>
  );
}
