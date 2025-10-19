export default function PokemonSkeleton() {
  return (
    <div 
      className="w-full bg-white rounded-lg shadow-md p-4 border animate-pulse"
      style={{ borderColor: '#feb21a' }}
    >
      {/* Header with name and ID */}
      <div className="flex items-center justify-between mb-2">
        <div className="h-6 bg-gray-300 rounded w-32"></div>
        <div className="flex items-center gap-2">
          <div className="h-5 bg-gray-300 rounded-full w-12"></div>
        </div>
      </div>
      
      {/* Image and info section */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-16 h-16 bg-gray-300 rounded"></div>
        
        <div className="flex-1">
          {/* Types */}
          <div className="flex flex-wrap gap-1 mb-1">
            <div className="h-4 bg-gray-300 rounded-full w-12"></div>
            <div className="h-4 bg-gray-300 rounded-full w-16"></div>
          </div>
          {/* Height/Weight */}
          <div className="h-3 bg-gray-300 rounded w-20"></div>
        </div>
      </div>
      
      {/* Abilities */}
      <div className="flex flex-wrap gap-1">
        <div className="h-4 bg-gray-300 rounded-full w-16"></div>
        <div className="h-4 bg-gray-300 rounded-full w-20"></div>
        <div className="h-4 bg-gray-300 rounded-full w-14"></div>
      </div>
    </div>
  );
}
