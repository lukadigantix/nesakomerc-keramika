import Wrapper from "@/components/layout/Wrapper";

function Bone({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-lg bg-zinc-200 animate-pulse ${className ?? ""}`}
    />
  );
}

export default function Loading() {
  return (
    <div className="pt-28 pb-24 min-h-screen">
      <Wrapper>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Bone className="h-3 w-16" />
          <Bone className="h-3 w-2" />
          <Bone className="h-3 w-24" />
          <Bone className="h-3 w-2" />
          <Bone className="h-3 w-20" />
          <Bone className="h-3 w-2" />
          <Bone className="h-3 w-40" />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-12 gap-12">

          {/* Gallery — col-span-7 */}
          <div className="col-span-7 flex flex-col gap-4">
            {/* Main image */}
            <Bone className="w-full aspect-square rounded-2xl" />
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              <Bone className="aspect-square rounded-xl" />
              <Bone className="aspect-square rounded-xl" />
              <Bone className="aspect-square rounded-xl" />
              <Bone className="aspect-square rounded-xl" />
            </div>
          </div>

          {/* Info — col-span-5 */}
          <div className="col-span-5 flex flex-col gap-6 pt-2">

            {/* Category label + name */}
            <div className="flex flex-col gap-3">
              <Bone className="h-3 w-28" />
              <Bone className="h-8 w-4/5" />
              <Bone className="h-8 w-2/3" />
              <Bone className="h-4 w-full mt-1" />
              <Bone className="h-4 w-5/6" />
              <Bone className="h-4 w-3/4" />
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <Bone className="h-9 w-36" />
              <Bone className="h-5 w-16" />
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-100" />

            {/* Specs rows */}
            <div className="flex flex-col divide-y divide-zinc-100">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center py-3.5">
                  <Bone className="h-4 w-24" />
                  <Bone className="h-4 w-32" />
                </div>
              ))}
            </div>

            {/* CTA buttons — matches QuantitySelector height */}
            <div className="flex gap-3">
              <Bone className="h-12 w-28 rounded-full" />
              <Bone className="h-12 flex-1 rounded-full" />
            </div>

            {/* Trust badges */}
            <div className="flex flex-col gap-3 pt-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Bone className="h-4 w-4 shrink-0 rounded" />
                  <Bone className="h-4 w-64" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16 flex flex-col gap-6">
          <div className="flex gap-6 border-b border-zinc-100 pb-4">
            <Bone className="h-5 w-20" />
            <Bone className="h-5 w-40" />
          </div>
          <Bone className="h-4 w-full" />
          <Bone className="h-4 w-11/12" />
          <Bone className="h-4 w-4/5" />
          <Bone className="h-4 w-2/3" />
        </div>

        {/* Related products */}
        <div className="mt-24">
          <div className="flex items-end justify-between mb-10">
            <div className="flex flex-col gap-2">
              <Bone className="h-3 w-24" />
              <Bone className="h-7 w-44" />
            </div>
            <Bone className="h-4 w-32" />
          </div>
          <div className="grid grid-cols-5 gap-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Bone className="aspect-square w-full rounded-xl" />
                <Bone className="h-3 w-16" />
                <Bone className="h-5 w-4/5" />
                <Bone className="h-5 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  );
}

