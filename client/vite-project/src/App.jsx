import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthRegister from "./pages/auth/register";
import AuthLogin from "./pages/auth/login";
import AdminDashbord from "./pages/admin-view/dashbord";
import AdminOrder from "./pages/admin-view/order";
import AdminProducts from "./pages/admin-view/products";
import AdminFeatures from "./pages/admin-view/features";
import AdminLayout from "./components/admin-view/layout";
import NotFound from "./pages/not-found";
import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingAccount from "./pages/shoping-view/account";
import ShoppingHome from "./pages/shoping-view/home";
import ShoppingItems from "./pages/shoping-view/items";
import ShoppingCheckOut from "./pages/shoping-view/checkout";
import AuthCheck from "./components/common/auth-check";
import UnAuthPage from "./pages/unauth-page/unauthPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
function App() {
  const { isAuthenticated, user, isLoadding } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoadding)
    return <Skeleton className="h-[20px] w-[100px] rounded-full" />;
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthCheck isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </AuthCheck>
          }
        >
          <Route path="register" element={<AuthRegister />} />
          <Route path="login" element={<AuthLogin />} />
        </Route>
        <Route
          path="/admin"
          element={
            <AuthCheck isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </AuthCheck>
          }
        >
          <Route path="dashboard" element={<AdminDashbord />} />
          <Route path="order" element={<AdminOrder />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="feature" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <AuthCheck isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </AuthCheck>
          }
        >
          <Route path="checkout" element={<ShoppingCheckOut />} />
          <Route path="items" element={<ShoppingItems />} />
          <Route path="home" element={<ShoppingHome />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        <Route path="/unauth-page" element={<UnAuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
