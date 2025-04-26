import { Input, Button, Card } from "components";
import {
  CustomPricePointCard,
  CustomPricePointForm,
} from "components/organisms";
import { PricePointData } from "types/types-price-points";
import { memo, useState } from "react";
import { FaArrowDown, FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { CURRENCY } from "utils/number";

export const FundraisingPricePoints: React.FC = () => {
  const [pricePointFormMode, setPricePointFormMode] = useState<
    "ADD" | "EDIT" | null
  >();
  const [pricePointFormEditPayload, setPricePointFormEditPayload] =
    useState<PricePointData | null>();
  return (
    <>
      <Card className="w-full space-y-4 shadow lg:p-6">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="text-xl font-semibold">Custom Price Points</div>
          <div className="inline-flex w-full lg:w-fit items-stretch flex-col lg:flex-row lg:items-center gap-2">
            <Button
              size="lg"
              variant="white"
              className="order-2 lg:order-1 flex items-center justify-center gap-2 text-gray-500"
            >
              {/* @ts-ignore */}
              <FaArrowDown className="w-4 h-4" />
              <div>Sort High to Low</div>
            </Button>
            <Button
              size="lg"
              variant="primary"
              onClick={() => setPricePointFormMode("ADD")}
              className="order-1 lg:order-2 flex items-center justify-center gap-2"
            >
              {/* @ts-ignore */}
              <FaPlus className="w-4 h-4" />
              <div>Add New</div>
            </Button>
          </div>
        </div>
        <div className="w-full relative">
          <Input
            type="search"
            size="lg"
            className="w-full pl-10"
            placeholder="Search by price point name or code"
          />
          <div className="absolute top-0 bottom-0 left-3 grid place-items-center">
            {/* @ts-ignore */}
            <IoSearch size={20} className="text-gray-400" />
          </div>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
            <CustomPricePointCard
              key={id}
              onEdit={(data) => {
                setPricePointFormMode("EDIT");
                setPricePointFormEditPayload(data);
              }}
              data={{
                id,
                name: "50 meals for everyone",
                description: "Price point description",
                amount: 50,
                currency: CURRENCY.USD,
              }}
            />
          ))}
        </div>
      </Card>
      <CustomPricePointForm
        show={!!pricePointFormMode}
        mode={pricePointFormMode || "ADD"}
        editPayload={pricePointFormEditPayload}
        onClose={() => {
          setPricePointFormMode(null);
          setPricePointFormEditPayload(null);
        }}
      />
    </>
  );
};

export default memo(FundraisingPricePoints);
