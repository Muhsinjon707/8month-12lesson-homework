import Header from "../components/Header";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="w-full bg-[#5c566d]">
      {/* <Header /> */}
      {children}
    </main>
  );
}
