export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl border border-gray-200">

        {/* Colonna Sinistra */}
        <div className="hidden md:flex md:w-1/2 bg-[#40a644] text-white flex-col justify-between p-10">
          <div>
            <h1 className="text-4xl font-bold">Rinnovaitalia</h1>
            <p className="mt-8 text-lg leading-relaxed">
              Efficienza energetica, sostenibilità e innovazione al servizio della tua casa.
            </p>
          </div>
          <div>
            <a
              href="/"
              className="inline-block border border-white rounded-full px-4 py-2 text-sm hover:bg-white hover:text-[#40a644] transition"
            >
              Torna al sito →
            </a>
          </div>
        </div>

        {/* Colonna Destra: Login Form */}
        <div className="w-full md:w-1/2 bg-white text-black px-10 py-12">
          <h2 className="text-3xl font-bold mb-2">Accedi</h2>
          <p className="text-sm text-gray-600 mb-8">
            Non hai un account? <a href="#" className="text-[#40a644] hover:underline">Registrati</a>
          </p>

          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="text-sm block mb-1">Email</label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-sm focus:ring-2 focus:ring-[#40a644] outline-none"
                placeholder="tuo@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm block mb-1">Password</label>
              <input
                type="password"
                id="password"
                required
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 text-sm focus:ring-2 focus:ring-[#40a644] outline-none"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <input type="checkbox" id="terms" className="accent-[#40a644]" />
              <label htmlFor="terms">
                Accetto i <a href="#" className="text-[#40a644] hover:underline">Termini & Condizioni</a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#40a644] hover:bg-[#2e8336] text-white rounded-md font-semibold transition-all"
            >
              Accedi
            </button>

            <div className="flex items-center gap-2 my-4">
              <div className="h-px bg-gray-300 flex-1" />
              <span className="text-xs text-gray-400">oppure</span>
              <div className="h-px bg-gray-300 flex-1" />
            </div>

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
                <span className="text-sm">Google</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition">
                <img src="https://www.svgrepo.com/show/448255/apple.svg" alt="Apple" className="h-5 w-5" />
                <span className="text-sm">Apple</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
