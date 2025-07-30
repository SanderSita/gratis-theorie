export default function NotFound() {
  return (
    <div className="bg-gradient-to-br from-orange-100 via-white to-blue-100 py-24 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <img
            src="/assets/svg/logo.svg"
            alt="Gratis Auto Theorie Logo"
            className="w-20 h-20 rounded-3xl shadow-xl p-2"
          />
        </div>
        <h1 className="text-6xl md:text-7xl font-light text-gray-800 mb-6 tracking-tight">
          404
        </h1>
        <p className="text-2xl md:text-3xl text-gray-600 mb-4 font-light max-w-4xl mx-auto">
          Oeps! De pagina die je zoekt bestaat niet.
        </p>
      </div>
    </div>
  );
}
