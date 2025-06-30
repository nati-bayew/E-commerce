import bannerOne from "../../assets/ba1.avif";
import bannerTwo from "../../assets/ba3.avif";
import bannerThree from "../../assets/ba4.jpg";

import { Button } from "@/components/ui/button";
import {
  BabyIcon,
  Braces,
  Cable,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  FactoryIcon,
  Shapes,
  Shirt,
  ShirtIcon,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/store/admin/product-slice";
import {
  getFilteredProducts,
  getProductDetail,
} from "@/store/shop/product-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, getCart } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import ProductDetail from "@/components/shopping-view/product-detail";

const categories = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kid", label: "Kid", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brands = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: Shapes },
  { id: "levi", label: "Levi's", icon: FactoryIcon },
  { id: "zara", label: "Zara", icon: Braces },
  { id: "h&m", label: "H&M", icon: Cable },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { products, productDetail } = useSelector(
    (state) => state.shoppingProducts
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const slides = [bannerOne, bannerTwo, bannerThree];

  function handleNavigateTo(getCurrentItem, section) {
    sessionStorage.removeItem("filteres");
    const filteresItem = { [section]: [getCurrentItem.id] };

    sessionStorage.setItem("filteres", JSON.stringify(filteresItem));
    navigate("/shop/items");
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
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    dispatch(
      getFilteredProducts({ filterParams: "", sortParams: "price-hightolow" })
    );
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative h-[600px] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute w-full top-0 left-0 h-full object-cover transition-opacity duration-1000`}
          />
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2  left-4 transform -translate-y-1/2 bg-white/80 cursor-pointer z-20"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((preSlide) => (preSlide + 1) % slides.length)
          }
          className="absolute top-1/2  right-4 transform -translate-y-1/2 bg-white/80 cursor-pointer z-20"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-10 bg-gray-50">
        <div className="mx-auto px-4 container">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((item) => (
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={item.id}
                onClick={() => handleNavigateTo(item, "category")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50">
        <div className="mx-auto px-4 container">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands.map((item) => (
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={item.id}
                onClick={() => handleNavigateTo(item, "brand")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto px-4 container">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products && products.length > 0
              ? products.map((productItem) => (
                  <ShoppingProductTile
                    product={productItem}
                    handleProductDetail={handleProductDetail}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetail
        productDetail={productDetail}
        open={openDialog}
        setOpen={setOpenDialog}
      />
    </div>
  );
}

export default ShoppingHome;
