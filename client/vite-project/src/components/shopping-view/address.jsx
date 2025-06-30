import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControl } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "@/store/shop/addres-slice";
import { toast } from "sonner";
import AddressCard from "./address-card";

const initialFormData = {
  address: "",
  city: "",
  phone: "",
};

function Address() {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const [currentEditedId, setCurrenEditedId] = useState(null);

  function handleManageAddress(event) {
    event.preventDefault();
    if (addressList.length >= 1 && currentEditedId === null) {
      toast("You can add only one address");
      setFormData(initialFormData);
      return;
    }

    currentEditedId !== null
      ? dispatch(
          updateAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(getAddress(user?.id));
            setCurrenEditedId(null);
            setFormData(initialFormData);
            toast(data?.payload?.message);
          }
        })
      : dispatch(addAddress({ ...formData, userId: user?.id })).then((data) => {
          if (data?.payload?.success) {
            dispatch(getAddress(user?.id));
            setFormData(initialFormData);
            toast(data?.payload?.message);
          }
        });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  function handleEditAddress(getCurrentAddressEditied) {
    setCurrenEditedId(getCurrentAddressEditied?._id);
    setFormData({
      ...formData,
      address: getCurrentAddressEditied?.address,
      city: getCurrentAddressEditied?.city,
      phone: getCurrentAddressEditied?.phone,
    });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data.payload.success) {
        dispatch(getAddress(user?.id));
        toast(data?.payload?.message);
      }
    });
  }

  useEffect(() => {
    dispatch(getAddress(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <h2 className="text-3xl font-bold text-center">Address Lists</h2>
      <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
        {addressList && addressList.length > 0
          ? addressList.map((item, index) => (
              <AddressCard
                addressInfo={item}
                key={index}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address " : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formData={formData}
          setFormData={setFormData}
          formControls={addressFormControl}
          onSubmit={handleManageAddress}
          buttonText={
            currentEditedId !== null ? "Edit Address " : "Add New Address"
          }
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
