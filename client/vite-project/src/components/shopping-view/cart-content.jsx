import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, updateCart } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function UserCartContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleUpdateQuantity(getcartItem, typeOfAction) {
    dispatch(
      updateCart({
        userId: user?.id,
        productId: getcartItem.productId,
        quantity:
          typeOfAction === "plus"
            ? getcartItem.quantity + 1
            : getcartItem.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast(data?.payload?.message);
      }
    });
  }

  function handleDeleteCart(getCartItemId) {
    dispatch(
      deleteCart({ userId: user?.id, productId: getCartItemId?.productId })
    );
  }

  return (
    <div className="flex items-center space-y-2 px-4">
      <img
        src={cartItem?.image}
        alt={cartItem.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1 mt-0 px-2">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-6 h-6" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-bold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-6 h-6" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleDeleteCart(cartItem)}
          className="cursor-pointer mt-1 "
          size="20"
        />
      </div>
    </div>
  );
}

export default UserCartContent;
