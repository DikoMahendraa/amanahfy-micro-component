import { Badge, Button, Card } from "components";
import { refSubscriptionsStatus } from "constants/subscriptions";
import { format } from "date-fns";
import { SubscriptionItem } from "types/types-subscriptions";
import { memo } from "react";
import { GoDotFill } from "react-icons/go";
import { formatAmountWithCurrency } from "utils/number";

type SubscriptionCardProps = {
  data: SubscriptionItem;
};

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ data }) => {
  const badgeProps = data?.status
    ? refSubscriptionsStatus?.[data?.status]
    : undefined;
  return (
    <Card className="w-full shadow-md border-gray-300 !p-5">
      <div className="w-full grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-5">
          <img
            alt=""
            draggable="false"
            loading="lazy"
            src={data.thumbnail}
            className="w-full aspect-video lg:aspect-[9/12] rounded-lg object-cover object-center"
          />
        </div>
        <div className="col-span-12 lg:col-span-7 space-y-2">
          <div className="w-full flex justify-between gap-3">
            <div className="w-full space-y-0.5">
              <div className="font-bold text-primary text-lg line-clamp-1">
                {data.name}
              </div>
              <div className="text-sm text-gray-400">
                {format(new Date(data.datetime), "d MMM yyyy")}
              </div>
            </div>
            <div>
              {badgeProps && (
                <Badge
                  // @ts-ignore
                  icon={<GoDotFill size={14} />}
                  size="xs"
                  {...badgeProps}
                  className="whitespace-nowrap"
                />
              )}
            </div>
          </div>
          <hr />
          <div className="w-full p-1 rounded-lg bg-info/10 flex flex-col items-center gap-0.5">
            <div className="text-gray-500 text-xs">Donation to</div>
            <div className="font-semibold text-primary text-base line-clamp-1">
              {data.donation_name}
            </div>
          </div>
          <div className="w-full p-1 rounded-lg bg-info/10 flex flex-col items-center gap-0.5">
            <div className="text-gray-500 text-xs">Total Donation</div>
            <div className="font-semibold text-primary text-base line-clamp-1">
              {formatAmountWithCurrency(
                data.donation_total,
                data.donation_currency
              )}
            </div>
          </div>
          <Button size="md" className="w-full !mt-4">
            Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default memo(SubscriptionCard);
