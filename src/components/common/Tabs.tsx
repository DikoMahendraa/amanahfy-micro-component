import clsx from "clsx";

type TabsProps = {
  activeKey?: string;
  items: Array<TabItem>;
  onChange: (tab: TabItem) => void;
  className?: string;
};

export type TabItem = {
  key: string;
  label: string | React.ReactNode;
};

export const Tabs: React.FC<TabsProps> = ({
  activeKey,
  items,
  className,
  onChange,
}) => {
  return (
    <div className={clsx("inline-flex items-center gap-1", className)}>
      {items.map((tab) => {
        return (
          <div
            key={tab.key}
            onClick={() => activeKey !== tab.key && onChange(tab)}
            className={clsx(
              "whitespace-nowrap transition-all px-4 lg:px-10 py-2 font-semibold border-b-4",
              activeKey === tab.key
                ? "text-primary border-primary"
                : "text-gray-400 border-transparent cursor-pointer"
            )}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
