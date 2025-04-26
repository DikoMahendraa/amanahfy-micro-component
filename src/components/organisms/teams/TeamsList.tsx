import { memo } from "react";
import Input from "components/common/Input";
import { IoSearch } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { TbPencil } from "react-icons/tb";
import Badge, { BadgeProps } from "components/common/Badge";
import { GoDotFill } from "react-icons/go";
import { TeamsListItem, TeamsListItemStatus } from "types/types-teams";
import Avatar from "components/common/Avatar";
import { getAvatar } from "utils/image";
import Button from "components/common/Button";

const status: Record<
  TeamsListItemStatus,
  Pick<BadgeProps, "variant" | "label">
> = {
  active: {
    label: "Active",
    variant: "success",
  },
  "in-review": {
    label: "In Review",
    variant: "warning",
  },
};

export interface TeamsListProps {
  data: Array<TeamsListItem>;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onPreview: (team: TeamsListItem) => void;
  onEdit: (team: TeamsListItem) => void;
  upcomingInvitesCount?: number;
}

export const TeamsList: React.FC<TeamsListProps> = ({
  data,
  searchValue,
  onSearchChange,
  onPreview,
  onEdit,
  upcomingInvitesCount = 0,
}) => {
  return (
    <div className="w-full space-y-4">
      <div className="w-full flex flex-col lg:flex-row gap-4 justify-between">
        <div className="w-full lg:w-[40%] relative">
          <Input
            type="search"
            className="w-full pr-10"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <div className="absolute top-0 bottom-0 right-3 grid place-items-center">
            {/* @ts-ignore */}
            <IoSearch size={20} className="text-gray-400" />
          </div>
        </div>
        <div className="relative">
          {upcomingInvitesCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-600 text-white w-6 aspect-square rounded-full grid place-items-center text-xs">
              {upcomingInvitesCount}
            </div>
          )}
          <Button variant="gradient-primary" className="px-6 w-full lg:w-fit">
            Upcoming Invitations
          </Button>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="w-full min-w-[900px]">
          <div className="w-full grid grid-cols-12 bg-gray-100 border-b-2 text-gray-500 font-semibold text-xs [&>*]:p-3">
            <div className="col-span-4">Team Name</div>
            <div className="col-span-2">Captains</div>
            <div className="col-span-2">Members</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-center">Preview</div>
            <div className="col-span-1 text-center">Action</div>
          </div>
          <div className="w-full">
            {data.map((row) => {
              const badgeProps = row?.status
                ? status?.[row?.status]
                : undefined;
              return (
                <div
                  key={row.id}
                  className="w-full grid grid-cols-12 border-b text-xs [&>*]:p-3"
                >
                  <div className="col-span-4">{row.name}</div>
                  <div className="col-span-2">
                    <div className="w-full flex items-center gap-1">
                      <Avatar
                        size="xs"
                        src={getAvatar(row.captain.avatar, row.captain.name)}
                      />
                      <div>{row.captain.name}</div>
                    </div>
                  </div>
                  <div className="col-span-2">{row.members} Members</div>
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

export default memo(TeamsList);
