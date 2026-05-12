import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function Wrapper({ children, className }: WrapperProps) {
  return (
    <div className={cn("mx-auto w-full max-w-400 px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
