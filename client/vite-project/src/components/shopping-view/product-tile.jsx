import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ShoppingProductTile({ product }) {
  return (
    <Card>
      <div>
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full object-cover h-[200px] rounded-t-lg "
          />
          {product.salePrice ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-400">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent>
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
        <CardFooter>
          <Button className="w-full">Add to Cart</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;
