import { memo } from "react";
import { formatAmountWithCurrency } from "utils/number";
import Badge, { BadgeProps } from "components/common/Badge";
import { GoDotFill } from "react-icons/go";
import {
  TeamsFundraisersListItem,
  TeamsFundraisersListItemStatus,
} from "types/types-teams";

type TeamsFundraisersListProps = {
  data: Array<TeamsFundraisersListItem>;
};

const status: Record<
  TeamsFundraisersListItemStatus,
  Pick<BadgeProps, "variant" | "label">
> = {
  accepted: {
    label: "Accepted",
    variant: "success",
  },
  invited: {
    label: "Invited",
    variant: "warning",
  },
  rejected: {
    label: "Rejected",
    variant: "danger",
  },
};

export const TeamsFundraisersList: React.FC<TeamsFundraisersListProps> = (
  props
) => {
  const { data } = props;

  return (
    <div className="w-full space-y-4">
      <div className="w-full overflow-x-auto">
        <div className="w-full min-w-[900px]">
          <div className="w-full grid grid-cols-12 bg-gray-100 border-b-2 text-gray-500 font-semibold text-xs [&>*]:p-3">
            <div className="col-span-2">First Name</div>
            <div className="col-span-2">Last Name</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-3">Total Amount Raised</div>
            <div className="col-span-2">Status</div>
          </div>
          <div className="w-full">
            {data.map((row) => {
              const badgeProps = row?.status
                ? status?.[row?.status]
                : undefined;
              return (
                <div
                  key={row.id}
                  className="w-full grid grid-cols-12 border-b text-sm [&>*]:p-3"
                >
                  <div className="col-span-2">{row.first_name}</div>
                  <div className="col-span-2">{row.last_name}</div>
                  <div className="col-span-3">{row.email}</div>
                  <div className="col-span-3 text-gray-400">
                    {formatAmountWithCurrency(row.raised_amount, row.currency)}
                  </div>
                  <div className="col-span-2">
                    {badgeProps && (
                      <Badge
                        // @ts-ignore
                        icon={<GoDotFill size={14} />}
                        size="xs"
                        {...badgeProps}
                      />
                    )}
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

export default memo(TeamsFundraisersList);
