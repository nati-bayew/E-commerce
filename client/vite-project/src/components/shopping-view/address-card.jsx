import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({ addressInfo, handleDeleteAddress, handleEditAddress }) {
  return (
    <Card className="m-4">
      <CardContent className="grid p-4 gap-3">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
      </CardContent>
      <CardFooter className="flex p-3 justify-between">
        <Button
          className="cursor-pointer"
          onClick={() => handleEditAddress(addressInfo)}
        >
          Edit
        </Button>
        <Button
          className="cursor-pointer"
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
