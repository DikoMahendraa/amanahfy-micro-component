import { Input, Progress, Badge } from "components";
import { IoSearch } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbPencil } from "react-icons/tb";
import { BsEye } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { FundraisingListItem } from "types/types-fundraising";
import { BadgeVariant } from "components/common/Badge";

interface FundraisingListProps {
  // Data
  data: Array<FundraisingListItem>;
  searchValue: string;

  // Status badge configurations
  statusConfig: Record<string, { label: string; variant?: BadgeVariant }>;

  // Event handlers
  onPreview: (record: FundraisingListItem) => void;
  onEdit: (record: FundraisingListItem) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // Helper functions
  calculateProgress: (goal: number, raised: number) => number;
  formatAmountWithCurrency: (amount: number, currency: string) => string;
  formatTimeAgo: (date: string) => string;
}

export const FundraisingList: React.FC<FundraisingListProps> = ({
  data,
  searchValue,
  statusConfig,
  onPreview,
  onEdit,
  onSearchChange,
  calculateProgress,
  formatAmountWithCurrency,
  formatTimeAgo,
}) => {
  return (
    <div className="w-full space-y-4">
      <div className="w-full lg:w-[40%] relative">
        <Input
          type="search"
          className="w-full pr-10"
          placeholder="Search"
          value={searchValue}
          onChange={onSearchChange}
        />
        <div className="absolute top-0 bottom-0 right-3 grid place-items-center">
          {/* @ts-ignore */}
          <IoSearch size={20} className="text-gray-400" />
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="w-full min-w-[900px]">
          <div className="w-full grid grid-cols-12 bg-gray-100 border-b-2 text-gray-500 font-semibold text-xs [&>*]:p-3">
            <div className="col-span-4">Fundraising Campaign</div>
            <div className="col-span-4">Amount Raised</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-center">Preview</div>
            <div className="col-span-1 text-center">Edit</div>
          </div>
          <div className="w-full">
            {data.map((row) => {
              const badgeProps = row.status
                ? statusConfig[row.status]
                : undefined;
              return (
                <div
                  key={row.id}
                  className="w-full grid grid-cols-12 border-b text-xs [&>*]:p-3"
                >
                  <div className="col-span-4">{row.title}</div>
                  <div className="col-span-4 space-y-1">
                    <div className="w-full flex justify-between items-end gap-2">
                      <div className="text-xs text-gray-400">
                        {row.last_donation_at && (
                          <>
                            Last donation {formatTimeAgo(row.last_donation_at)}
                          </>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 inline-flex flex-nowrap items-center gap-1">
                        {/* @ts-ignore */}
                        <HiOutlineUserGroup size={16} />
                        <div>{row.total_donors}</div>
                      </div>
                    </div>
                    <Progress
                      value={calculateProgress(
                        row.goals_amount,
                        row.raised_amount
                      )}
                      size="sm"
                      variant="info"
                    />
                    <div className="text-xs text-gray-400">
                      {formatAmountWithCurrency(
                        row.raised_amount,
                        row.currency
                      )}{" "}
                      of{" "}
                      {formatAmountWithCurrency(row.goals_amount, row.currency)}{" "}
                      goal
                    </div>
                  </div>
                  <div className="col-span-2">
                    {badgeProps && (
                      <Badge
                        // @ts-ignore
                        icon={<GoDotFill size={14} />}
                        size="xs"
                        variant={badgeProps.variant}
                        label={badgeProps.label}
                      />
                    )}
                  </div>
                  <div className="col-span-1 flex justify-center">
                    {/* @ts-ignore */}
                    <BsEye
                      size={24}
                      onClick={() => onPreview(row)}
                      className="text-info cursor-pointer"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    {/* @ts-ignore */}
                    <TbPencil
                      size={24}
                      onClick={() => onEdit(row)}
                      className="text-info cursor-pointer"
                    />
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

export default FundraisingList;
