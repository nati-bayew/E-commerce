import { selectOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";

function FilterProduct() {
  return (
    <div className="bg-background shadow-sm rounded-lg">
      <div className="p-4 border-b">
        <h2 className="font-extrabold text-lg">Filtered Items</h2>
      </div>
      <div className="p-2 space-y-2">
        {Object.keys(selectOptions).map((items) => (
          <Fragment>
            <div className="p-2">
              <h2 className=" text-base font-bold">{items}</h2>
              <div className="grid gap-2 mt-2">
                {selectOptions[items].map((optionItem) => (
                  <Label className="flex gap-2 items-center font-medium">
                    {optionItem.label}
                  </Label>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default FilterProduct;
