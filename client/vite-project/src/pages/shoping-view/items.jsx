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
import {
  getFilteredProducts,
  getProductDetail,
} from "@/store/shop/product-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { ArrowDownUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";
import ProductDetail from "@/components/shopping-view/product-detail";
import { addToCart, getCart } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams))
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  return queryParams.join("&");
}

function ShoppingItems() {
  const dispatch = useDispatch();
  const { products, productDetail } = useSelector(
    (state) => state.shoppingProducts
  );
  const { user } = useSelector((state) => state.auth);

  const [filtered, setFiltered] = useState({});
  const [sortItem, setSortItem] = useState(null);
  const [searchParam, setSearchParam] = useSearchParams();
  const [openDialog, setOpenDialog] = useState(false);
  const categorySearchParam = searchParam.get("category");

  function handleSortItem(value) {
    setSortItem(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilteres = { ...filtered };
    const indexOfCurrentSection =
      Object.keys(cpyFilteres).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      cpyFilteres = {
        ...cpyFilteres,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilteres[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilteres[getSectionId].push(getCurrentOption);
      else cpyFilteres[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFiltered(cpyFilteres);
    sessionStorage.setItem("filteres", JSON.stringify(cpyFilteres));
  }

  function handleProductDetail(getCurrentId) {
    dispatch(getProductDetail(getCurrentId));
  }

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

  useEffect(() => {
    if (productDetail !== null) setOpenDialog(true);
  }, [productDetail]);

  useEffect(() => {
    if (filtered && Object.keys(filtered).length > 0) {
      const createQueryString = createSearchParamsHelper(filtered);
      setSearchParam(new URLSearchParams(createQueryString));
    }
  }, [filtered]);

  useEffect(() => {
    setSortItem("price-hightolow");
    setFiltered(JSON.parse(sessionStorage.getItem("filteres")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filtered !== null && sortItem !== null)
      dispatch(
        getFilteredProducts({ filterParams: filtered, sortParams: sortItem })
      );
  }, [dispatch, sortItem, filtered]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <FilterProduct filtered={filtered} handleFiltered={handleFilter} />
      <div className="bg-background w-full shadow-sm rounded-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-extrabold">All products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground ">
              {products.length} {"Products "}
            </span>
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
                  onValueChange={handleSortItem}
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
          {products && products?.length > 0
            ? products.map((productItem) => (
                <ShoppingProductTile
                  product={productItem}
                  key={productItem._id}
                  handleProductDetail={handleProductDetail}
                  handleAddToCart={handleAddToCart}
                />
              ))
            : null}
        </div>
      </div>

      <ProductDetail
        productDetail={productDetail}
        open={openDialog}
        setOpen={setOpenDialog}
      />
    </div>
  );
}

export default ShoppingItems;
