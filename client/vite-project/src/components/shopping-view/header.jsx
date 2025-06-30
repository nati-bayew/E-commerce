import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { headerMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { getCart } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import { getAddress } from "@/store/shop/addres-slice";
import { addOrders } from "@/store/shop/order-slice";
import { toast } from "sonner";

function RightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { addressList } = useSelector((state) => state.shopAddress);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  function handleOrdersData(event) {
    event.preventDefault();
    const totalCartAmount =
      cartItems && cartItems.items && cartItems.items.length > 0
        ? cartItems.items.reduce(
            (sum, currentItem) =>
              sum +
              (currentItem?.salePrice > 0
                ? currentItem?.salePrice
                : currentItem?.price) *
                currentItem.quantity,
            0
          )
        : 0;
    const orderData = {
      userId: user?.id,
      orderDate: new Date(),
      orderStatus: "Pending",
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        price: item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: addressList.map((item) => ({
        addressId: item?._id,
        name: user?.userName,
        address: item?.address,
        city: item?.city,
        phone: item?.phone,
      })),
      totalAmount: totalCartAmount,
    };

    dispatch(addOrders(orderData)).then((data) => {
      if (data?.payload?.success) {
        toast("Successfully get orders");
      }
    });
  }
  useEffect(() => {
    dispatch(getAddress(user?.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCart(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:flex-row lg:items-center flex-col gap-3">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="cursor-pointer"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
          setOpenCart={setOpenCartSheet}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black cursor-pointer text-white font-extrabold">
              {user.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged as {user.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="w-4  h-4 " />
            <Button
              className="bg-background cursor-pointer"
              onClick={handleOrdersData}
            >
              Account
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="w-4  h-4 " />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  function MenuItems() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParam, setSearchParam] = useSearchParams();
    function handleNavBar(getCurrentItem) {
      sessionStorage.removeItem("filteres");
      const FilterItem =
        getCurrentItem.id !== "home" && getCurrentItem.id !== "products"
          ? {
              category: [getCurrentItem.id],
            }
          : null;
      sessionStorage.setItem("filteres", JSON.stringify(FilterItem));
      location.pathname.includes("items") && FilterItem !== null
        ? setSearchParam(new URLSearchParams(`?category=${getCurrentItem.id}`))
        : navigate(getCurrentItem.path);
    }
    return (
      <nav className="lg:flex-row flex gap-6 mb-3 lg:mb-0 flex-col">
        {headerMenuItems.map((menuItems) => (
          <Label
            className="text-sm font-medium sm:px-2 cursor-pointer"
            key={menuItems.id}
            onClick={() => handleNavBar(menuItems)}
          >
            {menuItems.label}
          </Label>
        ))}
      </nav>
    );
  }
  return (
    <header className="sticky w-full top-0 bg-background z-40">
      <div className="flex items-center border-b justify-between h-16 px-4 md:px-6">
        <Link to="/shop/home" className="flex gap-2 items-center ">
          <HousePlug className="w-6 h-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="lg:hidden">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full px-2 max-w-xs">
            <MenuItems />
            <RightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <RightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
