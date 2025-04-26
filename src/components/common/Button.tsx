import clsx from "clsx";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "success"
  | "outline-primary"
  | "outline-danger"
  | "outline-warning"
  | "outline-success"
  | "white"
  | "gradient-primary";
export type ButtonProps = {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-7 py-2.5 text-lg",
  xl: "px-9 py-3 text-xl",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:enabled:bg-primary/80",
  secondary: "bg-gray-300 text-black hover:enabled:bg-gray-400",
  danger: "bg-red-500 text-white hover:enabled:bg-red-600",
  warning: "bg-yellow-500 text-black hover:enabled:bg-yellow-600",
  success: "bg-green-500 text-white hover:enabled:bg-green-600",
  "outline-primary":
    "border-2 border-primary text-primary hover:enabled:bg-primary/10",
  "outline-danger":
    "border-2 border-red-500 text-red-500 hover:enabled:bg-red-100",
  "outline-warning":
    "border-2 border-yellow-500 text-yellow-500 hover:enabled:bg-yellow-100",
  "outline-success":
    "border-2 border-green-500 text-green-500 hover:enabled:bg-green-100",
  white: "bg-white border border-gray-300 hover:enabled:bg-gray-100",
  "gradient-primary": "bg-gradient-to-r from-primary to-blue-500 text-white",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  size = "md",
  variant = "primary",
  onClick,
  className = "",
  disabled = false,
}) => {
  const baseClasses =
    "rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all";
  const sizeClass = sizeClasses[size];
  const variantClass = variantClasses[variant];
  const disabledClasses = disabled && "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseClasses,
        sizeClass,
        variantClass,
        disabledClasses,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
