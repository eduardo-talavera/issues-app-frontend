

export const IssuesSkeleton = () => {
  return (
    <div className="animate-pulse px-8 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="h-8 w-40 bg-gray-300 rounded mb-2" />
          <div className="h-4 w-60 bg-gray-200 rounded" />
        </div>
        <div className="h-10 w-32 bg-gray-300 rounded" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-10">
        <div className="h-10 w-60 bg-gray-200 rounded" />
        <div className="h-10 w-40 bg-gray-200 rounded" />
        <div className="h-10 w-40 bg-gray-200 rounded" />
        <div className="h-10 w-28 bg-gray-300 rounded" />
      </div>

      {/* Columnas del tablero */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((col) => (
          <div
            key={col}
            className="flex flex-col gap-4 p-4 border-2 border-dashed border-gray-200 rounded-lg"
          >
            <div className="h-6 w-32 bg-gray-300 rounded mb-2" />
            {[1, 2, 3].map((card) => (
              <div
                key={card}
                className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-3"
              >
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-2/3 bg-gray-100 rounded" />
                <div className="h-5 w-24 bg-gray-200 rounded mt-2" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
