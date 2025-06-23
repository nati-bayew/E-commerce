import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageUploadLoaddding,
  setImageUploadLoadding,
  isEditMode,
}) {
  console.log(isEditMode, "isEditMode");

  const inputRef = useRef(null);
  function handleImageChange(event) {
    const ChoosenFile = event.target.files?.[0];
    if (ChoosenFile) setImageFile(ChoosenFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const dropedImage = event.dataTransfer.files?.[0];
    if (dropedImage) setImageFile(dropedImage);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );

    if (response?.data?.success) setUploadedImageUrl(response.data.result.url);
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);
  return (
    <div className="w-full max-w-md mx-auto px-6">
      <Label className="text-lg font-semibold mb-2  block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        }border-2 border-dashed rounded-lg p-2`}
      >
        <Input
          id="image-upload"
          type="file"
          ref={inputRef}
          onChange={handleImageChange}
          className="hidden"
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            }flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop image or click to upload</span>
          </Label>
        ) : imageUploadLoaddding ? (
          <Skeleton className="h-10 bg-amber-200 rounded:md" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 mr-2 text-primary" />
              <p className="text-sm font-medium">{imageFile.name}</p>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleRemoveImage}
              >
                <XIcon className="w-4 h-4" />
                <span className="sr-only">Remove Image</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
