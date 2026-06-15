import Wrapper from "@/components/layout/Wrapper";

function Bone({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-zinc-200 ${className ?? ""}`} />;
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white overflow-hidden">
      <Bone className="w-full h-64 sm:h-72 rounded-none rounded-t-2xl" />
      <div className="p-4 flex flex-col gap-3">
        <Bone className="h-3 w-1/3" />
        <Bone className="h-4 w-4/5" />
        <Bone className="h-4 w-3/5" />
        <div className="flex items-center justify-between mt-1">
          <Bone className="h-5 w-24" />
          <Bone className="h-9 w-9 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      {/* Hero */}
      <div
        className="pt-28 pb-10"
        style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}
      >
        <Wrapper>
          <div className="flex items-center gap-2 mb-6">
            <Bone className="h-3 w-14 bg-white/30" />
            <Bone className="h-3 w-2 bg-white/30" />
            <Bone className="h-3 w-20 bg-white/30" />
            <Bone className="h-3 w-2 bg-white/30" />
            <Bone className="h-3 w-28 bg-white/30" />
          </div>
          <Bone className="h-9 w-52 sm:w-72 bg-white/30 mb-3" />
          <Bone className="h-4 w-36 bg-white/30" />
        </Wrapper>
      </div>

      <div className="pt-10 pb-12">
        <Wrapper>
          <div className="flex gap-12">
            {/* Sidebar — wide screens only */}
            <aside className="hidden min-[1330px]:flex w-56 shrink-0 flex-col gap-4 pt-[49px]">
              {/* Subcategories section */}
              <Bone className="h-3 w-28" />
              {Array.from({ length: 4 }).map((_, i) => (
                <Bone key={i} className="h-4 w-full" />
              ))}
              {/* Price filter */}
              <Bone className="h-3 w-20 mt-4" />
              <Bone className="h-10 w-full" />
              {/* Brand filter */}
              <Bone className="h-3 w-16 mt-4" />
              {Array.from({ length: 5 }).map((_, i) => (
                <Bone key={i} className="h-4 w-full" />
              ))}
              {/* Attribute filter */}
              <Bone className="h-3 w-24 mt-4" />
              {Array.from({ length: 4 }).map((_, i) => (
                <Bone key={i} className="h-4 w-full" />
              ))}
            </aside>

            {/* Main */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 gap-4">
                <Bone className="h-9 w-32 min-[1330px]:hidden" />
                <Bone className="h-9 w-48 ml-auto" />
              </div>
              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
}

