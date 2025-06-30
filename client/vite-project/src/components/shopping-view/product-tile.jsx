import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ShoppingProductTile({
  product,
  handleProductDetail,
  handleAddToCart,
}) {
  return (
    <Card className="m-3 p-0">
      <div onClick={() => handleProductDetail(product._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full mt-0 h-[200px] rounded-t-lg "
          />
          {product.salePrice ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-400">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="">
          <h2 className="text-xl font-bold mb-2 ">{product.title}</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-[16px]">
              {product.category}
            </span>
            <span className="text-muted-foreground text-[16px]">
              {product.brand}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span
              className={`${
                product.salePrice > 0 ? "line-through" : ""
              }text-primary font-bold text-lg`}
            >
              ${product.price}
            </span>
            {product.salePrice > 0 ? (
              <span className="text-primary font-bold text-lg">
                ${product.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button
          onClick={() => handleAddToCart(product._id)}
          className="w-full mb-2"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
