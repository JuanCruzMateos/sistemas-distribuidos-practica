import Link from "next/link";

export default function PokemonNotFound() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center">
        <div className="mb-6">
          <div className="text-8xl mb-4">😢</div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Pokemon No Encontrado
          </h1>
          <p className="text-xl text-white mb-8">
            El Pokemon que buscas no existe o no está disponible.
          </p>
        </div>
        
        <Link 
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-lg shadow-md transition-colors text-lg font-medium"
          style={{ backgroundColor: '#feb21a', color: '#134686' }}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a la Lista de Pokemon
        </Link>
      </div>
    </div>
  );
}
