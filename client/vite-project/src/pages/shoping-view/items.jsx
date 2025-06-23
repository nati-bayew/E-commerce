import FilterProduct from "@/components/shopping-view/filter-items";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { getFilteredProducts } from "@/store/shop/product-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { ArrowDownUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShoppingItems() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.shoppingProducts);
  const [filtered, setFiltered] = useState(null);
  const [sortItem, setSortItem] = useState(null);

  function handleSortItem(value) {
    console.log(value);
  }

  useEffect(() => {
    dispatch(getFilteredProducts());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <FilterProduct />
      <div className="bg-background w-full shadow-sm rounded-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-extrabold">All products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground "> {products.length}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowDownUpIcon className="w-4 h-4" />
                  Sortby
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sortItem}
                  onValueChange={handleSortItem(value)}
                >
                  {sortOptions.map((items) => (
                    <DropdownMenuRadioItem value={items.id} key={items.id}>
                      {items.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products && products.length > 0
            ? products.map((productItem) => (
                <ShoppingProductTile products={productItem} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default ShoppingItems;
