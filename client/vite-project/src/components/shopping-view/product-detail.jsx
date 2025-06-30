import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCart } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { setProductDetail } from "@/store/shop/product-slice";
function ProductDetail({ open, setOpen, productDetail }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  function handleAddToCart(getCurrentId) {
    dispatch(
      addToCart({ userId: user?.id, productId: getCurrentId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getCart(user?.id));
        toast(data?.payload?.message);
      }
    });
  }

  function handleCloseDialog() {
    setOpen(false);
    dispatch(setProductDetail());
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent className="grd grid-cols-2 gap-8 sm:p-12 max-w-[80vw] sm:max-w-[70vw] lg:max-w-[60vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetail?.image}
            alt={productDetail?.title}
            width={600}
            height={600}
            className="object-cover w-full aspect-square"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl fontextrabold">{productDetail?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-4 mt-3">
              {productDetail?.description}
            </p>
          </div>
          <div className="items-center justify-between flex">
            <p
              className={`${
                productDetail?.salePrice > 0 ? "line-through" : ""
              } text-3xl font-bold text-primary`}
            >
              {productDetail?.price}
            </p>
            {productDetail?.salePrice > 0 ? (
              <p className="text-2xl text-muted-foreground ">
                {productDetail?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center mt-2 gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
            </div>
            <span className="text-muted-foreground">(4.5)</span>
          </div>

          <div className="mt-5 mb-5">
            <Button
              onClick={() => handleAddToCart(productDetail?._id)}
              className="w-full"
            >
              Add to cart
            </Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h1 className="text-xl font-bold mb-2">Review</h1>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>NB</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Nati Bayew</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>

                  <p className="text-muted-foreground">
                    This is awesom product
                  </p>
                </div>
              </div>
            </div>
            <div className="flex mt-3 items-center gap-2">
              <Input placeholder="Write a review" />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetail;
