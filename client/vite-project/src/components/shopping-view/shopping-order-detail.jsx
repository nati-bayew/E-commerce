import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetail({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center mt-2 mt-4 justify-between">
            <p className="font-bold">Order Id</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center mt-2 justify-between">
            <p className="font-bold">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex items-center mt-2 justify-between">
            <p className="font-bold">Order Status</p>
            <Label>
              <Badge
                className={`px-3 py-1 ${
                  orderDetails?.orderStatus === "delivered"
                    ? "bg-green-600"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
          <div className="flex items-center mt-2 justify-between">
            <p className="font-bold">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <Separator />
          <div className="grid gap-6">
            <div className="grid gap-2">
              <div className="font-bold">Order Deatils</div>
            </div>
          </div>
          <ul className="grid gap-1">
            {orderDetails &&
            orderDetails.cartItems &&
            orderDetails.cartItems.length > 0
              ? orderDetails.cartItems.map((item) => (
                  <li className="flex items-center justify-between m">
                    <p>Title: {item?.title}</p>
                    <p>Quantity: {item?.quantity}</p>
                    <p>Price: {item?.price}</p>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="font-medium">Shiping Info</div>

          {orderDetails &&
          orderDetails.addressInfo &&
          orderDetails.addressInfo.length > 0
            ? orderDetails.addressInfo.map((item) => (
                <div className="grid gap-0.5 text-muted-foerground">
                  <span>User Name: {item?.name}</span>
                  <span>Address: {item?.address}</span>
                  <span>City: {item?.city}</span>
                  <span>Phone: {item?.phone}</span>
                </div>
              ))
            : null}
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetail;
