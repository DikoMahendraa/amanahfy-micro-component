import { SubscriptionStatus } from "types/types-subscriptions";
import { BadgeProps } from "components/common/Badge";

export const refSubscriptionsStatus: Record<
  SubscriptionStatus,
  Pick<BadgeProps, "variant" | "label">
> = {
  [SubscriptionStatus.COMPLETED]: {
    label: "Completed",
    variant: "success",
  },
  [SubscriptionStatus.ON_PRCESS]: {
    label: "On-process",
    variant: "info",
  },
  [SubscriptionStatus.PENDING]: {
    label: "Pending",
    variant: "warning",
  },
  [SubscriptionStatus.REJECTED]: {
    label: "Rejected",
    variant: "danger",
  },
};
