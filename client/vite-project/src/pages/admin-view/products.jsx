import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/store/admin/product-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
const initalState = {
  image: null,
  title: "",
  description: "",
  brand: "",
  category: "",
  price: "",
  salePrice: "",
  totalStock: "",
};
function AdminProducts() {
  const [openNewProduct, setOpenNewProduct] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState(initalState);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageUploadLoadding, setImageUploadLoadding] = useState(false);
  const { products } = useSelector((state) => state.productSlice);

  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
    currentId !== null
      ? dispatch(updateProduct({ id: currentId, formData })).then((data) => {
          if (data.payload.success) {
            dispatch(getProducts());
            setOpenNewProduct(false);
            setFormData(initalState);
            toast(data.payload.message);
          }
        })
      : dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then(
          (data) => {
            if (data?.payload.success) {
              dispatch(getProducts());
              setOpenNewProduct(false);
              setImageFile(null);
              setFormData(initalState);
              toast(data.payload.message);
            }
          }
        );
  }

  function handleDeleteProduct(getCurrentId) {
    console.log(getCurrentId);

    dispatch(deleteProduct(getCurrentId)).then((data) => {
      if (data.payload.success) {
        dispatch(getProducts());
        toast(data.payload.message);
      }
    });
  }

  function isValidForm() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div
        onClick={() => setOpenNewProduct(true)}
        className=" w-full flex justify-end mb-4"
      >
        <Button>Add New Product</Button>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products && products.length > 0
          ? products.map((productItem) => (
              <AdminProductTile
                setOpenNewProduct={setOpenNewProduct}
                setFormData={setFormData}
                setCurrentId={setCurrentId}
                products={productItem}
                handleDelete={handleDeleteProduct}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openNewProduct}
        onOpenChange={() => {
          setOpenNewProduct(false);
          setCurrentId(null);
          setFormData(initalState);
        }}
      >
        <SheetContent side="right" className=" overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentId !== null ? "Edit a product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageUploadLoadding={imageUploadLoadding}
            setImageUploadLoadding={setImageUploadLoadding}
            isEditMode={currentId !== null}
          />
          <div className=" py-6 px-6">
            <CommonForm
              formControls={addProductElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText={currentId !== null ? "Edit" : "Add"}
              isBtnDisabled={!isValidForm()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
