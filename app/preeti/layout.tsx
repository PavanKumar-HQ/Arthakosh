import { SunlightBackground } from "@/components/preeti/SunlightBackground";

export default function PreetiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full bg-white text-slate-800 z-20 overflow-hidden">
      <SunlightBackground />
      {children}
    </div>
  );
}
