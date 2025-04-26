import clsx from "clsx";

type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";
export type BadgeVariant =
  | "primary"
  | "info"
  | "secondary"
  | "danger"
  | "warning"
  | "success"
  | "gray";

export type BadgeProps = {
  size?: BadgeSize;
  icon?: React.ReactNode;
  label: string;
  variant?: BadgeVariant;
  className?: string;
  onClick?: () => void;
};

const sizeClasses: Record<BadgeSize, string> = {
  xs: "px-3 py-1 text-xs gap-0.5",
  sm: "px-4 py-1 text-sm gap-0.5",
  md: "px-4 py-1 text-base gap-1",
  lg: "px-5 py-1.5 text-lg gap-1.5",
  xl: "px-6 py-2 text-xl gap-1.5",
};

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary/20 text-primary border-primary",
  info: "bg-info/20 text-info border-info",
  secondary: "bg-gray-100 text-gray-600 border-gray-600",
  danger: "bg-red-100 text-red-600 border-red-600",
  warning: "bg-yellow-100 text-yellow-600 border-yellow-600",
  success: "bg-green-100 text-green-600 border-green-600",
  gray: "bg-gray-50 text-gray-300 border-gray-300",
};

export const Badge: React.FC<BadgeProps> = ({
  size = "md",
  label,
  icon,
  variant = "primary",
  className = "",
  onClick,
}) => {
  const baseClasses =
    "w-fit rounded-full inline-flex items-center transition-all";
  const sizeClass = sizeClasses[size];
  const variantClass = variantClasses[variant];

  return (
    <div
      onClick={onClick}
      className={clsx(baseClasses, sizeClass, variantClass, className)}
    >
      {icon && <div>{icon}</div>}
      <div>{label}</div>
    </div>
  );
};

export default Badge;
