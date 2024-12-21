export default function StatusLoad({ loading, hasMore }) {
  return (
    <>
      {loading && (
        <div className="mb-10 text-center">
          <span className="text-gray-600">Loading more contents...</span>
        </div>
      )}
      {!hasMore && (
        <div className="mb-10 text-center">
          <span className="text-gray-600">No more content to load.</span>
        </div>
      )}
    </>
  );
}
