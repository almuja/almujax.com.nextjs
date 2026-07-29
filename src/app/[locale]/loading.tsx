export default function HomeLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse space-y-8 text-center w-full max-w-md px-4">
        <div className="w-32 h-32 bg-muted/20 rounded-full mx-auto"></div>
        <div className="h-12 bg-muted/20 rounded w-2/3 mx-auto"></div>
        <div className="h-6 bg-muted/20 rounded w-1/2 mx-auto"></div>
        <div className="h-4 bg-muted/20 rounded w-full"></div>
        <div className="h-4 bg-muted/20 rounded w-3/4 mx-auto"></div>
        <div className="flex gap-4 justify-center">
          <div className="h-12 w-40 bg-muted/20 rounded-xl"></div>
          <div className="h-12 w-40 bg-muted/20 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
