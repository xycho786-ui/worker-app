import WorkerBottomNav from "@/components/WorkerBottomNav";

export default function WorkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <WorkerBottomNav />
    </>
  );
}
