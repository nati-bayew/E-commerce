import { logoutUser } from "@/store/auth-slice";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logoutUser());
  }
  return (
    <header className="flex items-center px-4 py-4 justify-between bg-background border-b">
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden cursor-pointer sm:block"
      >
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </button>
      <div className="flex flex-1 justify-end">
        <button
          onClick={handleLogout}
          className="inline-flex gap-2 bg-black text-white px-4 py-2 text-sm font-semi-bold items-center rounded-md shadow"
        >
          <LogOut /> Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
