import { Button } from "components";
import { PricePointData } from "types/types-price-points";
import { memo } from "react";
import { FiEdit2 } from "react-icons/fi";
import { formatAmountWithCurrency } from "utils/number";

type CustomPricePointCardProps = {
  data: PricePointData;
  onEdit?: (data: PricePointData) => void;
};

export const CustomPricePointCard: React.FC<CustomPricePointCardProps> = ({
  data,
  onEdit,
}) => {
  return (
    <div className="w-full border rounded-xl p-4 border-gray-300">
      <div className="w-full flex justify-between gap-4">
        <div className="w-full space-y-1 text-primary">
          <div className="text-2xl font-bold">
            {formatAmountWithCurrency(data.amount, data.currency)}
          </div>
          <div className="text-lg font-bold">{data.name}</div>
          <div className="text-base font-light line-clamp-2">
            {data.description}
          </div>
        </div>
        {typeof onEdit === "function" && (
          <div>
            <Button
              variant="warning"
              className="text-white aspect-video"
              onClick={() => onEdit(data)}
            >
              {/* @ts-ignore */}
              <FiEdit2 className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(CustomPricePointCard);
