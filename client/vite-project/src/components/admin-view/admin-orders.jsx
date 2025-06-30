import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "../ui/table";
import OrderDetails from "./order-deatils";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  getOrdersDetails,
  resetOrderDetailForAdmin,
} from "@/store/admin/orders-slice";
import { Badge } from "../ui/badge";
function AdminOrdersView() {
  const [openOrdersDialog, setOpenOrdersDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrders);
  const dispatch = useDispatch();

  function handleDetailOrders(getOrderId) {
    setOpenOrdersDialog(true);
    dispatch(getOrdersDetails(getOrderId));
  }

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle> All Orders</CardTitle>
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
                          dispatch(resetOrderDetailForAdmin);
                        }}
                      >
                        <Button onClick={() => handleDetailOrders(item?._id)}>
                          View Detail
                        </Button>
                        <OrderDetails orderDetails={orderDetails} />
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

export default AdminOrdersView;
