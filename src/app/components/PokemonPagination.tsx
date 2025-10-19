"use client";

interface PokemonPaginationProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  currentCount: number;
  totalCount?: number;
}

export default function PokemonPagination({
  onLoadMore,
  isLoading,
  hasMore,
  currentCount,
  totalCount
}: PokemonPaginationProps) {
  return (
    <div className="flex flex-col items-center space-y-4 py-8">
      <div className="text-center">
        <p className="text-lg font-medium" style={{ color: '#134686' }}>
          Showing {currentCount} Pokemon
          {totalCount && ` of ${totalCount}`}
        </p>
      </div>
      
      {hasMore && (
        <button
          onClick={onLoadMore}
          disabled={isLoading}
          className={`
            px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200
            ${isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95'
            }
          `}
          style={{ 
            backgroundColor: isLoading ? '#9ca3af' : '#134686',
            minWidth: '200px'
          }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Loading...</span>
            </div>
          ) : (
            'Load More Pokemon'
          )}
        </button>
      )}
      
      {!hasMore && totalCount && (
        <div className="text-center">
          <p className="text-gray-600 font-medium">
            🎉 You've seen all {totalCount} Pokemon!
          </p>
        </div>
      )}
    </div>
  );
}
