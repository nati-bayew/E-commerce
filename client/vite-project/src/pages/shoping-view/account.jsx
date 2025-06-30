import accountImg from "../../assets/ban2.jpg";
import Orders from "@/components/shopping-view/oreders";
import Address from "@/components/shopping-view/address";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accountImg}
          alt="account Image"
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg bg-background border p-6 shadow-sm ">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Orders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
