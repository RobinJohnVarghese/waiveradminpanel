export default function BookingsLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-white p-4 pb-8 md:pb-16 animate-pulse">
      <div className="border-b pb-4 mb-4 w-full">
        <div className="h-7 w-48 bg-gray-200 rounded"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-lg border border-gray-200 p-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="border rounded-md p-4 space-y-3">
        <div className="h-10 bg-gray-100 rounded w-64 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-full"></div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-50 rounded border border-gray-100"></div>
        ))}
      </div>
    </div>
  );
}
