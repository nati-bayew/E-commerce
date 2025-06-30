import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "../ui/table";
import ShoppingOrderDetail from "./shopping-order-detail";
import {
  getOrdersDetail,
  getOrersByUserId,
  resetOrderDetail,
} from "@/store/shop/order-slice";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";

function Orders() {
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetail } = useSelector((state) => state.shopOrder);
  const [openOrdersDialog, setOpenOrdersDialog] = useState(false);
  const dispatch = useDispatch();

  function handleDetailOrders(getOrderId) {
    dispatch(getOrdersDetail(getOrderId));
    setOpenOrdersDialog(true);
  }
  /*
  useEffect(() => {
    if (orderDetail !== null) setOpenOrdersDialog(true);
  }, [orderDetail]);

  */
  useEffect(() => {
    dispatch(getOrersByUserId(user?.id));
  }, [dispatch]);

  console.log(orderDetail, "orderDetail");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Detail</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((item) => (
                  <TableRow>
                    <TableCell>{item?._id}</TableCell>
                    <TableCell>{item?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`px-3 py-1  ${
                          item?.orderStatus === "delivered"
                            ? "bg-green-600"
                            : item?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {item?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${item?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openOrdersDialog}
                        onOpenChange={() => {
                          setOpenOrdersDialog(false);
                          dispatch(resetOrderDetail);
                        }}
                      >
                        <Button onClick={() => handleDetailOrders(item?._id)}>
                          View Detail
                        </Button>
                        <ShoppingOrderDetail orderDetails={orderDetail} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Orders;
