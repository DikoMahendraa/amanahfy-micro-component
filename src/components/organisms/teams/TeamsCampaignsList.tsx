import { memo } from "react";
import { formatAmountWithCurrency } from "utils/number";
import { TeamsCampaignsListItem } from "types/types-teams";
import { TbPencil } from "react-icons/tb";

type TeamsCampaignsListProps = {
  data: Array<TeamsCampaignsListItem>;
};

export const TeamsCampaignsList: React.FC<TeamsCampaignsListProps> = (
  props
) => {
  const { data } = props;

  return (
    <div className="w-full space-y-4">
      <div className="w-full overflow-x-auto">
        <div className="w-full min-w-[900px]">
          <div className="w-full grid grid-cols-12 bg-gray-100 border-b-2 text-gray-500 font-semibold text-xs [&>*]:p-3">
            <div className="col-span-8">Campaign Name</div>
            <div className="col-span-3">Total Amount Raised</div>
            <div className="col-span-1 text-center">Edit</div>
          </div>
          <div className="w-full">
            {data.map((row) => {
              return (
                <div
                  key={row.id}
                  className="w-full grid grid-cols-12 border-b text-sm [&>*]:p-3"
                >
                  <div className="col-span-8">{row.name}</div>
                  <div className="col-span-3 text-gray-400">
                    {formatAmountWithCurrency(row.raised_amount, row.currency)}
                  </div>
                  <div className="col-span-1 flex justify-center">
                    {/* @ts-ignore */}
                    <TbPencil size={24} className="text-info cursor-pointer" />
                  </div>
                </div>
              );
            })}
            {data.length < 1 && (
              <div className="w-full h-20 grid place-items-center">
                <div className="text-xs text-gray-500">No data available</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TeamsCampaignsList);
