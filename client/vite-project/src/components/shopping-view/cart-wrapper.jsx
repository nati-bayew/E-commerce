import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartContent from "./cart-content";

function UserCartWrapper({ cartItems, setOpenCart }) {
  const navigate = useNavigate();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-6 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartContent cartItem={item} />)
          : null}
      </div>
      <div className="mt-6 space-y-4 px-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
        <Button
          onClick={() => {
            navigate("/shop/checkout"), setOpenCart(false);
          }}
          className="w-full mt-2"
        >
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
