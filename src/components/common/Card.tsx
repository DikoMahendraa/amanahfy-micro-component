import clsx from "clsx";

type CardProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLDivElement>;

export const Card: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx(
        "w-full p-4 border border-gray-300 rounded-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
