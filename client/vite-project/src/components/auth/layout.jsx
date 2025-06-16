import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex">
      <div className="hidden lg:flex items-center justify-center bg-black px-12 w-1/2">
        <div className="text-center max-w-md space-y-6 text-primary-foreground">
          <h2 className="text-4xl font-extrabold tracking-tight">
            WELLCOME TO E-COMMERCE
          </h2>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
