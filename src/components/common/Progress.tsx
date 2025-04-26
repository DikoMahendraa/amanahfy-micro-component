import clsx from "clsx";

type ProgressSize = "xs" | "sm" | "md" | "lg" | "xl";
type ProgressVariant =
  | "primary"
  | "info"
  | "secondary"
  | "danger"
  | "warning"
  | "success";

type ProgressProps = {
  size?: ProgressSize;
  value: number;
  variant?: ProgressVariant;
  className?: string;
};

const sizeClasses: Record<ProgressSize, string> = {
  xs: "h-1",
  sm: "h-2",
  md: "h-3",
  lg: "h-4",
  xl: "h-5",
};

const variantClasses: Record<ProgressVariant, string> = {
  primary: "bg-primary",
  info: "bg-blue-500",
  secondary: "bg-gray-300",
  danger: "bg-red-500",
  warning: "bg-yellow-500",
  success: "bg-green-500",
};

export const Progress: React.FC<ProgressProps> = ({
  size = "md",
  value,
  variant = "primary",
  className = "",
}) => {
  const baseClasses = "w-full rounded-full bg-gray-200 shadow-inner relative";
  const sizeClass = sizeClasses[size];
  const variantClass = variantClasses[variant];

  return (
    <div className={clsx(baseClasses, sizeClass, className)}>
      <div
        style={{ width: `${value > 100 ? 100 : value}%` }}
        className={clsx(
          "rounded-full transition-all delay-150 absolute inset-0 z-10",
          variantClass
        )}
      />
    </div>
  );
};

export default Progress;
