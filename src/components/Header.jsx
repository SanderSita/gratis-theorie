import React from 'react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-4 shadow-sm">
      <div className="mx-auto flex justify-between items-center">
        <div onClick={() => window.location.assign('/overzicht')} className="flex items-center gap-4 cursor-pointer">
          <img
            src="https://uploadthingy.s3.us-west-1.amazonaws.com/ekwuapqFGkAUsQe1QsFHqR/icon_%281%29.png"
            alt="Gratis Auto Theorie Logo"
            className="w-10 h-10 rounded-xl"
          />
          <h1 className="text-xl font-semibold text-gray-800">
            Auto Theorie Examen
          </h1>
        </div>
      </div>
    </header>
  );
}