import { Button } from "@/components/ui/button";
import accountImg from "../../assets/ban2.jpg";
import { useNavigate } from "react-router-dom";
function AdminDashbord() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-8">
      <p className="text-6xl items-center justify-center text-center text-amber-600">
        WELLCOME TO THE ADMIN PAGE
      </p>
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accountImg}
          alt="account Image"
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="flex mt-4 items-center justify-between">
        <Button onClick={() => navigate("/admin/products")}>Products</Button>
        <Button onClick={() => navigate("/admin/order")}>Orders</Button>
      </div>
    </div>
  );
}

export default AdminDashbord;
