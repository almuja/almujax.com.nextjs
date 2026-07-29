export default function BlogLoading() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-muted/20 rounded w-1/3 mx-auto"></div>
          <div className="h-6 bg-muted/20 rounded w-2/3 mx-auto"></div>
          <div className="h-4 bg-muted/20 rounded w-full"></div>
          <div className="h-4 bg-muted/20 rounded w-5/6"></div>
          <div className="h-4 bg-muted/20 rounded w-3/4"></div>
          <div className="h-64 bg-muted/20 rounded-xl"></div>
          <div className="h-4 bg-muted/20 rounded w-full"></div>
          <div className="h-4 bg-muted/20 rounded w-full"></div>
          <div className="h-4 bg-muted/20 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
}
