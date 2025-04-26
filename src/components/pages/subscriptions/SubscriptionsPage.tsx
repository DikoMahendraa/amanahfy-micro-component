import clsx from "clsx";
import { Input, Badge, Card } from "components";
import SubscriptionCard from "components/organisms/subscription/SubscriptionCard";
import { refSubscriptionsStatus } from "constants/subscriptions";
import {
  SubscriptionStatus,
  SubscriptionItem,
} from "types/types-subscriptions";
import { memo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { CURRENCY } from "utils/number";

const SubscriptionsPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] =
    useState<SubscriptionStatus | null>(SubscriptionStatus.COMPLETED);
  const [records] = useState<SubscriptionItem[]>([
    {
      id: 1,
      thumbnail:
        "https://www.kreilkamp.com/wp-content/uploads/2016/11/thumbnail-placeholder-500x334.jpg",
      name: "Abdurrahman S.",
      datetime: "2024-10-24T12:53:22.123Z",
      donation_name: "Made healthy food for children",
      donation_total: 1200,
      donation_currency: CURRENCY.USD,
      status: SubscriptionStatus.COMPLETED,
    },
    {
      id: 2,
      thumbnail:
        "https://www.kreilkamp.com/wp-content/uploads/2016/11/thumbnail-placeholder-500x334.jpg",
      name: "Abdurrahman S.",
      datetime: "2024-10-24T12:53:22.123Z",
      donation_name: "Made healthy food for children",
      donation_total: 1300,
      donation_currency: CURRENCY.USD,
      status: SubscriptionStatus.ON_PRCESS,
    },
    {
      id: 3,
      thumbnail:
        "https://www.kreilkamp.com/wp-content/uploads/2016/11/thumbnail-placeholder-500x334.jpg",
      name: "Abdurrahman S.",
      datetime: "2024-10-24T12:53:22.123Z",
      donation_name: "Made healthy food for children",
      donation_total: 1400,
      donation_currency: CURRENCY.USD,
      status: SubscriptionStatus.PENDING,
    },
    {
      id: 4,
      thumbnail:
        "https://www.kreilkamp.com/wp-content/uploads/2016/11/thumbnail-placeholder-500x334.jpg",
      name: "Abdurrahman S.",
      datetime: "2024-10-24T12:53:22.123Z",
      donation_name: "Made healthy food for children",
      donation_total: 1500,
      donation_currency: CURRENCY.USD,
      status: SubscriptionStatus.REJECTED,
    },
  ]);

  return (
    <>
      <Card className="space-y-6 !rounded-3xl !p-0 lg:!p-6 border-0 lg:border">
        <div className="text-xl font-bold">Subscriptions</div>
        <div className="w-full lg:w-1/2 relative">
          <Input
            size="lg"
            type="search"
            className="w-full pl-10"
            placeholder="Search"
          />
          <div className="absolute top-0 bottom-0 left-3 grid place-items-center">
            {/* @ts-ignore */}
            <IoSearch size={20} className="text-gray-400" />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="text-lg font-medium">Status</div>
          <div
            className={clsx(
              "inline-flex items-stretch gap-3 pb-2 lg:pb-0",
              "flex-nowrap max-h-[calc(100dvw-2rem)] overflow-x-auto snap-x",
              "lg:flex-wrap lg:max-h-none lg:overflow-hidden"
            )}
          >
            {Object.entries(refSubscriptionsStatus).map(([key, status]) => (
              <Badge
                key={key}
                size="lg"
                label={status.label}
                className="cursor-pointer font-bold border-[3px] whitespace-nowrap snap-start"
                variant={selectedStatus === key ? "primary" : "gray"}
                onClick={() => setSelectedStatus(key as SubscriptionStatus)}
              />
            ))}
          </div>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
          {records.map((data) => (
            <SubscriptionCard key={data.id} data={data} />
          ))}
        </div>
      </Card>
    </>
  );
};

export default memo(SubscriptionsPage);
