import { Avatar, Card } from "components";
import { format } from "date-fns";
import { DonationReceiptsItem } from "types/types-donation-receipts";
import { memo, useState } from "react";
import { getAvatar } from "utils/image";
import { CURRENCY, formatAmountWithCurrency } from "utils/number";

const DonationReceiptsPage: React.FC = () => {
  const [donationReceipts] = useState<DonationReceiptsItem[]>([
    {
      id: 1,
      datetime: "2024-10-24T12:53:22.123Z",
      donation_name: "Bucket Shaking",
      donor_name: "Abdullah",
      organization: {
        logo: "",
        name: "Your Charity App",
      },
      total: 120,
      currency: CURRENCY.USD,
    },
    {
      id: 2,
      datetime: "2024-10-24T12:58:22.123Z",
      donation_name: "Bucket Shaking #2",
      donor_name: "Ali",
      organization: {
        logo: "",
        name: "Your Charity App",
      },
      total: 240,
      currency: CURRENCY.USD,
    },
  ]);

  return (
    <>
      <Card className="space-y-6 !rounded-3xl !p-0 lg:!p-6 border-0 lg:border">
        <div className="text-xl font-bold">Donation Receipts</div>
        <div className="w-full border border-gray-300 rounded-xl overflow-x-auto">
          <div className="w-full min-w-[900px]">
            <div className="w-full border-y grid grid-cols-12 bg-gray-100 text-gray-500 font-semibold text-xs [&>*]:p-3">
              <div className="col-span-2">Date</div>
              <div className="col-span-3">Donation Name</div>
              <div className="col-span-2">Donors Name</div>
              <div className="col-span-3">Organisation</div>
              <div className="col-span-2">Total Donation</div>
            </div>
            <div className="w-full">
              {donationReceipts.map((r) => {
                return (
                  <div
                    key={r.id}
                    className="w-full grid grid-cols-12 border-b text-base [&>*]:p-3 text-gray-500"
                  >
                    <div className="col-span-2">
                      {format(new Date(r.datetime), "EEE, M/dd/yy")}
                    </div>
                    <div className="col-span-3">{r.donation_name}</div>
                    <div className="col-span-2">{r.donor_name}</div>
                    <div className="col-span-3 flex items-center gap-2">
                      <Avatar
                        size="xs"
                        src={getAvatar(
                          r.organization.logo,
                          r.organization.name
                        )}
                      />
                      <div className="text-sm line-clamp-1">
                        {r.organization.name}
                      </div>
                    </div>
                    <div className="col-span-2 text-green-600 font-bold">
                      {formatAmountWithCurrency(r.total, r.currency)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default memo(DonationReceiptsPage);
