import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  products,
  setFormData,
  setCurrentId,
  setOpenNewProduct,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="relative">
        <img
          className="h-[300px] object-cover rounded-t-lg w-full "
          src={products.image}
          alt={products.title}
        />
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{products.title}</h2>
          <div className="flex justify-between items-center">
            <span
              className={`${
                products.salePrice > 0 ? "line-through " : ""
              }text-lg font-extrabold text-primary`}
            >
              {products.price}
            </span>
            <span className="text-lg font-bold">{products.salePrice}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenNewProduct(true);
              setCurrentId(products._id);
              setFormData(products);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(products._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
