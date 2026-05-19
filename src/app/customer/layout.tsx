import CustomerBottomNav from "@/components/CustomerBottomNav";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <CustomerBottomNav />
    </>
  );
}
