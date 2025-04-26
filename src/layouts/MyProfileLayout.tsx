import { memo, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { EnumMenuItem, MenuItem } from "../types/types-my-profile";
import { Card, Select, SelectOption } from "components";

const menuRoutes: Record<EnumMenuItem, string> = {
  [EnumMenuItem.MAIN_INFO]: "/my-profile/main-info",
  [EnumMenuItem.PAYMENT_DETAILS]: "/my-profile/payment-details",
  [EnumMenuItem.DONATION_RECEIPTS]: "/my-profile/donation-receipts",
  [EnumMenuItem.SUBSCRIPTIONS]: "/my-profile/subscriptions",
  [EnumMenuItem.FUNDRAISING]: "/my-profile/fundraising",
  [EnumMenuItem.TEAMS]: "/my-profile/teams",
};

export const MyProfileLayout: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menus = useMemo<Array<MenuItem>>(
    () => [
      {
        key: EnumMenuItem.MAIN_INFO,
        title: "Main Info",
        is_active: pathname.startsWith(menuRoutes?.[EnumMenuItem.MAIN_INFO]),
        href: menuRoutes?.[EnumMenuItem.MAIN_INFO],
      },
      {
        key: EnumMenuItem.PAYMENT_DETAILS,
        title: "Payment Details",
        is_active: pathname.startsWith(
          menuRoutes?.[EnumMenuItem.PAYMENT_DETAILS]
        ),
        href: menuRoutes?.[EnumMenuItem.PAYMENT_DETAILS],
      },
      {
        key: EnumMenuItem.DONATION_RECEIPTS,
        title: "Donation Receipts",
        is_active: pathname.startsWith(
          menuRoutes?.[EnumMenuItem.DONATION_RECEIPTS]
        ),
        href: menuRoutes?.[EnumMenuItem.DONATION_RECEIPTS],
      },
      {
        key: EnumMenuItem.SUBSCRIPTIONS,
        title: "Subscriptions",
        is_active: pathname.startsWith(
          menuRoutes?.[EnumMenuItem.SUBSCRIPTIONS]
        ),
        href: menuRoutes?.[EnumMenuItem.SUBSCRIPTIONS],
      },
      {
        key: EnumMenuItem.FUNDRAISING,
        title: "Fundraising",
        is_active: pathname.startsWith(menuRoutes?.[EnumMenuItem.FUNDRAISING]),
        href: menuRoutes?.[EnumMenuItem.FUNDRAISING],
      },
      {
        key: EnumMenuItem.TEAMS,
        title: "Teams",
        is_active: pathname.startsWith(menuRoutes?.[EnumMenuItem.TEAMS]),
        href: menuRoutes?.[EnumMenuItem.TEAMS],
      },
    ],
    [pathname]
  );

  const menuOptions = useMemo<SelectOption[]>(
    () =>
      menus.map((menu) => ({
        value: menu.key,
        label: menu.title,
      })),
    [menus]
  );

  const currentActiveMenu = useMemo<MenuItem | undefined>(
    () => menus.find((menu) => menu.is_active),
    [menus]
  );

  return (
    <Card className="lg:!p-6 grid grid-cols-12 gap-6 border-0 lg:border !p-0">
      <div className="col-span-12 lg:col-span-3">
        <div className="hidden lg:block w-full space-y-3 text-sm">
          {menus.map((menu) => (
            <a
              key={menu.key}
              href={!menu.is_active && menu.href ? menu.href : "#"}
              className={clsx(
                "w-fit transition-all",
                menu.is_active
                  ? "text-primary font-bold text-xl"
                  : "text-lg font-light text-gray-500 cursor-pointer"
              )}
            >
              {menu.title}
            </a>
          ))}
        </div>
        <div className="block lg:hidden w-full">
          <Select
            value={currentActiveMenu?.key}
            onChange={(e) =>
              menuRoutes?.[e.target.value as EnumMenuItem] &&
              navigate(menuRoutes?.[e.target.value as EnumMenuItem])
            }
            options={menuOptions}
          />
        </div>
      </div>
      {/* <div className="col-span-12 lg:col-span-9">
        <Outlet/>
      </div> */}
    </Card>
  );
};

export default memo(MyProfileLayout);
