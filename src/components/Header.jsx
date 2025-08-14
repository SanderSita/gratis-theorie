import React from 'react';

export function Header() {
  return (
    <header className="bg-white py-4 px-4">
      <div className="mx-auto flex justify-between items-center">
        <div onClick={() => window.location.assign('/')} className="flex items-center gap-4 cursor-pointer">
          <img
            src="https://uploadthingy.s3.us-west-1.amazonaws.com/ekwuapqFGkAUsQe1QsFHqR/icon_%281%29.png"
            alt="Auto Theorie Voor Niks Logo"
            className="w-10 h-10 rounded-xl"
          />
          <h1 className="text-xl my-auto font-light text-gray-800">
            Auto Theorie Voor Niks
          </h1>
        </div>
      </div>
    </header>
  );
}