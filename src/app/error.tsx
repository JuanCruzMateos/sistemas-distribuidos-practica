"use client";

import { useEffect } from "react";

export default function GlobalError({ 
  error, 
  reset 
}: { 
  error: Error & { digest?: string }; 
  reset: () => void; 
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#134686' }}>
          ¡Oops! Algo salió mal
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <div className="text-6xl mb-4">😵</div>
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#134686' }}>
            Error en la aplicación
          </h2>
          <p className="text-gray-600 mb-6">
            Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
          </p>
          <button 
            onClick={() => reset()}
            className="px-6 py-3 rounded-lg font-medium transition-colors"
            style={{ backgroundColor: '#feb21a', color: '#134686' }}
          >
            Intentar otra vez
          </button>
        </div>
      </div>
    </div>
  );
}
