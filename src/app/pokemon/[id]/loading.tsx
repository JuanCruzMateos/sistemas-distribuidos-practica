export default function PokemonDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="w-32 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>

      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-gray-300 to-gray-400 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-10 bg-gray-400 rounded w-48 mb-2 animate-pulse"></div>
              <div className="h-6 bg-gray-400 rounded w-16 animate-pulse"></div>
            </div>
            <div className="text-right">
              <div className="h-4 bg-gray-400 rounded w-24 mb-1 animate-pulse"></div>
              <div className="h-8 bg-gray-400 rounded w-12 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-64 h-64 bg-gray-300 rounded-lg mx-auto animate-pulse"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="h-4 bg-gray-300 rounded w-12 mb-2 animate-pulse"></div>
                  <div className="h-8 bg-gray-300 rounded w-16 mx-auto animate-pulse"></div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="h-4 bg-gray-300 rounded w-12 mb-2 animate-pulse"></div>
                  <div className="h-8 bg-gray-300 rounded w-16 mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="h-6 bg-gray-300 rounded w-16 mb-3 animate-pulse"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-8 bg-gray-300 rounded-full w-20 animate-pulse"></div>
                  <div className="h-8 bg-gray-300 rounded-full w-24 animate-pulse"></div>
                </div>
              </div>

              <div>
                <div className="h-6 bg-gray-300 rounded w-20 mb-3 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
                  <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
                  <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
                </div>
              </div>

              <div>
                <div className="h-6 bg-gray-300 rounded w-24 mb-3 animate-pulse"></div>
                <div className="space-y-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-300 h-2 rounded-full w-1/2 animate-pulse"></div>
                        </div>
                        <div className="h-4 bg-gray-300 rounded w-8 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
