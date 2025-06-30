import { selectOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function FilterProduct({ filtered, handleFiltered }) {
  return (
    <div className="bg-background  rounded-lg">
      <div className="p-4 border-b">
        <h2 className="font-extrabold text-lg">Filtered Items</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(selectOptions).map((items, index) => (
          <Fragment key={index}>
            <div className="p-2">
              <h2 className=" text-base font-bold">{items}</h2>
              <div className="grid gap-2 mt-2">
                {selectOptions[items].map((optionItem) => (
                  <Label
                    className="flex gap-2 items-center font-medium"
                    key={optionItem.id}
                  >
                    <Checkbox
                      checked={
                        filtered &&
                        Object.keys(filtered).length > 0 &&
                        filtered[items] &&
                        filtered[items].indexOf(optionItem.id) > -1
                      }
                      onCheckedChange={() =>
                        handleFiltered(items, optionItem.id)
                      }
                    />
                    {optionItem.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default FilterProduct;
