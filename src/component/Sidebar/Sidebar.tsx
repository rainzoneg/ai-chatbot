export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`fixed top-0 right-0 h-full w-[23%] bg-gray-800/50 backdrop-blur-sm transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="text-white text-xl font-bold mt-5 ml-5 ">Chat Settings</div>
      <div className="flex flex-col gap-4 px-4"></div>
    </aside>
  );
}
