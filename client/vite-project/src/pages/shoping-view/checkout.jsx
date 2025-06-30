import Address from "@/components/shopping-view/address";
import accountImg from "../../assets/ban2.jpg";
import UserCartContent from "@/components/shopping-view/cart-content";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
function ShoppingCheckOut() {
  const { cartItems } = useSelector((state) => state.shopCart);

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

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accountImg}
          alt="account Image"
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-5">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item, index) => (
                <UserCartContent key={index} cartItem={item} />
              ))
            : null}
          <div className="flex justify-between mt-6 space-y-4">
            <span className="font-bold">Total</span>
            <span className="font-bold">${totalCartAmount}</span>
          </div>
          <div className="mt-2 w-full">
            <Button className="w-full">Payment On Cash</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckOut;
