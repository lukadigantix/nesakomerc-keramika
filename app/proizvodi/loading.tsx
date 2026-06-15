import Wrapper from "@/components/layout/Wrapper";

function Bone({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-zinc-200 ${className ?? ""}`} />;
}

export default function Loading() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      {/* Hero */}
      <div
        className="pt-28 pb-8"
        style={{ background: "linear-gradient(to right, #e11d1b, #f97316)" }}
      >
        <Wrapper>
          <div className="flex items-center gap-2 mb-6">
            <Bone className="h-3 w-14 bg-white/30" />
            <Bone className="h-3 w-2 bg-white/30" />
            <Bone className="h-3 w-24 bg-white/30" />
          </div>
          <Bone className="h-9 w-48 sm:w-64 bg-white/30 mb-3" />
          <Bone className="h-4 w-72 bg-white/30" />
        </Wrapper>
      </div>

      {/* Category grid skeleton */}
      <div className="pt-12 pb-16">
        <Wrapper>
          <div className="grid grid-cols-3 max-[767px]:grid-cols-2 max-[479px]:grid-cols-1 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <Bone
                key={i}
                className="w-full aspect-4/3 rounded-2xl"
              />
            ))}
          </div>
        </Wrapper>
      </div>
    </div>
  );
}

