import { Avatar, Button, Card } from "components";
import { memo } from "react";
import { FiDownloadCloud, FiEdit2 } from "react-icons/fi";
import { LuArchive, LuHistory } from "react-icons/lu";
import { getAvatar } from "utils/image";
import { CURRENCY, formatAmountWithCurrency } from "utils/number";

export const PreviousOfflineDonationsList: React.FC = () => {
  return (
    <Card className="w-full space-y-4 shadow p-0">
      <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-4 p-4 pb-0">
        <div className="space-y-1">
          <div className="text-xl font-bold">Previous Offline Donation</div>
          <p className="text-sm text-gray-400 font-light">
            Listed previous offline donation you&apos;ve been made will be
            listed here
          </p>
        </div>
        <div>
          <Button
            variant="white"
            className="w-full lg:w-fit inline-flex items-center justify-center gap-3"
          >
            {/* @ts-ignore */}
            <LuArchive className="w-6 h-6" />
            <div>Archived</div>
          </Button>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="w-full min-w-[900px]">
          <div className="w-full border-y grid grid-cols-12 bg-gray-100 text-gray-500 font-semibold text-xs [&>*]:p-3">
            <div className="col-span-2">Submission Date</div>
            <div className="col-span-3">Donation Name</div>
            <div className="col-span-2">User</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-1 text-center">Proof</div>
            <div className="col-span-2 text-center">Action</div>
          </div>
          <div className="w-full">
            {[1, 2, 3, 4, 5].map((v) => {
              return (
                <div
                  key={v}
                  className="w-full grid grid-cols-12 border-b text-base [&>*]:p-3 text-gray-500"
                >
                  <div className="col-span-2">21 April 2024</div>
                  <div className="col-span-3">Bucket Shaking</div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Avatar size="xs" src={getAvatar(null, "Habbash")} />
                    <div className="text-sm line-clamp-1">Habbash</div>
                  </div>
                  <div className="col-span-2 text-green-600 font-bold">
                    {formatAmountWithCurrency(11000, CURRENCY.GBP)}
                  </div>
                  <div className="col-span-1 flex justify-center">
                    {/* @ts-ignore */}
                    <FiDownloadCloud className="w-6 h-6 text-info cursor-pointer" />
                  </div>
                  <div className="col-span-2 flex flex-nowrap justify-center gap-3 items-center">
                    {/* @ts-ignore */}
                    <FiEdit2 className="w-6 h-6 text-info cursor-pointer" />
                    {/* @ts-ignore */}
                    <LuArchive className="w-6 h-6 text-info cursor-pointer" />
                    {/* @ts-ignore */}
                    <LuHistory className="w-6 h-6 text-info cursor-pointer" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default memo(PreviousOfflineDonationsList);
