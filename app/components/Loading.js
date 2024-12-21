export default function Loading() {
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-white bg-opacity-85">
      <div className="flex flex-col items-center">
        <div className="rounded-md h-12 w-12 border-4 border-t-4 border-[#4c24e5] animate-spin absolute"></div>

        <p className="pt-20 text-lg font-semibold text-[#4c24e5] animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
