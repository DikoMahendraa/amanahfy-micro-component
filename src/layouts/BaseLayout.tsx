import { memo } from "react";
import { Outlet } from "react-router-dom";

export const BaseLayout: React.FC = () => {
  return (
    <div className="w-full min-h-[100dvh] relative flex justify-center p-4">
      <div className="w-full max-w-[1440px]">
        <Outlet />
      </div>
    </div>
  );
};

export default memo(BaseLayout);
