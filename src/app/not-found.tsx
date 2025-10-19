import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center">
        <div className="mb-6">
          <div className="text-8xl mb-4">🔍</div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#134686' }}>
            Página No Encontrada
          </h1>
          <p className="text-xl mb-8" style={{ color: '#134686' }}>
            La página que buscas no existe o ha sido movida.
          </p>
        </div>
        
        <Link 
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-lg shadow-md transition-colors text-lg font-medium"
          style={{ backgroundColor: '#feb21a', color: '#134686' }}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
