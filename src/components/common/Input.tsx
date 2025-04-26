import clsx from "clsx";

type InputSize = "xs" | "sm" | "md" | "lg" | "xl";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: InputSize;
  hasError?: boolean;
};

const sizeClasses: Record<InputSize, string> = {
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-2.5 text-lg",
  xl: "px-6 py-3 text-xl",
};

export const Input: React.FC<InputProps> = (props) => {
  const { size = "md", className, hasError, ...restProps } = props;
  const sizeClass = sizeClasses[size];
  const baseClasses =
    "w-full border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-primary";
  const disabledClasses = props.disabled && "opacity-50 cursor-not-allowed";
  const errorClasses = hasError && "border-red-600 bg-red-50";

  return (
    <input
      {...restProps}
      className={clsx(
        baseClasses,
        sizeClass,
        disabledClasses,
        errorClasses,
        className
      )}
    />
  );
};

export default Input;
